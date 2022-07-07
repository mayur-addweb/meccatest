<template>
  <section class="aboutbook-sec">
    <div class="container">
      <div class="about-info">
        <h2 class="abt-title d-md-none">{{ content.title }}</h2>
        <h2 class="abt-title d-none d-md-block">{{ content.title }}</h2>
        <p class="desc d-md-none" v-if="content.description" v-html="content.description.text">
        </p>
        <p
          v-if="content.description"
          class="desc d-none d-md-block"
          v-html="content.description.text"
        />

        <base-button 
          parentStyleClass="btn readmore-btn"
          :withIcon="false"
          :titleText="content.cta.label"
          :toDestination="content.cta.url"
          :linkButton="true"
        />
      </div>
      <div class="placeholder-img d-none d-md-block">
        <img
          :src="aboutimg.image[0].image.url"
          :alt="aboutimg.image[0].image.alt"
         v-if="aboutimg"/>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "../../components/Button/BaseButton.vue";
export default {
  props: {
    content: {
      type: [Object, Array],
      default: null,
    },
    aboutimg: {
      type: [Object, Array],
      default: null,
    },
  },
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
.about-info {
  width: 578px;
  height: 292px;
  @media all and (max-width: 425px) {
    position: relative !important;
    overflow: visible;
    width: 100%;
    margin: 0 auto;
  }
}
</style>