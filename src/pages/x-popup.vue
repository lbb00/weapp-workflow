<json>
{
  "navigationBarTitleText": "",
  "usingComponents": {
    "x-popup": "/components/X/Popup"
  }
}
</json>

<template lang="pug">
button(bind:tap="_popup") popup
x-popup(bind:tap-mask="_popup" show="{{showPopup}}" bind:on-hide="_popupOnHide" bind:on-show="_popupOnShow")
  view.popup-slot 测试
</template>

<script>
Page({
  data: {

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

  },
  _popup () {
    this.setData({
      showPopup: !this.data.showPopup
    })
  },
  _popupOnShow () {
    console.log('popup show')
  },
  _popupOnHide () {
    console.log('popup hide')
  }
})
</script>

<style lang="less">
.popup-slot {
  display: flex;

  justify-content: center;
  align-items: center;

  height: 500rpx;
}

</style>