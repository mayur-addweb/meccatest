<template>
  <div class="small-view d-xl-none" v-if="image && image.image && image.image.url && image.image.alt">
    <img :src="image.image.url" :alt="image.image.alt">
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