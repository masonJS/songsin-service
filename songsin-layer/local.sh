#!/bin/bash

echo 'ℹ️ Setting up ℹ️'
rm -rf dist && rm -rf node_modules
npm install

mkdir -p dist/libs && cp -r src/ dist/libs && cp -r node_modules dist/libs
echo '✅  Setting up complete ✅'

echo 'ℹ️  Copying files to /opt ℹ️'
sudo cp -r dist/libs /opt
echo '✅  Copied files to /opt ✅'

echo 'ℹ️  Cleaning up ℹ️'
rm -rf dist
echo '✅  Cleaned up ✅'
