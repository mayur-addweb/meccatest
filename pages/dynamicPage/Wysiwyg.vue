<template>
  <section class="seeker-of-knowledge" v-if="content && content[0]">
    <p
      class="desc seeker-desc"
      v-if="content[0].content"
      v-html="content[0].content"
    ></p>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: [Object, Array],
      default: null,
    },
  },
};
</script>


<style lang="scss" scoped>
.seeker-of-knowledge {
  padding-bottom: 90px;
//   padding-top: 60px;
  @media only screen and (max-width: 767px) {
    padding: 0 20px 90px 20px;
  }
  .sec-head {
    margin-bottom: 45px;
  }
}
.seeker-desc {
  margin: 0 auto;
  text-align: center;
  max-width: 820px;
}
</style>