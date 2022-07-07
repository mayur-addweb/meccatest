<template>
  <section class="Pricing-wrap-block">
    <div class="container" v-if="content">
      <h2 class="home-wrap-title" v-if="content.title && content.title[0] && content.title[0].value">
        {{ content.title[0].value }}
      </h2>
      <h6 class="home-wrap-subtitle" v-if="content.subheading && content.subheading[0] && content.subheading[0].value">
        {{ content.subheading[0].value }}
      </h6>
      <pricing-wraps
        v-if="
          content
        "
        :price="content"
      ></pricing-wraps>
    </div>
  </section>
</template>

<script>
import PricingWraps from "../home/PricingWraps.vue";

export default {
    components:{
        PricingWraps,
    },
  props: {
    content: {
      type: [Object, Array],
      default: null,
    },
  },
};
</script>
