<template>
  <section class="aboutbook-sec">
    <div class="container">
      <div class="about-info" v-if="content[0] && content[0].details && content[0].details[0]">
        <h2 class="abt-title d-md-none">{{ content[0].details[0].title }}</h2>
        <h2 class="abt-title d-none d-md-block">{{ content[0].details[0].title }}</h2>
        <p class="desc d-md-none" v-if="content[0].details[0].description" v-html="content[0].details[0].description.text">
        </p>
        <p
          v-if="content[0].details[0].description"
          class="desc d-none d-md-block"
          v-html="content[0].details[0].description.text"
        />

        <base-button
          parentStyleClass="btn readmore-btn"
          :withIcon="false"
          :titleText="content[0].details[0].cta.label"
          :toDestination="buttonLink"
          :linkButton="true"
          v-if="content[0].details[0].cta && content[0].details[0].cta.label"
        />
      </div>
      <div class="placeholder-img d-none d-md-block">
        <img
          :src="content[0].image[0].image.url"
          :alt="content[0].image[0].image.alt"
         v-if="content[0]"/>
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
    buttonLink: {
      type: String,
      default: null,
    },
  },
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
</style>