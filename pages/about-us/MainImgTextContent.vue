<template>
  <div>
    <p v-html="content.description.text" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    }
  }  
}
</script>

