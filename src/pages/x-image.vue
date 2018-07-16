<json>
{
  "navigationBarTitleText": "",
  "usingComponents": {
    "x-image": "/components/X/Image"
  }
}
</json>

<template lang="pug">
view 懒加载100张图片，可以通过控制台看到相关变化
 x-image(wx:for="{{100}}" class="logo" wx:key="{{index}}" src="http://s1.51cto.com/wyfs02/M02/8A/A1/wKiom1g1d4KzJLj_AAENEPluz5E910.jpg-wh_651x-s_1750868483.jpg" loadHolder="/imgs/weapp.jpeg" lazy-load="{{true}}" bind:error="_error" bind:load="_load")
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
  _load (e) {
    console.log(e, '图片加载成功')
  },
  _error (e) {
    console.log(e, '图片加载失败')
  }
})
</script>

<style lang="less">
.logo {
  display: block;

  width: 400rpx;
  height: 200rpx;
  margin: 0 auto;
}

</style>