# weapp-workflow v0.0.3

<p align="center"><a href="https://github.com/loveonelong/weapp-workflow" target="_blank" rel="noopener noreferrer"><img width="100" src="https://cdn.rawgit.com/loveonelong/weapp-workflow/tree/fix/doc/imgs/weapp-workflow-logo.png" alt="weapp-workflow logo"></a></p>

<p align="center">
   <a href="https://www.travis-ci.org/loveonelong/weapp-workflow"><img src="https://www.travis-ci.org/loveonelong/weapp-workflow.svg?branch=master" alt="travis ci"></a>
 </p>

> 微信小程序开发工作流

欢迎fork、提issue

## Thanks

* Blocks.tech - 技术团队
* [ChainNews - 链闻社](https://www.chainnews.com)

<p align="center">
   <a href="https://www.chainnews.com"><img src="https://cdn.rawgit.com/loveonelong/weapp-workflow/tree/fix/doc/imgs/logo-ce-blue.png" alt="ChainNews"></a>
 </p>

## 简介

### 为什么会有这套工作流？

在开发小程序的时候，发现有很多不舒服的的地方，但又不想违背小程序原生开发的方式，所以创建了这个小程序开发工作流。

对于了解gulp的人，这套工具流几乎没有任何学习成本（它不是框架），可以在几分中学会如何使用它。

### 工作流能解决什么问题？

#### 已经实现

* pug 转 wxml（也支持直接使用wxml）
* less 转 wxss（也支持直接使用wxss）
* sfc 转 wxml、wxss、json、js（使用vue的单文件组件方式来写小程序）
* 压缩gif/jpge/png/svg
* 自动编译，仅处理修改过的文件，编译极快（除了压缩图片比较耗时）
* js、css风格统一
* 打包npm script

#### 未来实现

* 图片支持使用 CDN
* 增加一些封装好的常用组件

## 使用

### 快速开始

#### 首先选一把合适的武器

本工作流建议配合VS Code使用，以便获得良好的语法高亮和语法提示。

在一切开始之前，请在VS Code做如下准备:

* 安装vscode插件`Vue VS Code Extension Pack`以获得VS Code语法高亮提示
* 安装vscode插件`minapp`以获得语法高亮
* 如果你的团队注重js风格统一和css风格统一，可以考虑在VS Code中安装并配置`csscomb`、`eslint`等插件

#### 准备项目

* 克隆本仓库
* `npm install`安装所有依赖
* 配置根目录下的`project.config.json`文件
* 打开微信开发者工具，选择项目，项目目录为本仓库根目录
* 请务必在`微信开发者->工具详情`中开启如下功能
  * ES6 转 ES5
  * 上传代码时样式自动补全
  * 上传代码时自动压缩

#### 开发模式

```shell
npm run dev
```

该模式会先对所有的文件进行一遍构建，然后监听src目录下那些文件发生改变，当文件改变时再次进行处理（只处理发生改变的文件，所以速度很快）。

开发模式下不会对图片、样式进行压缩，特别是图片压缩会非常消耗时间，这些都放在构建模式中处理。

你可以通过控制台来看到有哪些资源发生了变化。

#### 构建模式

```shell
npm run build
```

该模式会先对所有的文件进行一遍构建，经过测试以后，可以用于上线部署。

#### 风格统一

这里提供了连个命令分别用于检查和自动修复js、css(less)，在持续集成中你也可以使用这两个命令来完成简单代码风格的测试。

* `npm run eslint`
* `npm run csscomb`

### 目录结构

```tree
root
  - build                      构建相关代码
  - dist                       构建后生成的小程序
  - src                        开发目录
    - components               组件目录
    - pages                    页面目录
    - npm
      * npm.js                 用于引入用到的npm script，方便打包处理(注意: 只有`npm/npm.js`会被webpack打包)
    - imgs                     图片资源，请确保将所有的图片保存在该目录下
    - utils                    工具类
    * app.js                   app.js
    * app.wxss                 app.wxss
    * app.json                 app.json
    * config.js                config.js
  - supports                   辅助工具
    * weapp.code-snippets      将该文件导入vscode中，可以在sfc中获得代码片段提示
  - typings
    * wx.d.ts                  微信小程序接口的类型文件，在vscode中可以获得代码提示
  * .csscomb.json              对css进行格式化、排序，统一
  * .eslintignore              eslint忽略文件
  * .eslintrc.js               eslint规则
  * jsconfig.json              配合typings下的ts文件，引导vscode去提示代码
  * package.json               ...
  * package-lock.json          ...
  * project.config.json        小程序的配置文件（注意将配置里的小程序目录指向./dist目录）
  * readme.md                  ...
```

三种不同的实例：

* pages - index页面用了less和pug
* pages - logs页面用了原生写法
* components - UserInfo组件用了sfc（.vue）的方式

### gulp4

`npm build`和`npm run dev`的背后是两个不同的gulp任务。

除了这两个任务以外，还提供了两个辅助任务:

* `cancel-sfc` 取消使用sfc文件，该任务会将`src`目录下所有的`.vue`文件在期目录下拆分为`wxss/less`、`js`、`json`、`wxml/pug`文件。（针对不想使用单文件组件的人）
* `del-sfc` 删除所有src目录下的sfc文件（.vue文件）。请谨慎使用该命令，除非你确认所有的sfc文件已经拆分完成！

## Q&A

> 为什么这套工作流没有提供压缩wxml、js、es5转es6这些功能呢？

这套工作流专注的是小程序开发工具不能处理的事情，希望开发流程更加接近微信小程序原生的模式。

不过，后续这些功能可能会被添加进来。
