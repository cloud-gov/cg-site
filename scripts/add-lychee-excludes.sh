#!/bin/sh

LYCHEE_ARGS="--github-token $GITHUB_TOKEN"
LYCHEE_ARGS="${LYCHEE_ARGS} --max-concurrency 64"
LYCHEE_ARGS="${LYCHEE_ARGS} --verbose"
LYCHEE_ARGS="${LYCHEE_ARGS} --no-progress"
LYCHEE_ARGS="${LYCHEE_ARGS} './*.md' './_site/**/*.html'"

ADDED_KBARTICLES=$(echo "${ADDED_FILES}" | grep _kbarticles | xargs basename | cut -f 1 -d '.')
for article in $ADDED_KBARTICLES; do
    LYCHEE_ARGS="${LYCHEE_ARGS} --exclude ${article}"
done

echo "$LYCHEE_ARGS"