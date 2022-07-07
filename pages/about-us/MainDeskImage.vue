<template>
  <div class="view viewImg d-none d-xl-block">
    <img :src="image.image.url" :alt="image.image.alt" />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: [Object, String],
      default: null
    }
  }
}
</script>

<style lang="scss"  scoped>
.viewImg {
    img {
    max-height: 898px;
    max-width: 611px;
  }
}
</style>