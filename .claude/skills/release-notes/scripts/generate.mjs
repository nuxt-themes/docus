#!/usr/bin/env node
// Generate the GitHub release body for a new Docus version from CHANGELOG.md.
// Fills the mechanical parts and leaves Highlights / New documentation placeholders for the model.
//
// Usage: node .claude/skills/release-notes/scripts/generate.mjs [version]
// - version: optional, e.g. "5.16.0". Defaults to the first block in CHANGELOG.md.
// - Writes v<version>.md at the repo root and prints a digest to stdout.

import { execFile, execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { promisify } from 'node:util'

const OWNER = 'nuxt-content'
const NAME = 'docus'
const MAINTAINER = 'larbish'
const DOCS_URL = 'https://docus.dev'
const DOCS_DIR = 'docs/content/en'

// Conventional-changelog section name -> release-body header, in output order.
const SECTION_HEADERS = {
  'BREAKING CHANGES': '## ⚠️ Breaking Changes',
  'Features': '## 🚀 Features',
  'Bug Fixes': '## 🐛 Bug Fixes',
  'Performance Improvements': '## 🏎️ Performance',
  'Reverts': '## ⏪ Reverts',
}

const isBot = login =>
  !login
  || login.endsWith('[bot]')
  || /^(?:renovate|dependabot|autofix-ci|codecov|nuxt-studio)$/i.test(login)

const exec = promisify(execFile)

function sh(cmd, args) {
  return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
}

const repoRoot = sh('git', ['rev-parse', '--show-toplevel'])
const changelog = readFileSync(join(repoRoot, 'CHANGELOG.md'), 'utf8')

// --- Locate the version block -------------------------------------------------
const wantVersion = process.argv[2]?.replace(/^v/, '')
const headerRe = /^## \[(\d+\.\d+\.\d+)\]\((https?:\/\/[^)]+)\)(?: \(([\d-]+)\))?/gm
const blocks = []
let m
while ((m = headerRe.exec(changelog))) {
  blocks.push({ version: m[1], compareUrl: m[2], date: m[3], start: m.index, headerEnd: headerRe.lastIndex })
}
if (!blocks.length) {
  console.error('Could not find any version block in CHANGELOG.md')
  process.exit(1)
}
const idx = wantVersion ? blocks.findIndex(b => b.version === wantVersion) : 0
if (idx === -1) {
  console.error(`Version ${wantVersion} not found in CHANGELOG.md`)
  process.exit(1)
}
const block = blocks[idx]
const body = changelog.slice(block.headerEnd, blocks[idx + 1]?.start ?? changelog.length)

const prevTag = block.compareUrl.match(/compare\/(v[\d.]+)\.\.\./)?.[1]
const version = block.version
const newTag = `v${version}`
// Patch releases (x.y.z with z > 0) are just the changelog sections, no Highlights.
const isPatch = Number(version.split('.')[2]) > 0

const ref = (() => {
  try {
    sh('git', ['rev-parse', '-q', '--verify', `refs/tags/${newTag}`])
    return newTag
  }
  catch {
    return 'HEAD'
  }
})()
const range = `${prevTag}..${ref}`

// --- Parse "### Section" subsections into { name: text } ----------------------
const sections = {}
let current = null
for (const line of body.split('\n')) {
  const h = line.match(/^### (.+)$/)
  if (h) {
    current = /breaking/i.test(h[1]) ? 'BREAKING CHANGES' : h[1].trim()
    sections[current] = []
    continue
  }
  if (current) sections[current].push(line)
}
// Keep raw section text so wrapped bullets (breaking change notes) survive.
for (const name of Object.keys(sections)) sections[name] = sections[name].join('\n').trim()

const bullets = name => (sections[name] || '').split('\n').filter(l => l.startsWith('* '))

// --- Contributors -------------------------------------------------------------
// One GraphQL call per 50 commits: PR author from the "(#N)" subject + commit authors (co-authors included).
async function fetchLogins(commits) {
  const fields = commits.map((c, i) => [
    `c${i}: object(oid: "${c.sha}") { ... on Commit { authors(first: 20) { nodes { user { login } } } } }`,
    c.pr && `p${i}: issueOrPullRequest(number: ${c.pr}) { ... on PullRequest { author { __typename login } } }`,
  ].filter(Boolean).join('\n')).join('\n')
  const query = `query { repository(owner: "${OWNER}", name: "${NAME}") { ${fields} } }`

  let stdout
  try {
    ({ stdout } = await exec('gh', ['api', 'graphql', '-f', `query=${query}`]))
  }
  catch (err) {
    // gh exits 1 on partial errors (issue ref, unpushed commit) but still prints the data.
    if (!err.stdout) throw new Error(err.stderr?.trim() || 'gh api graphql failed', { cause: err })
    stdout = err.stdout
  }
  const repo = JSON.parse(stdout).data?.repository ?? {}

  return commits.map((_, i) => {
    const logins = new Set(repo[`c${i}`]?.authors?.nodes?.map(n => n.user?.login))
    const author = repo[`p${i}`]?.author
    if (author?.__typename === 'User') logins.add(author.login)
    return [...logins].filter(login => !isBot(login))
  })
}

let contributorLines
try {
  const commits = sh('git', ['log', range, '--pretty=format:%H %s'])
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [sha, ...subject] = line.split(' ')
      return { sha, pr: subject.join(' ').match(/\(#(\d+)\)$/)?.[1] }
    })

  const chunks = []
  for (let i = 0; i < commits.length; i += 50) chunks.push(commits.slice(i, i + 50))
  const results = (await Promise.all(chunks.map(fetchLogins))).flat()

  const counts = new Map()
  for (const logins of results) {
    for (const login of logins) counts.set(login, (counts.get(login) || 0) + 1)
  }
  counts.delete(MAINTAINER)

  const ordered = [...counts.entries()].sort((a, b) =>
    b[1] - a[1] || a[0].toLowerCase().localeCompare(b[0].toLowerCase()))
  contributorLines = [`* @${MAINTAINER}`, ...ordered.map(([login]) => `* @${login}`)]
}
catch (err) {
  contributorLines = [`* @${MAINTAINER}`, `<!-- contributors lookup failed: ${err.message.split('\n')[0]} -->`]
}

// --- New documentation candidates ---------------------------------------------
// Numeric prefixes are dropped from URLs: 4.ai/1.assistant.md -> /en/ai/assistant.
const toUrl = path => `${DOCS_URL}/${path
  .replace(/^docs\/content\//, '')
  .replace(/\.md$/, '')
  .split('/')
  .map(s => s.replace(/^\d+\./, ''))
  .filter(s => s !== 'index')
  .join('/')}`

const slugify = text => text
  .toLowerCase()
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .trim()
  .replace(/\s+/g, '-')

// Code fences are skipped since docs pages contain markdown examples with headings.
const headings = (src) => {
  const found = []
  let fence = null
  for (const line of src.split('\n')) {
    const marker = line.trim().match(/^(?:`{3,}|~{3,})/)?.[0]
    if (marker && !fence) {
      fence = marker
    }
    else if (fence) {
      if (line.trim() === fence) fence = null
    }
    else {
      const h = line.match(/^#{2,3} (.+)$/)
      if (h) found.push(h[1].trim())
    }
  }
  return found
}

const show = (rev, path) => {
  try {
    return sh('git', ['show', `${rev}:${path}`])
  }
  catch {
    return ''
  }
}

const newPages = []
const newSections = []
try {
  const changes = sh('git', ['diff', '--name-status', '-M', range, '--', DOCS_DIR])
    .split('\n')
    .filter(Boolean)
    .map(l => l.split('\t'))
  for (const [status, from, to = from] of changes) {
    if (!to.endsWith('.md')) continue
    if (status === 'A') {
      newPages.push(toUrl(to))
    }
    else if (status === 'M' || status.startsWith('R')) {
      const before = new Set(headings(show(prevTag, from)))
      for (const h of headings(show(ref, to))) {
        if (!before.has(h)) newSections.push(`${toUrl(to)}#${slugify(h)}`)
      }
    }
  }
}
catch { /* no docs changes in range */ }
const hasDocsCandidates = newPages.length + newSections.length > 0

// --- Assemble the release body ------------------------------------------------
const out = []
if (!isPatch) {
  out.push('## ✨ Highlights', '')
  out.push('<!-- TODO: write 2-4 highlights here (see SKILL.md). Delete this comment when done. -->', '')
}

const known = Object.keys(SECTION_HEADERS)
for (const name of [...known, ...Object.keys(sections).filter(n => !known.includes(n))]) {
  if (sections[name]) out.push(SECTION_HEADERS[name] || `## ${name}`, '', sections[name], '')
}

out.push('## 💚 Contributors', '', ...contributorLines, '')
if (hasDocsCandidates) {
  out.push('## 📚 New documentation', '')
  out.push('<!-- TODO: keep the pages and sections that shipped (see SKILL.md), or delete this section. -->', '')
}
out.push(`**Full Changelog**: ${block.compareUrl}`, '')

const outPath = join(repoRoot, `${newTag}.md`)
writeFileSync(outPath, out.join('\n'))

// --- Digest to help write the judgement parts ---------------------------------
const strip = l => l.replace(/^\* /, '').replace(/\s*\(\[.*$/, '')

console.log(`\n✓ Wrote ${outPath}`)
console.log(`  version ${newTag}  •  previous ${prevTag ?? '?'}  •  range ${range}  •  ${block.date ?? ''}`)
console.log(`  ${contributorLines.length} contributors, Full Changelog: ${block.compareUrl}\n`)

if (isPatch) {
  console.log('Patch release: no Highlights section.')
}
else {
  console.log('Highlight candidates (curate 2-4 of these):')
  for (const name of ['BREAKING CHANGES', 'Features', 'Performance Improvements']) {
    for (const l of bullets(name)) console.log(`  [${name}] ${strip(l)}`)
  }
}

if (hasDocsCandidates) {
  console.log('\nNew documentation candidates (keep only what documents this release):')
  for (const url of newPages) console.log(`  [page] ${url}`)
  for (const url of newSections) console.log(`  [section] ${url}`)
}
else if (isPatch) {
  console.log('No docs changes: the body is ready to paste.')
}
