#!/bin/sh

LYCHEE_EXCLUDES=$(sh scripts/add-lychee-excludes.sh)
# shellcheck disable=SC2086
lychee \
    --github-token="${GITHUB_TOKEN}" \
    --max-concurrency 64 \
    --format=markdown \
    "${1:-_site}" \
    ${LYCHEE_EXCLUDES}