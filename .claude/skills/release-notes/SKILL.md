---
name: release-notes
description: Draft the GitHub release body for a new Docus version. Use when asked to write release notes, do the release notes, or prepare the GitHub release for a version. Generates emoji sections, Contributors and new docs candidates from CHANGELOG.md into a local file to edit and paste, plus Highlights on minor and major versions.
---

Produce the full GitHub release body for a new Docus version, based on
`CHANGELOG.md`, into `v<version>.md` at the repo root. The user edits it and
pastes it into the GitHub release. The generator does everything mechanical;
**you** write the Highlights and the New documentation list (the parts that
need judgement and verification).

**When to run:** `pnpm release` writes the `CHANGELOG.md` block, tags, pushes and
opens a prefilled GitHub release in the browser. Run this skill at that point;
the generated body replaces the prefilled one.

**Patch releases** (`x.y.z` with `z > 0`) have no Highlights section. The
generator detects this from the version, so for a patch skip step 2.

## Steps

### 1. Generate the scaffold

```bash
node .claude/skills/release-notes/scripts/generate.mjs        # newest version in CHANGELOG.md
node .claude/skills/release-notes/scripts/generate.mjs 5.16.0 # a specific version
```

This reads the version block of `CHANGELOG.md` and writes `v<version>.md` with:

- a `## ✨ Highlights` placeholder (yours to fill), minor and major versions only,
- the `Breaking Changes` / `Features` / `Bug Fixes` / `Performance` / `Reverts`
  sections with emoji headers, copied from the changelog,
- `## 💚 Contributors`: PR authors and commit co-authors (one `gh api graphql`
  call), `@larbish` first then by contribution count,
- a `## 📚 New documentation` placeholder when `docs/content/en` changed,
- the `**Full Changelog**` compare line.

It prints the **highlight candidates** (Features, Performance and Breaking
Changes bullets) and the **new documentation candidates** (new pages and new
`##`/`###` headings). `gh` must be authenticated (`gh auth status`).

### 2. Write the Highlights (minor and major versions only)

Skip this step for a patch release, even when a fix is notable.

Pick **2 to 4** changes, most impactful first. Candidates include Performance:
a minor can ship without features (v5.15.0 was all performance work).

Good highlight material:

- a **new capability** users turn on or configure (an `app.config.ts` key, a
  `nuxt.config.ts` option, a new component, slot or composable),
- a **broad or cross-cutting** change (assistant, MCP, llms.txt and agents,
  search, SEO, i18n, theming, performance),
- something that closes a long-standing or popular request.

Skip narrow fixes, docs fixes and internal refactors. For each highlight write:

````md
### 🤖 Short title

One or two sentences on what it does and why it matters, linking the
[guide](https://docus.dev/en/ai/assistant#custom-provider).

```ts [app.config.ts]
// a minimal, real example
```

> [!TIP]
> Optional callout for a caveat or neat detail.
````

Rules:

- **Verify before you write.** Check option names, defaults and components
  against the merged PR (`gh pr view <n> --repo nuxt-content/docus`),
  `docs/content/en/**`, `layer/index.d.ts` (`nuxt.config` options),
  `layer/app/types/index.d.ts` and `layer/nuxt.schema.ts` (`app.config`),
  `layer/modules/**` and `layer/app/components/**`. Never invent an API.
- **Match the voice**: concise, direct, no em dashes, reads like Baptiste wrote it.
  Look at the last few releases for tone:
  `gh release list --repo nuxt-content/docus --limit 5`, then
  `gh release view <tag> --repo nuxt-content/docus`.
- **Describe what actually shipped, not what it enables.** A title must match the
  real change. Don't inflate a small option into a big feature (e.g. a `vary`
  header on markdown negotiation is a caching fix, not "agent-ready docs").
- When unsure, prefer fewer, accurate highlights over four.
- Emojis: `🤖` assistant/MCP/agents, `🏎️` performance, `🔍` search/SEO,
  `🎨` theming/customization, `🌐` i18n, `🧩` components, `♿` accessibility.

### 3. Breaking changes and upgrade notes

If there is a `⚠️ Breaking Changes` section, or a feature/fix requires users to
change their project on upgrade (check the PR description), add a callout with
the migration step and a docs link, right below the related section:

```md
> [!WARNING]
> What changed, what to do, and a [link to the docs](https://docus.dev/en/...).
```

### 4. Fill New documentation (any release with candidates)

Keep only pages and sections that document something new in this release.
Drop headings that were renamed, moved or reworded. Check each anchor against
the heading on the page. List them as bare URLs, one per bullet:

```md
## 📚 New documentation

* https://docus.dev/en/ai/assistant#custom-provider
```

Delete the section if nothing qualifies.

### 5. Sanity-check and report

- Confirm the contributor list looks right. Co-authors whose email isn't linked
  to a GitHub account are missed:
  `git log <prev>..<tag> --pretty=%b | grep -i co-authored-by`.
- Remove any leftover `<!-- TODO -->` comment.
- Tell the user the file path, which highlights you chose (minor/major only),
  and which docs links you kept.
- Do **not** commit it. It's a scratch file (ignored by `.gitignore`) the user
  pastes into GitHub.

## Format notes (kept in sync with past releases)

- Section order: Highlights → Breaking Changes → Features → Bug Fixes →
  Performance → Reverts → Contributors → New documentation → Full Changelog.
- Patch releases skip Highlights and start at the first changelog section.
- Headers use unicode emojis (`## 🚀 Features`), not `:shortcodes:`.
- `Performance Improvements` is renamed to **Performance**.
- Docs URLs drop numeric prefixes: `docs/content/en/4.ai/1.assistant.md` →
  `https://docus.dev/en/ai/assistant`.
