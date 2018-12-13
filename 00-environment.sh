#!/bin/bash

# linux | mac | windows
export PLATFORM="mac"

export PROJECT_NAME="openwhisk-demo"

export MINISHIFT_VERSION="v3.11.0"

export MINISHIFT_PROFILE="openwhisk"
export MINISHIFT_MEMORY="5GB"
export MINISHIFT_CPUS="3"
export MINISHIFT_VM_DRIVER="xhyve" # xhyve | virtualbox | kvm
export MINISHIFT_DISK_SIZE="50g"

export PATH=$PATH:./bin