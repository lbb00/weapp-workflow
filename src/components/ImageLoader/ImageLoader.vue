<json>
{
  "component": true,
  "usingComponents": {}
}
</json>

<template lang="pug">
image.reality(wx:if="{{showReality}}")
image.virtual(wx:else )
</template>

<style lang="less">

</style>

<script>
Component({
  options: {
    multipleSlots: false
  },
  properties: {
    src: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    lazyLoad: {
      type: Boolean,
      value: false
    }
  },
  data: {
    showReality: false
  },
  methods: {

  }
})
</script>