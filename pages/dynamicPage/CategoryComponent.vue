<template>
<section class="donatelist-sec d-none d-md-block" v-if="content">
      <div class="container">
        <h2
          class="home-wrap-title"
          v-if="
            content.title && content.title[0] && content.title[0].value
          "
        >
          {{
            content.title[0].value
          }}
        </h2>
  <ul class="donated-list d-none d-md-flex flex-wrap">
    <li v-for="item in content" :key="item.id">
      <div class="donate-card" v-if="item.image && item.image.img_url">
        <img :src="item.image.img_url" alt="placeholder" />
        <nuxt-link :to="item.link" class="card-tag" v-if="item.name">{{ item.name }}</nuxt-link>
      </div>
    </li>
  </ul>
  </div>
    </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
};
</script>