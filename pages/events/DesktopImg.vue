<template>
  <div class="col-lg-6 d-lg-flex justify-content-lg-center">
    <div class="blog-left d-none d-lg-block">
      <img :src="image.url" :alt="image.alt" class="event-blogImg"/>
    </div>
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