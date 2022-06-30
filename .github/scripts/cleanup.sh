#!/bin/bash

# Root
rm -rf node_modules
rm -rf pnpm-lock.yaml

# Docs Theme
rm -rf packages/docs-theme/.nuxt
rm -rf packages/docs-theme/.output
rm -rf packages/docs-theme/.turbo
rm -rf packages/docs-theme/node_modules

# GitHub
rm -rf packages/github/playground/.nuxt
rm -rf packages/github/playground/.output
rm -rf packages/github/test/fixtures/basic/.nuxt
rm -rf packages/github/test/fixtures/basic/.output
rm -rf packages/github/dist
rm -rf packages/github/.turbo
rm -rf packages/github/node_modules

# Docs
rm -rf docs/.nuxt
rm -rf docs/.output
rm -rf docs/.turbo
rm -rf docs/node_modules
