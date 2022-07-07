<template>
  <ul class="donated-list d-none d-md-flex flex-wrap">
    <li v-for="item in donateList" :key="item.id">
      <div class="donate-card" v-if="item.image && item.image.img_url">
        <img :src="item.image.img_url" alt="placeholder" />
        <nuxt-link :to="item.link" class="card-tag">{{ item.name }}</nuxt-link>
      </div>
    </li>
  </ul>
  
</template>

<script>
export default {
  props: {
    donateList: {
      type: Object,
      default: null,
    },
  },
};
</script>