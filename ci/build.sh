#!/bin/sh	

set -e	
set -x	

npm install	
bundle install
npm run build
npm run test

