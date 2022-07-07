<template>
  <div class="related-slider-img">
    <section
      class="related-product-sec d-none d-md-block"
      v-if="getrelatedProduct && getrelatedProduct.code == 200"
    >
      <div class="container">
        <h4 class="related-title text-center">Related products</h4>
        <div class="related-slider" style="display: flex">
          <div class="row">
              <div
                v-for="(product, index) in getrelatedProduct.data"
                :key="index"
                class="col-md-3 col-sm-6 related-wrap category-wrap listcat-vw vrt-category"
                @click="redirectToDetailPage(product)" 
              >
                <div
                  v-if="index < 4"
                  class="related-img category-img var-hor-category-img"
                  :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
                >
                  <div class="img-wrap vs-hr-imgwrap">
                    <img
                      :src="product.product_image"
                      alt="category"
                      title="category"
                    />
                  </div>
                </div>
                <div class="related-details text-center" v-if="index < 4">
                  <div v-if="product.product_name" class="category-name">
                    {{ product.product_name }}
                  </div>
                  <div v-if="product.author_name" class="category-info">
                    {{ product.author_name }}
                  </div>
                  <div class="price-wrap">${{ product.price }}</div>
                  <div class="rating">
                    <div class="ratings-wrap">
                       <rating
                        :rating="product.review"
                      ></rating>
                    </div>
                  </div>
                </div>
              </div>
            <i class="control prev" @click="prevSlide"></i>
            <i class="control next" @click="nextSlide"></i>
          </div>
        </div>
      </div>
    </section>
     <section
      class="related-product-sec d-block d-md-none"
      v-if="getrelatedProduct && getrelatedProduct.code == 200"
    >
      <div class="container">
        <h4 class="related-title text-center">Related products</h4>
        <div class="product-slider">
        <div class="single-product-slider prod">
        <carousel 
          :arrows="false"
          :asNavFor="$refs.minicarousel"
          :slidesToShow="1"
          ref="carousel"
          :focusOnSelect="true"
          :centerMode="true"
          @beforeChange="syncSliders"
        >
          <div
            v-for="(product, index) in getrelatedProduct.data"
            :key="index"
            class="col-md-3 col-sm-6 related-wrap category-wrap listcat-vw vrt-category"
          >
            <div class="related-img category-img var-hor-category-img"
              :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
              @click="redirectToDetailPage(product)" 
            >
              <div class="img-wrap vs-hr-imgwrap">
                <img 
                  :src="product.product_image"
                  alt="category"
                  title="category"
                />
              </div>
            </div>
          </div> 
           </carousel>
        </div>  
        <div>
          <carousel
            :arrows="false"
            :asNavFor="$refs.carousel"
            ref="minicarousel"
            :slidesToShow="1"
            :focusOnSelect="true"
            @beforeChange="syncSliders"
          >
          <div
            v-for="(product, index) in getrelatedProduct.data"
            :key="index"
            >
            <div class="container">
            <div class="related-details text-center"
              @click="redirectToDetailPage(product)" 
            >
              <div v-if="product.product_name" class="category-name">{{ product.product_name }}</div>
              <div v-if="product.author_name" class="category-info">{{ product.author_name }}</div>
              <div v-if="product.price" class="price-wrap">{{ product.price }}</div>
              <div class="rating">
                <div class="ratings-wrap">
                    <rating
                    :rating="product.review"
                  ></rating>
                </div>
              </div>
            </div>
            </div>
          </div>
          </carousel>
          <i class="small-thumb-prev control prev" @click="prevSlide"></i>
          <i class="small-thumb-next control next" @click="nextSlide"></i>
        </div>
        </div>
          <i class="control prev" @click="prevSlide"></i>
          <i class="control next" @click="nextSlide"></i>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { ref, useRouter } from "@nuxtjs/composition-api";
import { useUiState } from "~/composables";
import Rating from "~/components/Products/Rating";

export default {
  props: {
    productsku: {
      type: String,
      default: null,
    },
    breadcrumbs: {
      type: [Array, Object],
      default: null
    }
  },
  components: {
    Carousel,
    Rating
  },
  computed: {
    ...mapGetters("drupalcms", ["getrelatedProduct"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchRelatedProduct"]),
    nextSlide() {
      this.$refs.carousel.next();
      this.$refs.minicarousel.next();
    },
    prevSlide() {
      this.$refs.carousel.prev();
      this.$refs.minicarousel.prev();
    },
    syncSliders(currentPosition, nextPosition) { 
      this.$refs['carousel'].goTo(nextPosition);
      this.$refs['minicarousel'].goTo(nextPosition);
    },
  },
  mounted() {
    this.fetchRelatedProduct(this.productsku);
  },
  beforeMount() {
    document.body.classList.add('pro-detail');
  },
  beforeDestroy() {
    document.body.classList.remove('pro-detail');
  },
  setup() {
    const carouselConfig = ref({
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: false,
      speed: 300,
        responsive: [ {
        breakpoint: 767,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
    });
    
    const { getSlugLink } = useUiState();

    const redirectToDetailPage = (product) => {
    const link = getSlugLink(product);
    router.push({ path: link });
  };
    const router = useRouter();

    return {  
      carouselConfig,
      redirectToDetailPage
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
   @media all and (max-width: 767px) {
     overflow: inherit;
   }

}
.related-slider {
  margin: 0 0 0 30px;
}
.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
    overflow: hidden;
  }
  .related-wrap .related-details {
    justify-content: center;
    padding-left: 0;
    @media all and (max-width: 575px) {
     max-width: 184px;
    }
  }
}
.related-slider-img {
  position: relative;
  .control {
    position: absolute;
      @media (max-width: 767px) {
    top: 44% !important;
    }
    @media (max-width: 630px) {
      top: 33% !important;
    }
    @media (max-width: 420px) {
      top: 28% !important;
    }
  }
  .next,
  .prev {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.category-img {
  min-width: unset;
}

.var-hor-category-img {
    max-height: 295px !important;
    height: 100%;
    max-width: 295px;
    display: flex;
    align-items: center;
    justify-content: center;
  //  @media all and (max-width: 676px) {
  //    height: 182px !important;
  //    max-width: 184px;
  //    margin: 0 auto;
  //   }
    @media all and (max-width: 767px) {
    max-height: unset !important;
    max-width: unset;
    height: 70vw !important;
    width: 70vw !important;
    margin: 0 auto;
    }
    @media (max-width: 575px) {
      height: 63vw !important;
      width: 63vw !important;
    }
    @media (max-width: 400px) {
      height: 55vw !important;
      width: 55vw !important;
    }
}

.vs-hr-imgwrap {
  object-fit: cover;
  img {
      max-width: 232px;
      max-height: 232px;
      height: 100%;
      width: 100%;
      object-fit: contain;
    @media all and (max-width: 767px) {
        max-width: unset;
        max-height: unset !important;
        margin: 0 auto;
        height: 55vw !important;
        width: 55vw !important;
        object-fit: fill;
        width: 100%;
     }
     @media all and (max-width: 575px) {
        height: 48vw !important;
        width: 48vw !important;
     }
     @media all and (max-width: 400px) {
        height: 44vw !important;
        width: 44vw !important;
     }
    }
}
.ratings-wrap {
  display: flex;
  justify-content: center;
}

.small-thumb-prev.control.prev,
.small-thumb-next.control.next {
  opacity: 0;
}
i.small-thumb-next.control.next,
i.small-thumb-prev.control.prev {
  top: 100% !important;
  margin-top: -15px !important;
  padding: 6px;
  border-radius: 4px;

}
.small-thumb-prev {
  background: url(/meccabook/small-thumb-prev.png) no-repeat center center;
  background-size: unset;
  width: 3.75px;
  height: 7.5px;
  z-index: 9;
}

.small-thumb-next {
  background: url(/meccabook/small-thumb-next.png) no-repeat center center;
  background-size: unset;
  z-index: 9;
  width: 3.75px;
  height: 7.5px;
  right: 0;
  transform: unset;
}

.control {
  @media (max-width: 767px) {
    top: 30% !important;
  }
  @media (max-width: 600px) {
    top: 29% !important;
  }
}

.category-wrap {
  &.vrt-category {
      margin-bottom: 0;
  }
}
</style>
