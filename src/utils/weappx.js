// 用于增强微信原本身能力
// 提供额外的生命周期，或是其它架构上你想改变的事情

const _App = App
const _Component = Component
const _Page = Page

// eslint-disable-next-line no-global-assign
App = (options) => {
  _App(options)
}

// eslint-disable-next-line no-global-assign
Page = (options) => {
  let _onLoad = options.onLoad || function () { }

  options.onLoad = function (onLoadOptions) {
    // 你可以在这里注入一些公用代码，它将会被应用于每个页面
    _onLoad.call(this, onLoadOptions)
  }
  _Page(options)
}

// eslint-disable-next-line no-global-assign
Component = (options) => {
  _Component(options)
}
