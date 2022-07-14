#!/bin/bash

# Bump versions to edge
npx jiti ./.github/scripts/bump-edge $PWD

# Update token
if [[ ! -z ${NODE_AUTH_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  echo "npmAuthToken: ${NODE_AUTH_TOKEN}" >> ~/.yarnrc.yml
  npm whoami
fi

# # Release package
echo "Publishing $PWD"
npm publish --access public --tolerate-republish
echo "Published $PWD"
