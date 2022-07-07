<template>
  <div class="feature-block">
  <div class="feature-wrap"
  v-for="item in freeshipping"
  :key="item.image.url">
    <div class="feature-icon">
      <img class="feature-four-icons" :src="item.image.url" :alt="item.image.alt">
    </div>
    <div class="feature-info">
      <h4>{{ item.title }}</h4>
      <p v-html="item.description.text"></p>
    </div>
  </div>
  </div>
</template>

<script>
export default ({
  props: {
    freeshipping: {
      type: [Object, Array],
      default: null
    }
  },
})
</script>

<style lang="scss" scoped>
.feature-four-icons {
    width: 24.04px;
    height: 24px;
    display: block;
    max-width: 24.04px;
}
.feature-block {
  margin-bottom: 0px;
}
</style>