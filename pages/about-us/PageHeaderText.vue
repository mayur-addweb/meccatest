<template>
  <div>
    <h2 class="pageInfo-title about-title">
      {{content.title}}
    </h2>
    <h3 class="subtitle">
      {{subText.image_title_description[0].title}}
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    },
    subText: {
      type: [Object, Array],
      default: null
    }
  }
}
</script>