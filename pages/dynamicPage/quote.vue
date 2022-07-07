<template>
  <div class="testimonial-slider d-none d-xl-block">
    <div class="container">
      <carousel ref="testimonialsCarousel" v-bind="carouselConfig">
        <div v-for="(item,idx) in content" :key="idx" class="testimonial">
          <p class="test-desc">
            {{ removeTags(item.quote) }}
          </p>
          <strong class="test-name">{{item.author}}</strong>
        </div>
      </carousel>

      <i class="control next-slide" @click="nextSlide"></i>
    </div>
  </div>
</template>

<script>
import Carousel from "vue-slick-carousel";

export default {
  name: "Quote",
  components: {
    Carousel,
  },
  props: {
    content: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
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
  methods: {
    nextSlide() {
      this.$refs.testimonialsCarousel.next();
    },
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.testimonial-slider {
  padding-top: 100px;
  .container {
    background: #fffcf4;
    padding: 30px 50px;
  }
}
</style>