# sdk-core-mp

## 1. 开发指南

- 1. 安装依赖

```bash
# 在项目根目录下运行 `install.sh` 脚本
sh scripts/install.sh
```

- 2. 启动开发环境，修改`client`目录下的代码后会自动编译到`Example`

```bash
# 在项目根目录下运行 `debug.client.sh` 脚本
sh scripts/debug.client.sh

# 或者，在 `client` 目录下执行命令:
pnpm install
pnpm dev
```

- 3. 打开运行`Example`目录下的项目，打包到不同平台。

## 2. 编译打包

```bash
# 在项目根目录下运行 `install.sh` 脚本
sh scripts/install.sh

# 进入 client 目录
cd src/client

# 编译打包，生成的文件在 `dist` 目录下
pnpm build
```
