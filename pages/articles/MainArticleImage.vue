<template>
  <div class="art-view d-md-block">
    <img v-if="content" :src="content.url" :alt="content.alt" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [Array, Object],
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.art-view {
  @media all and (max-width: 767px) {
    width: 100%;
  }
  img {
    width: 100%;
    height: 188px;
    object-fit: fill;
    @media all and (min-width: 768px) {
      width: 820px;
      height: 550px;
    }
  }
}
</style>