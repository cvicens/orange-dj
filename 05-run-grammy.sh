#!/bin/bash
# https://github.com/apache/incubator-openwhisk-deploy-openshift

# Environment
. ./00-environment.sh

TOKEN=$(oc whoami -t)

if [ -z ${TOKEN} ]; then
echo "You need to log in your Openshift cluster first..."
exit 1
fi

ACTION_NAME="grammy/skill-gw"

# Query
INVOKE_RESULT=$(wsk -i action invoke --result ${ACTION_NAME} -p request '{"timestamp":"2018-12-13T09:05:36Z","intent":{"name":"AwardedSearch","confirmationStatus":"NONE","slots":{"query":{"name":"query","value":"best DJ","confirmationStatus":"NONE","source":"USER"}}},"locale":"en-US","requestId":"amzn1.echo-api.request.f8ac8cfb-c75c-4e6f-9d4b-e27a088c86f5","type":"IntentRequest"}')
printf "\n\nRESULT\n${INVOKE_RESULT}\n"
