<template>
  <section class="about-gallery-sec infoBlock-wrapSec">
    <div class="container">
      <h2>Gallery</h2>
      <div v-if="screenWidth >= 768" class="slider d-md-block">
        <div class="wrapper-block">
          <carousel ref="carousel" v-bind="carouselConfig" class="slides">
            <div v-for="(item, idx) in galleryImage" :key="idx" class="slide">
              <img
                :src="
                  $route.path === '/landing' || $route.path === '/about-us'
                    ? item.url
                    : item.image.url
                "
                :alt="item.alt"
              />
            </div>
          </carousel>
        </div>
        <i class="control next" @click="nextSlide"></i>
      </div>

      <div v-else class="grid-wrapper gallery-item">
        <img
          v-for="(item, idx) in galleryImage"
          :key="idx"
          class="slide small-slide"
          :src="
            $route.path === '/landing' || $route.path === '/about-us'
              ? item.url
              : item.image.url
          "
          :alt="item.alt"
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
    galleryImage: {
      type: [Array, Object],
      default: null,
    },
  },
  name: "Gallery",
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
    @media all and (max-width: 767px) {
      font-size: 26px;
    }
  }
}
section.about-gallery-sec.infoBlock-wrapSec.event-gallery {
  @media all and (max-width: 767px) {
    margin-top: 35px !important;
  }
}
.small-slide {
  height: 135px;
  max-width: 135px;
  width: 100%;
  margin: 4px !important;
  @media (max-width: 767px) {
    max-width: unset;
    object-fit: cover;
  }
}
.grid-wrapper.gallery-item {
  justify-items: center;
}

.control {
    position: absolute;
    top: 50%;
    width: 80px;
    height: 80px;
    z-index: 1;
}
</style>

