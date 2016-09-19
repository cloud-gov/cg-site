#!/bin/sh

set -e
set -x

# install dependencies, for the following (respectively): NPM, node-sass, Hugo
# https://github.com/18F/cg-docs/issues/279
apk add --no-cache --update \
  git \
  g++ make python \
  ca-certificates wget

# install Hugo
# https://github.com/jojomi/docker-hugo/blob/f4f0b5f777950d3621340c514ad668df46136fd9/Dockerfile
HUGO_VERSION=0.16
cd /tmp/
wget https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-64bit.tgz
tar xzf hugo_${HUGO_VERSION}_linux-64bit.tgz
mv hugo /usr/bin/hugo
cd -

npm install
npm run build

# build the site
hugo

# copy files to output directory, so that they can be read by subsequent step
if [ -n "$COPY_OUTPUT" ]; then
  cp -R . ../cg-docs-compiled
fi
