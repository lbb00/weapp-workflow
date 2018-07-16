<json>
{
  "navigationBarTitleText": "",
  "usingComponents": {
    "components-list": "/components/ComponentsList"
  }
}
</json>
<template lang="pug">
components-list(list='{{componentsList}}')
</template>

<script>
Page({
  data: {
    componentsList: [
      {
        name: 'x-popup',
        url: '/pages/x-popup'
      },
      {
        name: 'x-image',
        url: '/pages/x-image'
      },
      {
        name: 'log',
        url: '/pages/logs/logs'
      }
    ]
  },
  onLoad (options) {

  },
  onReady () {

  },
  onShow () {

  },
  onHide () {

  },
  onUnload () {

  },
  onPullDownRefresh () {

  },
  onReachBottom () {

  },
  onShareAppMessage () {

  }
})
</script>

<style lang="less">

</style>