#!/bin/bash

# Bump versions to edge
npx jiti ./.github/scripts/bump-edge $PWD/theme

cd theme/

# Update token
if [[ ! -z ${NODE_AUTH_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  npm whoami
fi

# # Release package
echo "Publishing $PWD/theme"
npm publish --access public --tolerate-republish
echo "Published $PWD/theme"
