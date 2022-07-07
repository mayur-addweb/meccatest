<template>
<div class="video-block">
  <iframe width="640" height="360" :src="getvideo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
</template>

<script>
export default {
  props:["videoLink"],
  computed:{
    getvideo(){
      const result = this.videoLink.replace("watch?v=","embed/")
      return result
    }
  },
}
</script>

<style lang="scss" scoped>
iframe {
  @media all and (min-width: 992px) {
    width: 100%;
    max-width: 1122px !important;
    height: 718px !important;
  }
}
</style>