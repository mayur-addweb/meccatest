<template>
  <div class="blog-left d-block d-lg-none">
    <img
      :src="image.url"
      :alt="image.alt"
      style="width: 100%"
    />
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-left {
  img {
    height: 320px;
  }
}
</style>