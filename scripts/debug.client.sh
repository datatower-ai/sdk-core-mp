#!/bin/bash

# 获取脚本文件所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

# build client
echo "构建客户端..."
cd ../src/client
pnpm dev
