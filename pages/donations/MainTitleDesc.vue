<template>
  <div>
    <h2 class="info-title pageInfo-title">{{ content.title }}</h2>
    <h3 class="subtitle">
      {{ component.title }}
    </h3>
    <p class="desc" v-html="component.description.text" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    },
    component: {
      type: [Object, Array],
      default: null
    },
  }
}
</script>
