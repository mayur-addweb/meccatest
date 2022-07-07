<template>
  <section class="feature-products">
    <div
      class="tab-content d-block d-xl-none mobile-slider-wrap"
      id="myTabContent"
    >
      <ul class="nav nav-tabs mobile-slider-list" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-if="featuredData">
          <button
            class="nav-link active kids-blue-link"
            id="home-tab"
            @click="select($event, 'featured')"
          >
            Featured
          </button>
        </li>
        <li class="nav-item" role="presentation" v-if="latestData">
          <button
            class="nav-link"
            id="profile-tab"
            @click="select($event, 'latest')"
          >
            Latest
          </button>
        </li>
        <li class="nav-item" role="presentation" v-if="popularData">
          <button
            class="nav-link kids-purple-link"
            id="profile-tab"
            @click="select($event, 'popular')"
          >
            Popular
          </button>
        </li>
      </ul>
      <div
        v-if="selectedTab === 'featured' && featuredData"
        class="kn-carousel mobile-slider-inner-wrap"
      >
        <div>
          <div class="product-slider">
            <div class="single-product-slider prod">
              <carousel
                :arrows="false"
                :asNavFor="$refs.minicarousel1"
                :slidesToShow="1"
                ref="carousel1"
                :focusOnSelect="true"
                :centerMode="true"
                @beforeChange="syncSlidersFeatured"
              >
                <div
                  v-for="(img, idx) in featuredData[0].data"
                  :key="`${img.product_image}_${idx}`"
                  class="img-wrp"
                  :class="
                    $route.path === '/kids-home'
                      ? 'kidsbg' + (Math.floor(Math.random() * 8) + 1)
                      : 'slider-img-bg'
                  "
                >
                  <img
                    :src="img.product_image"
                    alt="category"
                    title="category"
                    @click="redirectToDetailPage(img)"
                  />
                </div>
              </carousel>
            </div>
            <div>
              <carousel
                :arrows="false"
                :asNavFor="$refs.carousel1"
                ref="minicarousel1"
                :slidesToShow="1"
                :focusOnSelect="true"
                @beforeChange="syncSlidersFeatured"
              >
                <div
                  style="background-image: url()"
                  v-for="(img, idx) in featuredData[0].data"
                  :key="`${img.product_image}_${idx}`"
                >
                  <div class="container">
                    <div class="knowledge-info">
                      <h2 class="sec-title" @click="redirectToDetailPage(img)">
                        {{ img.product_name }}
                      </h2>
                      <span
                        class="publisher"
                        @click="redirectToDetailPage(img)"
                        >{{ img.author_name }}</span
                      >
                      <p
                        class="sec-desc"
                        v-html="img.short_description"
                        @click="redirectToDetailPage(img)"
                      ></p>
                      <div class="review d-flex align-items-center">
                        <span
                          class="price d-block"
                          @click="redirectToDetailPage(img)"
                        >
                        <div v-if="img.special_price != '0.00'">
                          <del>${{ img.price }}</del
                          >${{ img.special_price }}
                        </div>
                        <div v-else>
                          ${{ img.price }}
                        </div>

                        </span>
                        <span
                          class="ratings"
                          @click="redirectToDetailPage(img)"
                        >
                          <rating
                            :rating="productGetters.getAverageRating(img)"
                          ></rating>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </carousel>
              <i class="small-thumb-prev control prev" @click="prevSlide(selectedTab)"></i>
              <i class="small-thumb-next control next" @click="nextSlide(selectedTab)"></i>
            </div>
          </div>
          <i class="control prev" @click="prevSlide(selectedTab)"></i>
          <i class="control next" @click="nextSlide(selectedTab)"></i>
        </div>
      </div>
      <div
        v-if="selectedTab === 'latest' && latestData"
        class="kn-carousel mobile-slider-inner-wrap"
      >
        <div>
          <div class="product-slider">
            <div class="single-product-slider prod">
              <carousel
                :arrows="false"
                :asNavFor="$refs.minicarousel2"
                :slidesToShow="1"
                :focusOnSelect="true"
                :centerMode="true"
                ref="carousel2"
                @beforeChange="syncSlidersLatest"
              >
                <div
                  v-for="(img, idx) in latestData[0].data"
                  :key="`${img.product_image}_${idx}`"
                  class="img-wrp"
                >
                  <img
                    :src="img.product_image"
                    alt="category"
                    title="category"
                    @click="redirectToDetailPage(img)"
                  />
                </div>
              </carousel>
            </div>
            <div>
              <carousel
                :arrows="false"
                :asNavFor="$refs.carousel2"
                ref="minicarousel2"
                :slidesToShow="1"
                :focusOnSelect="true"
                @beforeChange="syncSlidersLatest"
              >
                <div
                  style="background-image: url()"
                  v-for="(img, idx) in latestData[0].data"
                  :key="`${img.product_image}_${idx}`"
                >
                  <div class="container">
                    <div class="knowledge-info">
                      <h2 class="sec-title" @click="redirectToDetailPage(img)">
                        {{ img.product_name }}
                      </h2>
                      <span
                        class="publisher"
                        @click="redirectToDetailPage(img)"
                        >{{ img.author_name }}</span
                      >
                      <p
                        class="sec-desc"
                        v-html="img.short_description"
                        @click="redirectToDetailPage(img)"
                      ></p>
                      <div class="review d-flex align-items-center">
                        <span
                          class="price d-block"
                          @click="redirectToDetailPage(img)"
                        >
                         <div v-if="img.special_price != '0.00'">
                          <del>${{ img.price }}</del
                          >${{ img.special_price }}
                        </div>
                        <div v-else>
                          ${{ img.price }}
                        </div>
                        </span>
                        <span
                          class="ratings"
                          @click="redirectToDetailPage(img)"
                        >
                          <rating
                            :rating="productGetters.getAverageRating(img)"
                          ></rating>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </carousel>
              <i class="small-thumb-prev control prev" @click="prevSlide(selectedTab)"></i>
              <i class="small-thumb-next control next" @click="nextSlide(selectedTab)"></i>
            </div>
          </div>
          <i class="control prev" @click="prevSlide(selectedTab)"></i>
          <i class="control next" @click="nextSlide(selectedTab)"></i>
        </div>
      </div>
      <div
        v-if="selectedTab === 'popular' && popularData"
        class="kn-carousel mobile-slider-inner-wrap"
      >
        <div>
          <div class="product-slider">
            <div class="single-product-slider prod">
              <carousel
                :arrows="false"
                :asNavFor="$refs.minicarousel3"
                :slidesToShow="1"
                :focusOnSelect="true"
                :centerMode="true"
                ref="carousel3"
                @beforeChange="syncSlidersPopular"
              >
                <div
                  v-for="(img, idx) in popularData[0].model"
                  :key="`${img.product_image}_${idx}`"
                  class="img-wrp"
                  :class="
                    $route.path === '/kids-home'
                      ? 'kidsbg' + (Math.floor(Math.random() * 8) + 1)
                      : 'slider-img-bg'
                  "
                >
                  <img
                    :src="img.product_image"
                    alt="category"
                    title="category"
                    @click="redirectToDetailPage(img)"
                  />
                </div>
              </carousel>
            </div>
            <div>
              <carousel
                :arrows="false"
                :asNavFor="$refs.carousel3"
                ref="minicarousel3"
                :slidesToShow="1"
                :focusOnSelect="true"
                @beforeChange="syncSlidersPopular"
              >
                <div
                  style="background-image: url()"
                  v-for="(img, idx) in popularData[0].model"
                  :key="`${img.product_image}_${idx}`"
                >
                  <div class="container">
                    <div
                      class="knowledge-info"
                      @click="redirectToDetailPage(img)"
                    >
                      <h2 class="sec-title">
                        {{ img.product_name }}
                      </h2>
                      <span class="publisher">{{ img.author_name }}</span>
                      <p class="sec-desc" v-html="img.short_description"></p>
                      <div class="review d-flex align-items-center">
                        <span
                          class="price d-block"
                          @click="redirectToDetailPage(img)"
                        >
                        <div v-if="img.special_price != '0.00'">
                          <del>${{ img.price }}</del
                          >${{ img.special_price }}
                        </div>
                        <div v-else>
                          ${{ img.price }}
                        </div>

                        </span>
                        <span
                          class="ratings"
                          @click="redirectToDetailPage(img)"
                        >
                          <rating
                            :rating="productGetters.getAverageRating(img)"
                          ></rating>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </carousel>
              <i class="small-thumb-prev control prev" @click="prevSlide(selectedTab)"></i>
              <i class="small-thumb-next control next" @click="nextSlide(selectedTab)"></i>
            </div>
          </div>
          <i class="control prev" @click="prevSlide(selectedTab)"></i>
          <i class="control next" @click="nextSlide(selectedTab)"></i>
        </div>
      </div>
    </div>
  </section>
</template>


<script type="module">
import { ref, useRouter } from "@nuxtjs/composition-api";
import { productGetters } from "@vue-storefront/magento";

import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import Rating from "~/components/Products/Rating";
import { useUiState } from "~/composables";

export default {
  name: "HomePage",
  props: {
    featured: {
      type: [Array, Object],
      default: null,
    },
    latest: {
      type: [Array, Object],
      default: null,
    },
    popular: {
      type: [Array, Object],
      default: null,
    },
  },
  components: {
    Carousel,
    Rating,
  },
  methods: {
    nextSlide(selectedTab) {
      if(selectedTab=="featured") {
        this.$refs.carousel1.next();
        this.$refs.minicarousel1.next();
      } else if(selectedTab=="latest") {
        this.$refs.carousel2.next();
        this.$refs.minicarousel2.next();
      } else if(selectedTab=="popular") {
        this.$refs.carousel3.next();
        this.$refs.minicarousel3.next();
      }
    },
    prevSlide(selectedTab) {
      if(selectedTab=="featured") {
        this.$refs.carousel1.prev();
        this.$refs.minicarousel1.prev();
      } else if(selectedTab=="latest") {
        this.$refs.carousel2.prev();
        this.$refs.minicarousel2.prev();
      } else if(selectedTab=="popular") {
        this.$refs.carousel3.prev();
        this.$refs.minicarousel3.prev();
      }
    },
    syncSlidersFeatured(currentPosition, nextPosition) {
      if(this.featured){
        this.$refs['carousel1'].goTo(nextPosition);
        this.$refs['minicarousel1'].goTo(nextPosition);
      }
    },
    syncSlidersLatest(currentPosition, nextPosition) {
      if(this.latest){
       this.$refs['carousel2'].goTo(nextPosition);
        this.$refs['minicarousel2'].goTo(nextPosition);
      }
    },
    syncSlidersPopular(currentPosition, nextPosition) { 
      if(this.popular){
        this.$refs['carousel3'].goTo(nextPosition);
        this.$refs['minicarousel3'].goTo(nextPosition);
      }
    },
  },
  setup(props, context) {
    const featuredData = props.featured;
    const latestData = props.latest;
    const popularData = props.popular;
    const selectedTab = ref("featured");

    const select = (event, tabName) => {
      let navLinks = document.getElementsByClassName("nav-link");

      for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
      }

      let selectedElement = event.target;
      selectedElement.classList.add("active");

      selectedTab.value = tabName;
    };
    const uiState = useUiState();
    const { getSlugLink } = useUiState();
    const redirectToDetailPage = (product) => {
      const link = getSlugLink(product);
      router.push({ path: link });
    };
    const router = useRouter();
   
    return {
      productGetters,
      featuredData,
      selectedTab,
      select,
      latestData,
      popularData,
      uiState,
      redirectToDetailPage,
    };
  },

};
</script>


<style lang="scss" scoped>
.tab-content {
  display: block !important;
  @media (min-width: 1300px) {
      display: none !important;
    }
}

.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
  }
  .var-hor-category-img {
    min-height: 263px;
  }
  .related-wrap .related-details {
    justify-content: center;
  }
}
.related-slider-img {
  position: relative;
  .control {
    position: absolute;
    top: 30%;
  }
  .next,
  .prev {
    display: block;
    @media (min-width: 768px) {
      display: none;
    }
  }
}

.feature-products {
  .tab-content {
    ul {
      li {
        button {
          line-height: normal;
        }
      }
    }
    .kn-carousel {
      .latest-slider {
        .latest-item {
          @media (max-width: 991px) {
            background-image: url("/meccabook/fear-book-back.png");
            justify-content: flex-end !important;
          }
          .knowledge-info {
            max-width: 360px;
            @media (max-width: 991px) {
              width: 45%;
              max-width: unset;

            }
          }
          .latest-view {
            width: calc(36.5% - 22px);
            max-width: 400px;
            @media (max-width: 991px) {
              width: 50%;
              max-width: unset;
              .img-wrp {
                width: 50%;
                margin: 0 auto;
              }
            }
          }
          .latest-books {
            width: calc(36.5% - 22px);
            padding-left: 22px;
            @media (max-width: 991px) {
              width: 100%;
              max-width: unset;
            }
            .img-wrp {
              @media (max-width: 991px) {
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
}
.kn-carousel {
  .latest-slider {
    .latest-item {
      @media (max-width: 991px) {
        background-image: url("/meccabook/fear-book-back.png");
        justify-content: flex-end !important;
      }
    }
  }
}
.mobile-slider-inner-wrap {
  // .slick-slide.slick-active.slick-center.slick-current {
  //    @media (max-width: 767px) {
  //         width: 184px !important;
  //         height: 182px;
  //     }
  // }
  .slick-slide {
    max-width: 184px;
    max-height: 182px;
    padding: 19px 19px 18px 20px;
    .img-wrp {
      width: 184px !important;
      height: 182px !important;
      box-sizing: border-box;
      padding: 0;
      display: flex !important;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      @media (max-width: 1199px) {
          // width: 184px !important;
          // height: 182px;
          max-height: unset !important;
          max-width: unset !important;
          height: 40vw !important;
          width: 40vw !important;
      }
       @media (max-width: 991px) {
          height: 70vw !important;
          width: 70vw !important;
          padding: 20px;
      }
       @media (max-width: 350px) {
          height: 63vw !important;
          width: 63vw !important;
      }
      img {
        height: 55vw;
        width: 55vw !important;
        object-fit: fill;
        width: 100%;
      }
    }
    &:first-child {
      .img-wrp {
        margin-left: 0;
      }
    }
    &:last-child {
      .img-wrp {
        margin-right: 0;
      }
    }
  }
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
                width: 145px;
                height: 145px;
                object-fit: contain;
                width: 100%;
                // padding: 19px 19px 18px 20px;
            }

        }
        &:first-child{
            .img-wrp{
                margin-left: 0;
            }
        }
        // &:last-child{
        //     .img-wrp{
        //         margin-right: 0;
        //     }
        // }
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
  @media (max-width: 1300px) {
    top: 40% !important;
  }
  @media (max-width: 991px) {
    top: 35% !important;
  }
  @media (max-width: 750px) {
    top: 28% !important;
  }
   @media (max-width: 540px) {
    top: 24% !important;
  }
   @media (max-width: 420px) {
    top: 22% !important;
  }
  @media (max-width: 350px) {
    top: 19% !important;
  }
}
.review {
  @media (max-width: 767px) {
    display: block !important;
  }
}
.sec-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
