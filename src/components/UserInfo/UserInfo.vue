<json>
{
  "component": true,
  "usingComponents": {}
}
</json>

<template lang="pug">
view.userinfo
  image.userinfo-avatar(bind:tap='bindViewTap', src='{{propUserInfo.avatarUrl}}', background-size='cover',type)
  text.userinfo-nickname {{propUserInfo.nickName || ''}}

</template>

<style lang="less">
.userinfo {
  display: flex;

  flex-direction: column;
  align-items: center;

  &-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
  &--nickname {
    color: #aaa;
  }
}

</style>

<script>
Component({
  options: {
    multipleSlots: false
  },
  properties: {
    propUserInfo: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    }
  }
})
</script>