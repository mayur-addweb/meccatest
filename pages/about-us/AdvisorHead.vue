<template>
  <div class="advisor-head">
    <h2>{{ content.title }}</h2>
    <p class="desc d-none d-md-block" v-html="content.description.text" />
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