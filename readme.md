<p align="center"><a href="https://github.com/loveonelong/weapp-workflow" target="_blank" rel="noopener noreferrer"><img width="100" src="https://github.com/loveonelong/weapp-workflow/raw/master/docs/imgs/weapp-workflow-logo.png" alt="weapp-workflow logo"></a></p>

<p align="center">
   <a href="https://www.travis-ci.org/loveonelong/weapp-workflow"><img src="https://www.travis-ci.org/loveonelong/weapp-workflow.svg?branch=master" alt="travis ci"></a>
    <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/loveonelong/weapp-workflow.svg" alt="Greenkeeper badge"></a>
 </p>

# weapp-workflow

 微信小程序开发工作流

> v0.0.6 - alpha

## Team

* Blocks.tech - 区块科技
* [ChainNews - 链闻社](https://www.chainnews.com)

<p align="center">
   <a href="https://www.chainnews.com"><img src="https://github.com/loveonelong/weapp-workflow/raw/master/docs/imgs/logo-ce-blue.png" alt="ChainNews" width="150"></a>
 </p>

## 简介

### 为什么会有这套工作流？

开发小程序时，发现有很多不舒服的地方，虽然 wepy、mpvue 都是非常优秀的框架，但我们希望写更原生的代码，并且不增加额外的学习成本，增强我们自己对代码的控制力，因此便做了这套工作流。

对于了解 gulp 的人，这套工具流几乎没有任何学习成本（它不是框架），可以在几分钟内学会如何使用。

### 这套工作流能解决什么问题？

#### 功能

* pug 转 wxml（也支持直接使用 wxml）
* less 转 wxss（也支持直接使用 wxss）
* single-file-component 转 wxml、wxss、json、js（使用 vue 的单文件组件方式来写小程序, 用 `.vue` 后缀, 仅为了获得 vuejs 的语法高亮）
* 压缩 gif/jpge/png/svg
* dev watch 自动构建，仅处理修改过的文件，速度极快（使用 `npm run build` 命令时压缩图片会比较耗时，dev 模式下不会压缩图片）
* js、css 风格统一 (csscomb、eslint)
* 可以使用 npm 包
* 提供增强微信开发能力的思路

#### 未来实现

* 支持 scss
* 增加 http 消息队列
* 增加 EventBus
* 支持 postcss
* 图片支持使用 CDN
* 增加封装好的常用组件

## 使用（约 5 - 10 分钟即可上手）

### 快速开始

#### 首先选择一些合适的装备

本工作流建议配合 VS Code 使用，以便获得良好的语法高亮和语法提示。

在一切开始之前，请安装 VS Code 并做如下准备:

* 安装 vscode 插件 `Vue VS Code Extension Pack` 以获得 VS Code 语法高亮提示
* 安装 vscode 插件 `minapp` 以获得小程序语法高亮
* 如果你的团队注重 js 风格统一和 css 风格统一，可以考虑在 VS Code 中安装并配置 `csscomb` 、 `eslint` 等插件，本工作流默认提供了 `standard` 风格的 eslint 配置文件

> 单模板文件使用 .vue 为文件扩展名，但其内部并不是 vuejs 的语法，只是为了继承较为良好的语法提示和高亮。后续将修改gulp工作流，使其变成配置项，你可以按照你的喜好来定制单模板文件的扩展名。

#### 准备项目

* 克隆本仓库
* `npm install` 安装所有依赖
* 配置根目录下的 `project.config.json` 文件（小程序自带的配置）
* 打开微信开发者工具 -> 项目管理 -> 项目目录 为本仓库根目录，添加本项目
* 请务必在 `微信开发者->工具详情` 中开启如下功能
  * ES6 转 ES5
  * 上传代码时样式自动补全
  * 上传代码时自动压缩

### 目录结构

```tree
root
  - build                      构建相关代码
  - dist                       构建后生成的代码
  - src                        开发目录
    - components               组件目录
      - X                      一些封装好的小程序常用组件(不需要可以删除他们，以免影响小程序的大小)
    - pages                    页面目录
    - npm
      * index.js               用于引入 npm modules
    - imgs                     图片资源，请确保将所有的图片保存在该目录下
    - utils                    工具类
    * app.js                   app.js
    * app.wxss                 app.wxss
    * app.json                 app.json
    * config.js                config.js
  - supports                   辅助工具
    * vscode.code-snippets      将该文件导入 vscode 中的用户代码片段，可以在 sfc 文件中获得代码片段提示
  - typings
    * wx.d.ts                  微信小程序接口的类型文件，在 vscode 中可以获得代码提示
  * .csscomb.json              对 css 进行格式化、排序，统一
  * .eslintignore              eslint 忽略文件
  * .eslintrc.js               eslint 规则
  * jsconfig.json              配合 typings 下的 ts 文件，引导 vscode 提示代码
  * package.json               ...
  * package-lock.json          ...
  * project.config.json        小程序的配置文件（注意将配置里的小程序目录指向 ./dist 目录）
  * readme.md                  ...
```

Demo 实例：

* pages - 大多数页面用了 sfc 写法
* pages - logs 页面用了原生写法
* components - 组件用了 sfc（.vue）的方式

#### 开发模式

```shell
npm run dev
```

该模式会先对所有的文件进行一遍初始化构建，然后监听 `src` 目录下所有的文件，当文件改变时再次进行处理（只处理发生改变的文件，所以速度极快）。

开发模式下不会对图片、样式进行压缩，特别是图片压缩会非常消耗时间，这些都放在构建模式中处理。

你可以通过控制台来看到有哪些资源发生了变化。

#### 构建模式

```shell
npm run build
```

该模式会对 `src` 下所有的文件进行构建，并进行一些压缩处理（图片压缩等），经过测试以后，可以用于上线。

#### 风格统一

这里提供了连个命令分别用于检查和自动修复 js、css(less)，在持续集成中你也可以使用这两个命令来完成简单代码风格的测试。

* `npm run eslint`
* `npm run csscomb`

### gulp4

`npm build` 和 `npm run dev` 的背后是两个不同的gulp任务。

除了这两个任务以外，还提供了两个辅助任务:

* `cancel-sfc` 取消使用 sfc 文件，该任务会将 `src` 目录下所有的 `.vue` 文件在其所在目录下拆分为 `wxss/less`、`js`、`json`、`wxml/pug` 文件。（针对不想使用单文件组件的人）
* `del-sfc` 删除所有 `src` 目录下的 sfc 文件（.vue 文件）。请谨慎使用该命令，除非你确认所有的 sfc 文件已经拆分完成！

### 使用npm

你可以直接使用 `npm install --save 你需要的包名` 来安装，然后在 `src/npm` 下建立一个 js 文件，里面引入这个包再导出即可，工作流里会对 `src/npm` 目录下所有的 js 单独打包。

在需要用到 npm 包的时候，引入这些 js 文件即可。

```javascript
// src/npm/foo.js
import dayjs from 'dayjs'
export { dayjs }

// use dayjs in other file
import { dayjs } from '../npm/foo.js'

// 也可以在 src/pages/logo 查看 demo

```

### 增强微信开发能力的思路

在 `app.js` 中你可以看到引入了一个 `weappx.js` 文件，你可能会很好奇这个文件是来干嘛的，其实你可以打开看一下，它很简单，提供了一个初级的增强微信原生开发能力的 demo，这也是我们为什么要做这套工作流的原因之一，可以更自由，获得更多控制代码的能力。

我们在demo里重写了一个生命周期的方法，可以作为参考，你可以添加一些更酷的功能，比如自己实现状态管理、计算属性等。

## Q&A

* 为什么这套工作流没有提供压缩 wxml、js、es5 转 es6 这些功能呢？

  * 微信开发者工具里已经提供相关功能，本工作流暂时不考虑。