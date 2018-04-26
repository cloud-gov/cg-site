#!/bin/sh

set -e
set -x

# install Hugo
HUGO_VERSION=0.40.1
cd /tmp/
curl -O -L https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz
tar xzf hugo_${HUGO_VERSION}_Linux-64bit.tar.gz
mv hugo_*/hugo_* /usr/bin/hugo
cd -

npm install
npm run build

# build the site
hugo

# copy files to output directory, so that they can be read by subsequent step
if [ -n "$COPY_OUTPUT" ]; then
  cp -R . ../cg-site-compiled
fi
