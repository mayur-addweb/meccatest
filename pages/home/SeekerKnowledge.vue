<template>
  <section class="seeker-of-knowledge">
    <div class="sec-head text-center">
      <h2 class="sec-title">{{ seekerKnowledge.title }}</h2>
      <p class="sec-desc" v-html="seekerKnowledge.description.text"></p>
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
    seekerKnowledge: {
      type: Object,
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
  .sec-head {
    margin-bottom: 74px;
  }
}
.seeker-desc {
  margin: 0 auto;
  text-align: center;
  max-width: 820px;
}
.sec-head.text-center {
  margin-bottom: 45px;
}
section.seeker-of-knowledge {
  // @media all and (max-width: 767px) {
  //   margin: 0 20px;
  // }
}
</style>