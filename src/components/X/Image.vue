<doc>
x-image组件，支持所有小程序原生image组件的属性:
https://developers.weixin.qq.com/miniprogram/dev/component/image.html

新添加的扩展属性
  * loadHolder 图片加载时使用的占位图
  * errorHolder 图片加载失败使用的占位图

由于本组件中包含了两个image标签，而且class不支持作为组件的对外属性，因此我们将目标image标签的with、height设置为100%，因此你在使用时需要在组件上为其设置with和height,否则图片可能显示不出来
example
  wxml
    <x-image class="img"><x-image>
  wxss
    .img{
      with: 300rpx;
      height: 300rpx;
    }
</doc>

<json>
{
  "component": true,
  "usingComponents": {}
}
</json>

<template lang="pug">
image.loader(wx:if="{{status === 0}}" src="{{src}}"  lazy-load="{{lazyLoad}}" bind:error="binderror" bind:load="load")
image.target(src!="{{status === 0 ? loadHolder : (status === 1 ? src : errorHolder)}}" mode="{{mode}}")
</template>    

<style lang="less">
.loader {
  width: 0;
  height: 0;
}
.target {
  width: 100%;
  height: 100%;
}

</style>

<script>
Component({
  options: {
    multipleSlots: false
  },
  properties: {
    // image组件原生属性
    src: {
      type: String,
      value: ''
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    // 扩展
    loadHolder: {
      type: String,
      value: ''
    },
    errorHolder: {
      type: String,
      value: ''
    }
  },
  data: {
    status: 0 // -1 加载失败，0加载中，1加载成功
  },
  methods: {
    load (e) {
      this.setData({
        status: 1
      })
      this.triggerEvent('load', e)
    },
    error (e) {
      // 如果error holder不存在，load holder存在，则将error holder替换为load holder
      if (this.errorHolder === '' && this.loadHolder !== '') {
        this.setData({
          loadHolder: this.data.errorHolder,
          status: -1
        })
      } else {
        this.setData({
          status: -1
        })
      }
      this.triggerEvent('error', e)
    }
  }
})
</script>