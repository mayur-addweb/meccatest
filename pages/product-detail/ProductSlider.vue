<template>
  <div v-if="productGallery && productGallery.length > 0">
    <div class="product-slider">
      <div class="single-product-slider">
      <carousel
        :arrows="false"
        :asNavFor="$refs.minicarousel"
        ref="carousel"
        :focusOnSelect="true"
        :initialSlide= "imageIndex"
        @beforeChange="syncSliders"
        v-if="productGallery && productGallery.length > 0"
      >
        <div v-for="(i, idx) in productGallery" :key="idx" class="product-img"
          :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
        >
          <img :src="i.url" alt="image" class="Slider-img" />
        </div>
      </carousel>
        <div id="watchVideo" class="watch-content text-center text-md-left">
        <a @click="toggleAlchemia(); addBodyClass();"  class="preview-btn btn d-none d-lg-flex align-items-center justify-content-center"><span>preview</span></a>
        </div>
       <section :class="alchemiaVisible ? 'alchemia-show' : 'alchemia-hide'"
        v-for="(i, idx) in productGallery" :key="idx">
          <div class="popup-overlay active d-none d-md-block">
        <div class="signin-popup shipping-popup watchvideo-popup">
          <button @click="toggleAlchemia(); removeBodyClass();" class="close-icn">
            <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
          </button>
            <div class="book-wrapper">
              <div class="book-main-wrapper">
                <div class="book-cover">
                  <div class="pageprev" id="secondprev">
                    <div class="front">
                        <div class="outer">
                            <div class="content">
                              <img :src="productGallery[imageIndex].url" v-if="productGallery[imageIndex]"/>
                            </div>
                        </div>
                    </div>
                    <div class="back" id="thirdprev">
                        <div class="outer">
                            <div class="content">
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="pageprev" id="fourthprev">
                        <div class="front">
                            <div class="outer">
                                <div class="content">
                                    <img :src="productGallery[0].url"  v-if="productGallery[0]"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
        </section>
      </div>
    <div class="thumb-slider d-none d-lg-block">
      <carousel
        :arrows="false"
        :asNavFor="$refs.carousel"
        ref="minicarousel"
        :slidesToShow="4"
        :focusOnSelect="true"
        :initialSlide= "imageIndex"
        @beforeChange="syncSliders"
        v-if="productGallery && productGallery.length > 0"
      >
        <div class="thumb-img small-thumb-img"  
        v-for="(i, idx) in productGallery" :key="idx"
        :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
        >
          <img :src="i.url" alt="image" class="small-Slider-img" />
        </div>
      </carousel>
      <template v-if="productGallery.length > 4">
      <i class="small-thumb-prev control prev" @click="prevSlide"></i>
      <i class="small-thumb-next control next" @click="nextSlide"></i>
      </template>
    </div>
    </div>
    <template v-if="productGallery.length > 1">
    <i class="control prev" @click="prevSlide"></i>
    <i class="control next" @click="nextSlide"></i>
    </template>
  </div>
  <div v-else>
    <div class="product-img">
      <img src="/meccabook/product-slide-img.png" alt="image" />
    </div>
  </div>
</template>

<script>

import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import { ref } from "@nuxtjs/composition-api";

export default {
    data() {
      return {
        minicarouselConfig: {
        infinite: true,
        centerMode: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        speed: 300,
        focusOnSelect:true,
        }
      }
    },
    props:  {
      productGallery: {
        type: [Object, Array],
        default: null
      },
      breadcrumbs: {
        type: [Array, Object],
        default: null
      },
      imageIndex: {
        type: Number,
        default: 0
      }
    },
    components: {
        Carousel
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

     addBodyClass() {
       var previewButton = document.getElementsByTagName("body")[0];
       

        setTimeout(function(){
          previewButton.classList.add("bookOpened");
          previewButton.classList.add("openBook");
          var prevsty = document.getElementById("secondprev");
          prevsty.style.msTransform = "rotateY(-180deg)";
          prevsty.style.webkitTransform = "rotateY(-180deg)";
          prevsty.style.transform = "rotateY(-180deg)";
        }, 1200);
    },

    removeBodyClass() {
      var previewClose = document.getElementsByTagName("body")[0];
      previewClose.classList.remove("openBook");

      setTimeout(function() {
            previewClose.classList.remove("bookOpened");
      }, 1500);
    }
  },
  setup() {
    const alchemiaVisible = ref(false);
    const toggleAlchemia = () => {
      alchemiaVisible.value = !alchemiaVisible.value
    }
    return {
      alchemiaVisible,
      toggleAlchemia
    }
  }
    
}
</script>

<style lang="scss" scoped>
.control {
  position: absolute;
  top: 30%;
  // bottom: 50%;
  width: 80px;
  height: 80px;
  margin-top: -20px;
  z-index: 2;
   @media all and (max-width: 992px) { 
     margin-top: 0;
   }
    @media all and (max-width: 991px) { 
       top: 45%;
   }
   @media all and (max-width: 575px) { 
       top: 40%;
   }
   @media all and (max-width: 420px) { 
       top: 35%;
   }
   
}

.prev,
.next {
  background-size: 22px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.prev {
  background: url(/meccabook/slide-arrow.svg) no-repeat center center;
  background-size: contain;
  z-index: 1;
}

.next {
  background: url(/meccabook/slide-arrow.svg) no-repeat center center;
  background-size: contain;
  z-index: 1;
  right: 0;
   @media all and (max-width: 420px) { 
       right: -5.5px;
   }
}
i.small-thumb-next.control.next,
i.small-thumb-prev.control.prev {
  top: 100% !important;
  margin-top: -15px !important;
  border: 1px solid #4B4C4D;
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

.alchemia-show {
  display: block;
  .close-icn {
    max-width: 80px;
    width: 100%;
  }
  .see-preview-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 496px;
    height: 496px;
  }
}

.alchemia-hide {
  display: none;
}
.shipping-popup.watchvideo-popup {
  // background: transparent;
  justify-content: center !important;
  display: flex !important;
  align-items: center;
  .product-vid  {
    border-color: transparent;
    border-radius: 18px;
    width: 100%;
    height: 100%;
    min-height: 350px;
    max-width: 550px;
    margin: auto;
    align-items: center !important;
  }
  .close-icn {
    width: 42px;
    height: 42px;
    background: transparent;
    @media (min-width: 1200px) {
    top: 8px;
    right: 55px;
    }
  }
}

</style>