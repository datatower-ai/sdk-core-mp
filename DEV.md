## 1. 开发指南

- 安装依赖

```bash
# 在项目根目录下运行 `install.sh` 脚本
sh scripts/install.sh

# 若已经安装过 `pnpm`，则可以直接运行
pnpm install
```

- 启动开发环境，编译后的代码后会自动关联到`Example`

```bash
# 在根目录下执行命令:
pnpm install
pnpm release:watch
```

- 打开运行`Example`目录下的项目，打包到不同平台。

```bash
# 为 xxx 项目安装依赖
cd Example/xxx
npm i
```

## 2. 编译打包

```bash
# 编译打包，选择对应的平台，生成的文件在 `bundle` 目录下，压缩包在 `release` 目录下
pnpm release
```

## 3. 编译发布

- 发布单个平台
```bash
# 选择对应的平台，生成的可发布文件在 `publish` 目录下
pnpm prepublish
```

- 发布所有平台
```bash
# 生成的文件在 `dist` 目录下
pnpm build
```

## 4. mini app/mini game development documentation

- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/)
- [微信小游戏](https://developers.weixin.qq.com/minigame/dev/api/)
- [QQ 小程序](https://q.qq.com/wiki/develop/miniprogram/API/)
- [QQ 小游戏](https://q.qq.com/wiki/develop/game/API/)
- [支付宝小程序](https://opendocs.alipay.com/mini/api)
- [支付宝小游戏](https://opendocs.alipay.com/mini-game/08uvoz?pathHash=4f723567)
- [抖音小程序](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/api/overview)
- [抖音小游戏](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/overview)
- [360 小程序](https://mp.360.cn/doc/miniprogram/dev/#/8a9a7356fbb45799a2db9e27784bc63a)
- [360 小游戏](https://mp.360.cn/doc/minigame/dev/#/230dc2a66686dc6154f15c3a770c0f7e)
- [淘宝小程序](https://open.taobao.com/v2/doc?spm=a219a.7629140.0.0.a4cf75fejLDZL1#/abilityToOpen?treeId=776&docType=20&docId=957)
- [京东小程序](https://mp-docs.jd.com/doc/dev/api/-1)
- [快手小程序](https://mp.kuaishou.com/docs/develop/api-next/ad/ks.createRewardedVideoAd.html)
- [钉钉小程序](https://open.dingtalk.com/document/orgapp/mini-program-jsapi-overview)
- [百度小程序](https://smartprogram.baidu.com/docs/develop/api/apilist/)
- [哔哩哔哩小游戏](https://miniapp.bilibili.com/small-game-doc/api/intro/)
