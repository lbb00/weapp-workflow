<json>
{
  "component": true,
  "usingComponents": {}
}
</json>

<template lang="pug">
view.list
  view.item(wx:for='{{list}}' wx:key='{{index}}' bind:tap='_onTap' data-index='{{index}}')
    list.item-name {{item.name}}
</template>

<script>
Component({
  options: {
    multipleSlots: false
  },
  properties: {
    list: {
      type: Object,
      value: ''
    }
  },
  data: {

  },
  methods: {
    _onTap (e) {
      let index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: this.data.list[index].url
      })
    }
  }
})
</script>

<style lang="less">
.list {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 6rpx;

  background: #f5f5f5;
  .item {
    float: left;
    overflow: hidden;

    box-sizing: border-box;
    width: 357rpx;
    height: 240rpx;
    margin: 6rpx;

    background: #fff;

    text-align: center;
  };
}

</style>