#!/bin/bash

set -e
set -x

ghapi() {
    curl -s -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3+json" "$@"
}

artifact_ids=$(ghapi "https://api.github.com/repos/$REPO/actions/artifacts" | jq '.artifacts[] | .id')

for artifact_id in $artifact_ids; do
    if [[ -n "$artifact_id" ]]; then
        ghapi -X DELETE "https://api.github.com/repos/$REPO/actions/artifacts/$artifact_id"
    else
        echo "No artifacts found"
    fi
done
