#!/bin/sh

LYCHEE_EXCLUDES=""
if [ -z "${ADDED_FILES}" ]; then
    ADDED_FILES=$(git diff --name-only --diff-filter A master "$(git rev-parse HEAD)")
fi

# exclude new knowledge base articles which haven't been published to the site yet
ADDED_KBARTICLES=$(echo "${ADDED_FILES}" | grep _kbarticles | xargs basename | cut -f 1 -d '.')
for article in $ADDED_KBARTICLES; do
    LYCHEE_EXCLUDES="${LYCHEE_EXCLUDES} --exclude ${article}"
done

echo "$LYCHEE_EXCLUDES"