<template>
  <div class="wrapper-blog">
    <!-- Hero Section Start -->

    <home-banner
      v-if="
        getrelandingPage &&
        getrelandingPage.components &&
        getrelandingPage.components.middle &&
        getrelandingPage.components.middle.banner_component
      "
      :slider="getrelandingPage.components.middle.banner_component"
    ></home-banner>
    <!-- Content Title section start -->
    <section
      class="content-blog about-us-sec"
      v-if="getrelandingPage && getrelandingPage.components"
    >
      <div class="container">
        <div class="wrap d-md-flex justify-content-between">
          <div class="details" v-if="getrelandingPage.components.middle">
            <h2 class="pageInfo-title about-title">
              {{
                getrelandingPage.components.middle.title_content_cta_image[0]
                  .title
              }}
            </h2>
            <h3 class="subtitle">
              {{
                getrelandingPage.components.middle.title_content_cta_image[0]
                  .heading
              }}
            </h3>
            <div class="small-view d-xl-none">
              <img
                :src="
                  getrelandingPage.components.middle.title_content_cta_image[0]
                    .image.url
                "
                :alt="
                  getrelandingPage.components.middle.title_content_cta_image[0]
                    .image.alt
                "
              />
            </div>
            <p
              class="desc"
              v-html="
                getrelandingPage.components.middle.title_content_cta_image[0]
                  .description.text
              "
            >
            </p>
            <nuxt-link
              :to="
                getrelandingPage.components.middle.title_content_cta_image[0]
                  .cta.url
              "
              class="btn readmore-btn btn-shadow"
            >
              <span>{{
                getrelandingPage.components.middle.title_content_cta_image[0]
                  .cta.label
              }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="view viewImg d-none d-xl-block">
        <img
          :src="
            getrelandingPage.components.middle.title_content_cta_image[0].image
              .url
          "
          :alt="
            getrelandingPage.components.middle.title_content_cta_image[0].image
              .alt
          "
        />
      </div>
    </section>
    <!--feature-block section start  -->
    <section class="feature-homeblog">
      <div class="container">
        <feature-block
          v-if="
            getrelandingPage &&
            getrelandingPage.components &&
            getrelandingPage.components.middle &&
            getrelandingPage.components.middle.four_column_content
          "
          :freeshipping="getrelandingPage.components.middle.four_column_content"
        ></feature-block>
      </div>
    </section>
    <!-- About Gallery Section Start -->
    <div class="gallery-blog">
      <gallery
        v-if="
          getrelandingPage &&
          getrelandingPage.components &&
          getrelandingPage.components.middle &&
          getrelandingPage.components.middle.image_gallery &&
          getrelandingPage.components.middle.image_gallery.image
        "
        :galleryImage="getrelandingPage.components.middle.image_gallery.image"
      />
    </div>
    <!-- AboutBook -->
    <about-book
      v-if="
        getrelandingPage &&
        getrelandingPage.components &&
        getrelandingPage.components.middle &&
        getrelandingPage.components.middle.card_with_bg_color[0] &&
        getrelandingPage.components.middle.title_description_crop_image[0]
      "
      :content="getrelandingPage.components.middle.card_with_bg_color[0]"
      :aboutimg="
        getrelandingPage.components.middle.title_description_crop_image[0]
      "
    />
    <!-- quote-slider start -->
    <quote-slider
      v-if="
        getrelandingPage &&
        getrelandingPage.components &&
        getrelandingPage.components.middle &&
        getrelandingPage.components.middle.quote
      "
      :quotes="getrelandingPage.components.middle.quote"
    />
    <!-- Related-product list section start -->
    <section
      class="related-product-sec"
      v-if="
        getrelandingPage &&
        getrelandingPage.components &&
        getrelandingPage.components.middle
      "
    >
      <div class="container">
        <h4
          class="related-title text-center"
          v-if="getrelandingPage.components.middle.card_with_ratings_component"
        >
          Related products
        </h4>
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
                  v-for="item in getrelandingPage.components.middle
                    .card_with_ratings_component"
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
                        <rating
                          :rating="item.star_ratings"
                        ></rating>
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
    <!-- seeker of knowledge start -->
    <seeker-knowledge
      v-if="
        getrelandingPage &&
        getrelandingPage.components &&
        getrelandingPage.components.middle &&
        getrelandingPage.components.middle.image_title_description &&
        getrelandingPage.components.middle.wysiwyg
      "
      :seekerKnowledge="
        getrelandingPage.components.middle.image_title_description[0]
      "
      :knowledgeDesc="getrelandingPage.components.middle.wysiwyg[0]"
    ></seeker-knowledge>
    <!-- Pricing-wrap section start -->
    <section class="Pricing-wrap-block">
      <div
        class="container"
        v-if="
          getrelandingPage &&
          getrelandingPage.components &&
          getrelandingPage.components.middle
        "
      >
        <h2 class="home-wrap-title">
          {{
            getrelandingPage.components.middle.three_column_pricing_component
              .title[0].value
          }}
        </h2>
        <h6 class="home-wrap-subtitle">
          {{
            getrelandingPage.components.middle.three_column_pricing_component
              .subheading[0].value
          }}
        </h6>
        <pricing-wraps
          v-if="
            getrelandingPage &&
            getrelandingPage.components &&
            getrelandingPage.components.middle &&
            getrelandingPage.components.middle.image_title_description &&
            getrelandingPage.components.middle.three_column_pricing_component
          "
          :price="
            getrelandingPage.components.middle.three_column_pricing_component
          "
        ></pricing-wraps>
      </div>
    </section>
    <!-- donated list Section Start -->
    <section class="donatelist-sec d-none d-md-block">
      <div
        class="container"
        v-if="getrelandingPage && getrelandingPage.components"
      >
        <h2
          class="home-wrap-title"
          v-if="
            getrelandingPage.components.middle.category_component.title[0].value
          "
        >
          {{
            getrelandingPage.components.middle.category_component.title[0].value
          }}
        </h2>
        <donatelist-blog
          v-if="
            getrelandingPage &&
            getrelandingPage.components &&
            getrelandingPage.components.middle &&
            getrelandingPage.components.middle.category_component
          "
          :donateList="getrelandingPage.components.middle.category_component"
        ></donatelist-blog>
      </div>
    </section>
    <!-- video-wrap-sec start-->
    <section
      class="video-wrap-sec"
      v-if="
        getrelandingPage &&
        getrelandingPage.components.middle &&
        getrelandingPage.components.middle.video_component[0]
      "
    >
      <div class="container">
        <h2 class="home-wrap-title">
          {{
            getrelandingPage.components.middle.video_component[0].title[0].value
          }}
        </h2>
        <h6 class="home-wrap-subtitle">
          {{
            getrelandingPage.components.middle.video_component[0].subheading[0]
              .value
          }}
        </h6>
        <video-blog
          v-if="
            getrelandingPage &&
            getrelandingPage.components.middle &&
            getrelandingPage.components.middle.video_component[0] &&
            getrelandingPage.components.middle.video_component[0].video &&
            getrelandingPage.components.middle.video_component[0].video[0]
          "
          :videoLink="
            getrelandingPage.components.middle.video_component[0].video[0].value
          "
        ></video-blog>
      </div>
    </section>
    <section class="event-block" v-if="getUpcomingEvents">
      <div class="container">
        <h3 class="th-sec-title text-md-center">Events related to this Book</h3>
        <EventSlider v-if="getUpcomingEvents" :events="getUpcomingEvents" />
      </div>
    </section>
    <!-- Pre Booking Form section start -->
    <section class="Pre-Booking-Form">
      <div class="container">
        <booking-form-tab></booking-form-tab>
      </div>
    </section>
    <!-- Follow Us Section Start -->
    <section class="followus-sec mt-4">
      <div class="container">
        <h4 class="followUs text-center">Follow us @MeccaBooks</h4>
      </div>
      <follow-info></follow-info>
    </section>
  </div>
</template>

<script type="module">
import {
  computed,
  ref,
  onMounted,
} from "@nuxtjs/composition-api";
import { mapActions, mapGetters } from "vuex";
import FeatureBlock from "./Footer/FeatureBlock.vue";
import Gallery from "./about-us/Gallery.vue";
import AboutBook from "./about-us/AboutBook.vue";
import SeekerKnowledge from "../pages/home/SeekerKnowledge.vue";
import QuoteSlider from "./about-us/QuotesSlider.vue";
import DonatelistBlog from "./home/DonatelistBlog.vue";
import PricingWraps from "./home/PricingWraps.vue";
import VideoBlog from "./home/VideoBlog.vue";
import BookingFormTab from "./home/BookingFormTab.vue";
import FollowInfo from "./home/FollowInfo.vue";
import HomeBanner from "./home/HomeBanner.vue";
import Carousel from "vue-slick-carousel";
import EventSlider from "../pages/home/EventSlider.vue";
import Rating from "~/components/Products/Rating";

export default {
  name: "home",
  components: {
    FeatureBlock,
    Gallery,
    AboutBook,
    QuoteSlider,
    SeekerKnowledge,
    PricingWraps,
    DonatelistBlog,
    VideoBlog,
    BookingFormTab,
    FollowInfo,
    HomeBanner,
    Carousel,
    EventSlider,
    Rating
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
  setup() {
    const screenWidth = ref(null);
    const prodcarousel = ref(null);

    const prevProduct = () => {
      prodcarousel.value.prev();
    };

    const nextProduct = () => {
      prodcarousel.value.next();
    };

    const productCarousel = computed(() => {
      return screenWidth.value <= 1199 ? "carousel" : "div";
    });

    onMounted(() => {
      const dotsWrapper = document.getElementsByClassName("slick-dots")[0];
      if (dotsWrapper) {
        dotsWrapper.style.display = "flex";
      }
      screenWidth.value = window.innerWidth;
    });

    return {
      screenWidth,
      productCarousel,
      prodcarousel,
      prevProduct,
      nextProduct,
    };
  },
  computed: {
    ...mapGetters("drupalcms", [
      "getrelandingPage",
      "getUpcomingEvents",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchlandingpage",
      "fetchUpcomingEvents",
    ]),
  },
  async mounted() {
    await this.fetchlandingpage();
    await this.fetchUpcomingEvents();
  },
};
</script>

<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: "";
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

.event-block {
  h3.th-sec-title {
    margin-bottom: 65px;
  }
}
.home-banner .slide-img {
  height: 600px;
  width: 100vw;
  opacity: 0.8;

  @media (max-width: 1152px) {
    height: 480px;
  }

  @media (max-width: 768px) {
    height: 320px;
  }

  @media (max-width: 375px) {
    height: 270px;
  }
}

.content-blog .subtitle {
  margin-bottom: 30px;
}

.content-blog p.desc {
  margin-bottom: 30px;
  line-height: 30px;
}
.content-blog {
  a.btn {
    line-height: 21px;
  }
  .readmore-btn {
    max-width: 295px;
    width: 100%;
    height: 56px;
  }
}
.feature-homeblog {
  .feature-block {
    padding-top: 50px;
    border-top: 1px solid #c6b075;
  }
}

.seeker-of-knowledge {
  padding-bottom: 90px;
}
.sec-head {
  margin-bottom: 45px;
}
.seeker-desc {
  margin: 0 auto;
  text-align: center;
  max-width: 820px;
}

.event-item {
  padding: 0;
}

.prev,
.next {
  &.is-brown {
    background-image: url(/meccabook/slide-arrow-gold.svg);
  }

  @media (max-width: 768px) {
    top: 25%;
  }
}
.gallery-blog {
  margin-top: 50px !important;
}
.related-product-sec {
  margin-top: 90px;
}
.img-wrap {
  @media (min-width: 768px) {
    height: 232px;
      max-width: 232px;
    width: 100%;
  }
  img {
    @media (min-width: 768px) {
      height: 232px;
      max-width: 232px;
      width: 232px;
      object-fit: contain;
    }
  }
}
.viewImg {
  margin-top: 51px;
}
.viewImg img {
    width: 611px; 
    height: 630px;
}
</style>
