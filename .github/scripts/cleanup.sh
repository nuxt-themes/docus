#!/bin/bash

# Root
rm -rf node_modules
rm -rf pnpm-lock.yaml

# Base
rm -rf packages/base/.nuxt
rm -rf packages/base/.output
rm -rf packages/base/.turbo
rm -rf packages/base/node_modules

# Docs Theme
rm -rf packages/docs-theme/.nuxt
rm -rf packages/docs-theme/.output
rm -rf packages/docs-theme/.turbo
rm -rf packages/docs-theme/node_modules

# Docs
rm -rf docs/.nuxt
rm -rf docs/.output
rm -rf docs/.turbo
rm -rf docs/node_modules
