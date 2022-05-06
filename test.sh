#!/bin/bash

LYCHEE_ARGS="--github-token fake"
LYCHEE_ARGS="${LYCHEE_ARGS} --max-concurrency 64"
LYCHEE_ARGS="${LYCHEE_ARGS} --verbose"
LYCHEE_ARGS="${LYCHEE_ARGS} --no-progress"
LYCHEE_ARGS="${LYCHEE_ARGS} './*.md' './_site/**/*.html'"

HEAD_SHA=$(git rev-parse HEAD)
ADDED_FILES=$(git diff --name-only --diff-filter A master ${HEAD_SHA})

ADDED_KBARTICLES=$(echo "${ADDED_FILES}" | grep _kbarticles | xargs basename | cut -f 1 -d '.')
for article in $ADDED_KBARTICLES; do
    echo "$article"
done
