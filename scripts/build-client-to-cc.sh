#!/bin/bash

# 获取脚本文件所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

# 检查是否已安装 Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js 未安装，开始安装..."
    
    # 使用包管理器安装 Node.js
    if command -v brew &> /dev/null; then
        brew install node
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y nodejs
    elif command -v yum &> /dev/null; then
        sudo yum install -y nodejs
    else
        echo "无法确定系统的包管理器，请手动安装 Node.js。"
        exit 1
    fi
    
    # 验证安装结果
    if ! command -v node &> /dev/null; then
        echo "Node.js 安装失败，请检查网络连接或手动安装。"
        exit 1
    fi
    
    echo "Node.js 安装成功！"
else
    echo "Node.js 已安装。"
fi

# 检查是否已安装 npm
if ! command -v npm &> /dev/null; then
    echo "npm 未安装，开始安装..."
    # 使用包管理器安装 npm
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y npm
    elif command -v yum &> /dev/null; then
        sudo yum install -y npm
    elif command -v brew &> /dev/null; then
        brew install npm
    else
        echo "无法确定系统的包管理器，请手动安装 npm。"
        exit 1
    fi
    # 验证安装结果
    if ! command -v npm &> /dev/null; then
        echo "npm 安装失败，请检查网络连接或手动安装。"
        exit 1
    fi
    echo "npm 安装成功！"
else
    echo "npm 已安装。"
fi

# 检查是否已安装 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "pnpm 未安装，开始安装..."
    npm install -g pnpm
    # 验证安装结果
    if ! command -v pnpm &> /dev/null; then
        echo "pnpm 安装失败，请检查网络连接或手动安装。"
        exit 1
    fi
    echo "pnpm 安装成功！"
else
    echo "pnpm 已安装。"
fi

# build client
echo "构建客户端..."
cd ../src/client
pnpm install
pnpm build

# copy client to cc
echo "复制client js到 cc..."
cp -r dist/CocosCreator/* ../../Example/cc/assets/libs/
