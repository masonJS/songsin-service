#!/bin/bash

echo 'ℹ️ Setting up ℹ️'
rm -rf dist && rm -rf node_modules
npm install

## songsin-libs
mkdir -p dist/commonlibs/libs && cp -r src/ dist/commonLibs/libs && cp -r node_modules dist/commonLibs/libs

## songsin-nodeJs
mkdir -p dist/nodeDependencies/nodejs/node10 && cp -r node_modules dist/nodeDependencies/nodejs/node10

echo '✅ Setting up complete ✅'

echo 'ℹ️ Deploying ℹ️'
sls deploy -v --stage $STAGE
echo '✅  Successfully deployed ✅'

echo 'ℹ️  Cleaning up ℹ️'
rm -rf dist
echo '✅  Cleaned up ✅'
