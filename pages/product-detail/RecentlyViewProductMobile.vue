<template>
  <section
    v-if="RecentViewProduct && RecentViewProduct.length > 0"
    class="related-product-sec d-block d-md-none"
  >
    <div class="container">
      <h4 class="related-title text-center">Recently viewed</h4>
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
            v-for="(product, index) in RecentViewProduct"
            :key="index"
            class="col-md-3 col-sm-6 related-wrap category-wrap listcat-vw vrt-category"
          >
            <div class="related-img category-img var-hor-category-img"
              :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
              @click="redirectToDetailPage(product)" 
            >
              <div class="img-wrap vs-hr-imgwrap">
                <img v-if="product.image"
                  :src="product.image"
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
            v-for="(product, index) in RecentViewProduct"
            :key="index"
            >
            <div class="container">
            <div class="related-details text-center"
              @click="redirectToDetailPage(product)" 
            >
              <div v-if=" product.title" class="category-name">{{ product.title }}</div>
              <div v-if="product.author" class="category-info">{{ product.author }}</div>
              <div v-if="product.price" class="price-wrap">{{ product.price }}</div>
              <div class="rating">
                <div class="ratings-wrap">
                  <rating :rating="product.rating"></rating>
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
</template>

<script>
import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { useUiState } from "~/composables";
import { useRouter } from "@nuxtjs/composition-api";
import rating from "~/components/Products/Rating.vue";

export default {
  components: {
    Carousel,
    rating
  },
  data() {
    return {
      RecentViewProduct: null,
    };
  },
  props: {
     breadcrumbs: {
      type: [Array, Object],
      default: null
    }
  },
  mounted() {
    const Storedata = JSON.parse(localStorage.getItem("rvproducts"));
    if(Storedata && Storedata.length > 4) {
        this.RecentViewProduct = Storedata.slice(0, 4);
    }
    else{
        this.RecentViewProduct = Storedata;
    }
  },
  methods: {
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
  setup() {
    const { getSlugLink } = useUiState();

    const redirectToDetailPage = (product) => {
    const link = getSlugLink(product);
    router.push({ path: link });
  };
    const router = useRouter();
    return {
      redirectToDetailPage
    }
  }
};
</script>
<style lang="scss" scoped>
.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
    overflow: hidden;
  }
}
.related-wrap.category-wrap.listcat-vw.vrt-category {
    @media all and (max-width: 767px) {
      margin-bottom: 15px !important;
    }
}
.category-wrap.vrt-category .category-img {
  @media all and (max-width: 767px) {
      margin-bottom: 0px !important;
    }
}
.related-details {
  justify-content: center;
  .ratings-wrap {
    display: flex;
    justify-content: center;
  }
}
.var-hor-category-img {
    height: 263px !important;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
      height: 54vw !important;
      width: 54vw !important;
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
.prev {
  left: 0;
}

.control {
  @media (max-width: 767px) {
    top: 44% !important;
  }
  @media (max-width: 630px) {
    top: 33% !important;
  }
  @media (max-width: 420px) {
    top: 30% !important;
  }
}

.mobile-slider-inner-wrap {
    .slick-slide {
        max-width: 184px;
        max-height: 182px;
        padding: 19px 19px 18px 20px;
        .img-wrp{      
                width: 184px;
                height: 182px;
                box-sizing: border-box;
                padding: 0;
                display: flex !important;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                @media (max-width: 767px) {
                  max-width: 600px;
                }
                @media (max-width: 710px) {
                  max-width: 540px;
                }
                 @media (max-width: 600px) {
                  max-width: 460px;
                }
                @media (max-width: 575px) {
                  max-width: 440px;
                }
                @media (max-width: 550px) {
                  max-width: 350px;
                }
                @media (max-width: 450px) {
                  max-width: 310px;
                }
                @media (max-width: 420px) {
                  max-width: 290px;
                }
                @media (max-width: 400px) {
                  max-width: 270px;
                }
                @media (max-width: 375px) {
                  max-width: 215px;
                }
            
            img{
                max-width: 184px;
                height: 145px;
                object-fit: contain;
                width: 100%;
                padding: 19px 19px 18px 20px;
            }
    
        }
        &:first-child{
            .img-wrp{
                margin-left: 0;
            }
        }
        &:last-child{
            .img-wrp{
                margin-right: 0;
            }
        }
    }   
}
</style>
