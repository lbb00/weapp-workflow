<doc>
props:
  * show {Boolean} 用来控制popup的显隐。true显示、false隐藏
events:
  * tap-mask 点击mask时触发
  * on-show popup显示时触发
  * on-hide popup隐藏时触发
slot:
</doc>

<json>
{
  "component": true,
  "usingComponents": {}
}
</json>

<template lang="pug">
view(class="{{show ? 'show':''}}")
  view.mask(bind:tap="{{show ? 'tapMask' : ''}}" style!="{{'z-index:'+maskZIndex+';'}}" catch:touchmove="{{show ? 'catchTouch' : ''}}")
  view.body(catch:tap="catchTapBody")
    slot
</template>

<script>
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    show: {
      value: false,
      type: Boolean,
      observer (n, o) {
        if (n === true) {
          this.setData({
            maskZIndex: 999
          })
          this.triggerEvent('on-show')
        } else {
          this.triggerEvent('on-hide')

          // 在css动画之后设置z-index:-1，避免遮罩层影响点击
          setTimeout(() => {
            this.setData({
              maskZIndex: -1
            })
          }, 400)
        }
      }
    }
  },
  data: {
    maskZIndex: -999
  },
  methods: {
    tapMask () {
      this.triggerEvent('tap-mask')
    },
    catchTapBody () {},
    catchTouch () {}
  }
})
</script>


<style lang="less">
.mask {
  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  opacity: 0;
  background: #000;

  transition: opacity .4s;
}
.body {
  position: fixed;
  top: 100%;
  left: 0;

  width: 100%;

  background: #fff;

  transition: transform .3s ease;
  transform: translateY(0);
}

.show {
  .mask {
    opacity: .65;
  }
  .body {
    z-index: 1000;

    transform: translateY(-100%);
  }
}

</style>