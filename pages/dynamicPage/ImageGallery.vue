<template>
  <section class="about-gallery-sec infoBlock-wrapSec">
    <div class="container">
      <h2>Gallery</h2>
      <div v-if="screenWidth >= 768" class="slider d-md-block">
        <div class="wrapper-block" >
          <carousel ref="carousel" v-bind="carouselConfig" class="slides" v-if="content.image">
            <div v-for="(item, idx) in content.image" :key="idx" class="slide">
              <img :src="item.url" :alt="item.alt" />
            </div>
          </carousel>
        </div>

        <i class="control prev d-none" @click="prevSlide"></i>
        <i class="control next" @click="nextSlide"></i>
      </div>

      <div v-else class="grid-wrapper gallery-item">
        <img
          v-for="(i, idx) in 7"
          :key="idx"
          class="slide"
          src="meccabook/gallery-placeholder1.jpg"
          alt="image"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  props: {
    content: {
      type: [Array,Object],
      default: null,
    },
  },
  name: "ImageGallery",
  components: {
    Carousel,
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
      screenWidth: null,
    };
  },
  methods: {
    nextSlide() {
      this.$refs.carousel.next();
    },
    prevSlide() {
      this.$refs.carousel.prev();
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
  },
};
</script>

<style lang="scss" scoped>
.gallery-item {
  width: unset;
}
.about-gallery-sec {
  h2 {
    margin-bottom: 30px;
  }
}
</style>

