#!/bin/sh

GITHUB_REPO=$1
if [ -z "$GITHUB_REPO" ]; then
    echo "Github repository information is required as first argument"
    exit 1
fi

GITHUB_SHA=$2
if [ -z "$GITHUB_SHA" ]; then
    echo "Commit SHA is required as second argument"
    exit 1
fi

curl "https://api.github.com/repos/${GITHUB_REPO}/commits/$GITHUB_SHA/status" | jq '.statuses'
