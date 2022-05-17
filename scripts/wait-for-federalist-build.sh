#!/bin/sh

if [ -z "$GITHUB_REPOSITORY" ]; then
    echo "Github repository information is required as first argument"
    exit 1
fi

if [ -z "$GITHUB_SHA" ]; then
    echo "Commit SHA is required as second argument"
    exit 1
fi

# Query for Federalist build success and return the preview URL if successful
is_federalist_build_successful() {
    curl --silent "$GITHUB_API_URL/repos/${GITHUB_REPOSITORY}/commits/$GITHUB_SHA/status" \
        | jq --exit-status -r -c '.statuses[] | select(.context | contains("federalist/build")) | select(.state | contains("success")) | .target_url'
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