<template>
  <section class="seeker-of-knowledge" v-if="content && content[0]">
    <div class="sec-head text-center">
      <h2 class="sec-title" v-if="content[0].title">{{ content[0].title }}</h2>
      <p class="sec-desc" v-html="content[0].description.text" v-if="content[0].description.text && content[0].description"></p>
    </div>
    <p
      class="desc seeker-desc"
      v-if="knowledgeDesc"
      v-html="knowledgeDesc.content"
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
    knowledgeDesc: {
      type: Object,
      default: null,
    },
  },
};
</script>


<style lang="scss" scoped>
.seeker-of-knowledge {
  // padding-bottom: 90px;
  padding-top: 60px;
  @media only screen and (max-width: 767px) {
    padding: 0 20px 0px 20px;
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