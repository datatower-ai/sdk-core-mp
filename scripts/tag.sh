#!/bin/bash

# 获取脚本文件所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

cd ../src/client
# pnpm build

cp -r ../native ./dist/cocos
cd ./dist/cocos
tar -czvf datatower-cocos-sdk.tar.gz ./*
mv datatower-cocos-sdk.tar.gz ../../../../
rm -rf ./native
