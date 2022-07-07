<template>
  <section class="related-product-sec">
    <div class="container">
      <h4 class="related-title text-center">Related products</h4>
      <component
        :is="productCarousel"
        ref="prodcarousel"
        v-bind="carouselConfig"
        class="related-slider"
      >
        <div class="Related-items">
          <div class="d-md-flex align-items-start justify-content-between">
            <template>
              <div
                class="related-wrap category-wrap listcat-vw vrt-category"
                v-for="item in content"
                :key="item.title"
              >
                <div
                  class="related-img category-img"
                  style="background-image: url()"
                >
                  <div class="img-wrap" v-if="item.image && item.image.url">
                    <img
                      :src="item.image.url"
                      alt="category"
                      title="category"
                    />
                  </div>
                </div>
                <div class="related-details text-center d-block">
                  <div class="category-name">{{ item.title }}</div>
                  <div class="category-info">{{ item.author_name }}</div>
                  <div class="price-wrap">{{ item.currency }}</div>
                  <div class="rating">
                    <div class="ratings-wrap">
                      <!--<img src="/meccabook/ratings.png" alt="rating" title="rating" /> -->
                      {{ item.star_ratings }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </component>

      <i
        v-if="screenWidth <= 1199"
        class="control prev is-brown"
        @click="prevProduct"
      ></i>
      <i
        v-if="screenWidth <= 1199"
        class="control next is-brown"
        @click="nextProduct"
      ></i>
    </div>
  </section>
</template>

<script>
import {
  computed,
  ref,
  onMounted,
} from "@nuxtjs/composition-api";
import Carousel from "vue-slick-carousel";
export default {
  components:{
    Carousel,
  },
   data() {
    return {
      contentFieldName: "getLatestArticle",
      carouselConfig: {
        infinite: true,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        speed: 300,
      },
    };
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  setup(){

    const carouselConfig = ref({
      infinite: true,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      speed: 300,
    });

    const screenWidth = ref(null);

    const productCarousel = computed(() => {
      return screenWidth.value <= 1199 ? "carousel" : "div";
    });

    const prevProduct = () => {
      prodcarousel.value.prev();
    };

    const nextProduct = () => {
      prodcarousel.value.next();
    };

    onMounted(() => {
      const dotsWrapper = document.getElementsByClassName("slick-dots")[0];
      if (dotsWrapper) {
        dotsWrapper.style.display = "flex";
      }
      screenWidth.value = window.innerWidth;
    });

    return{
      productCarousel,
      screenWidth,
      carouselConfig,
      prevProduct,
      nextProduct,
    }
  }
};
</script>
