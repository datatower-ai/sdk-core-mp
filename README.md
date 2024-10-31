<p align="center">
  <a href="https://datatower.ai/" target="_blank">
    <picture>
      <source srcset="https://datatower.ai/assets/dt-logo-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="https://datatower.ai/assets/dt-logo-light.svg" media="(prefers-color-scheme: light)" >
      <img src="https://datatower.ai/assets/dt-logo-light.svg" alt="DataTower.ai" height="64">
    </picture>
  </a>
</p>

---

# DataTower.ai - Core - JavaScript

## Getting Started

### 1.1. 从三方库引入单个平台

- Install

```bash
# xxx 为对应平台，例如 `cocos`, `web`, `uniapp`, `mini-program`
npm i @datatower-ai/sdk-core-xxx
```

- Usage

```typescript
import { DataTower } from '@datatower-ai/sdk-core-xxx';
DataTower.initSDK({/* ... */})
```

### 1.2. 从三方库引入所有平台

- Install

```bash
npm i @datatower-ai/sdk-core-js
```

- Usage

```typescript
import { Web /* Cocos, Uniapp, MiniProgram, ... */ } from '@datatower-ai/sdk-core-js';
Web.initSDK({/* ... */})
```

### 1.3. 从本地引入

- Install
> 下载对应平台的压缩包，解压到项目目录下，例如平台解压到`libs`目录下，以`cocos`为例目录结构如下：

```
assets/
  libs/
    cocos.cjs
    cocos.d.cts
    cocos.mjs
    cocos.d.mts
  scripts/
    example.ts
```

- Usage

```typescript
// example.ts
import { DataTower } from '@/libs/cocos.mjs';
DataTower.initSDK({/* ... */})
```
