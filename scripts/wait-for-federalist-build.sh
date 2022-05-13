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

is_federalist_build_successful() {
    curl --silent "https://api.github.com/repos/${GITHUB_REPO}/commits/$GITHUB_SHA/status" \
        | jq --exit-status -c '.statuses[] | select(.context | contains("federalist/build")) | select(.state | contains("pending"))'
}

attempt_counter=0
max_attempts=20

while ! is_federalist_build_successful; do
    if [ ${attempt_counter} -eq ${max_attempts} ]; then
      echo "Max attempts reached"
      exit 1
    fi

    echo "Did not find successful Federalist build, retrying"
    attempt_counter=$((attempt_counter+1))
    sleep 30
done