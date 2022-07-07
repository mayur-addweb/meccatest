<template>
  <section class="aboutbook-sec">
    <div class="container" v-if="content[0]">
      <div class="about-info">
        <h2 class="abt-title d-md-none">{{ content[0].title }}</h2>
        <h2 class="abt-title d-none d-md-block">{{ content[0].title }}</h2>
        <p class="desc d-md-none" v-if="content[0].description" v-html="content[0].description.text">
        </p>
        <p
          v-if="content[0].description"
          class="desc d-none d-md-block"
          v-html="content[0].description.text"
        />

        <base-button
          parentStyleClass="btn readmore-btn"
          :withIcon="false"
          :titleText="content[0].cta.label"
          :toDestination="buttonLink"
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