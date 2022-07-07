<template>
  <div class="Pricing-wraps" v-if="price">
    <div class="row">
      <template v-for="item in price">
        <div
          class="col-lg-4 col-md-6 mb-5 mb-lg-0"
          v-if="item.plan_name"
          :key="item.plan_name"
        >
          <div class="Pricing-wrap">
            <div class="pricing-top">
              <h3 class="pricing-tt">{{ item.plan_name }}</h3>
              <p class="pricing-pr"><span>$</span>{{ item.currency }}</p>
              <h6 class="pricing-st">{{ item.slogan }}</h6>
            </div>
            <div class="pricing-bot">
              <div v-html="removeTags(item.description)"></div>

              <nuxt-link
                :to="item.cta.url"
                class="btn banner-btn text-uppercase"
                ><span v-if="item.cta && item.cta.label">{{
                  item.cta.label
                }}</span></nuxt-link
              >
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    price: {
      type: [Array,Object],
      default: null,
    },
  },
  methods: {
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/&nbsp;/g, ""); 
    },
  },
};
</script>