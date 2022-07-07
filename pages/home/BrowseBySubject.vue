<template>
  <section class="browse-subject pt-0">
      <div class="container">
        <h3 class="th-sec-title text-md-center">Browse by subject</h3>
        <ul
          class="
            subject-list
            d-flex
            text-center
            d-flex
            flex-wrap
            justify-content-start justify-content-xl-center
          "  v-if="browseBySubject"
        >
          <li v-for="(item, idx) in browseBySubject" :key="item.category_id">
            <span class="icon-img">
              <nuxt-link :to="item.category_url.replace($config.magentoURL,'/c/')"><img :src=" '/meccabook/' + ImgUrl[idx] " alt="icon" /></nuxt-link>
            </span>
            <p class="desc" v-if="item.category_name">{{ item.category_name }}</p>
          </li>
        </ul>
      </div>
    </section>
  
</template>

<script>
export default {
  props:{
    browseBySubject:{
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      ImgUrl: ['technology.svg','politics.svg','worship.svg','prophet.svg','spirituality.svg','science.svg','society.svg']
    }
  }
};
</script>