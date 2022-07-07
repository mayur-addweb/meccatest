<template>
  <section class="content-blog about-us-sec" v-if="content && content[0]">
    <div class="container">
      <div class="wrap d-md-flex justify-content-between">
        <div class="details">
          <h2 class="pageInfo-title about-title" v-if="content[0].title">
            {{ content[0].title }}
          </h2>
          <h3 class="subtitle" v-if="content[0].heading">
            {{ content[0].heading }}
          </h3>
          <div class="small-view d-xl-none" v-if="content[0].image">
            <img
              :src="content[0].image.url"
              :alt="content[0].image.alt"
              v-if="content[0].image.url && content[0].image.alt"
            />
          </div>
          <p class="desc" v-if="content[0].description && content[0].description.text"
          v-html="removeTags(content[0].description.text)">
          </p>
          <nuxt-link
            :to="content[0].cta.url"
            class="btn readmore-btn btn-shadow"
          >
            <span v-if="content[0].cta && content[0].cta.label">{{ content[0].cta.label }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="view viewImg d-none d-xl-block">
      <img :src="content[0].image.url" :alt="content[0].image.alt" v-if="content[0].image.url && content[0].image.alt"/>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: [Array, Object],
      default: null,
    },
  },
  methods: {
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
};
</script>
