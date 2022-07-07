<template>
<AwLoader :class="{ loading }" :loading="loading">
  <div id="home" v-if="!loading">
      <!-- home-banner component start -->
    <LazyHydrate when-visible>
      <HomeBanner
        v-if="
          getHomeContent &&
          getHomeContent.components &&
          getHomeContent.components.middle &&
          getHomeContent.components.middle.carousel
        "
        :slider="getHomeContent.components.middle.carousel"
      />
    </LazyHydrate>
    <!-- home banner component end -->

    <section class="knowledge-sec">
      <div class="container">
      <LazyHydrate when-visible>
        <SeekerKnowledge
          v-if="
            getHomeContent &&
            getHomeContent.components &&
            getHomeContent.components.middle &&
            getHomeContent.components.middle.image_title_description[0]
          "
          :seekerKnowledge="
            getHomeContent.components.middle.image_title_description[0]
          "
        />
      </LazyHydrate>

        <!-- featured latest popular category -->
      <SfLoader :class="{ loader: loading }" :loading="loading">
        <FeaturedLatestPopular :featured="getHomeFeatured" :latest="getHomeLatest" :popular="getHomePopular" v-if="getHomeFeatured && getHomeFeatured[0].data && getHomeLatest && getHomeLatest[0].data && getHomePopular && getHomePopular[0].model" />
      </SfLoader>

      </div>
      <SfLoader :class="{ loader: loading }" :loading="loading">
        <FeaturedlatestPopularMobile :featured="getHomeFeatured" :latest="getHomeLatest" :popular="getHomePopular" v-if="getHomeFeatured && getHomeFeatured[0].data && getHomeLatest && getHomeLatest[0].data && getHomePopular && getHomePopular[0].model" />
      </SfLoader>
    </section>
    <LazyHydrate when-visible>
      <BrowseBySubject
        v-if="
          BrowseBySubject &&
          BrowseBySubject[0] &&
          BrowseBySubject[0].data
        "
        :browseBySubject="BrowseBySubject[0].data"
      />
    </LazyHydrate>

    <!-- donationblog -->
    <LazyHydrate when-visible>
      <DonationBlog
        v-if="DonationsMagento && DonationsMagento[0].data"
        :donationsData="DonationsMagento[0].data"
        :applyClass="applyClass"
      />
    </LazyHydrate>

    <!-- donatelist -->
    <section class="donatelist-sec d-none d-md-block">
      <div class="container">
      <LazyHydrate when-visible>
        <DonatelistBlog
          v-if="
            getHomeContent &&
            getHomeContent.components &&
            getHomeContent.components.middle &&
            getHomeContent.components.middle.category_component
          "
          :donateList="getHomeContent.components.middle.category_component"
        />
      </LazyHydrate>
      </div>
    </section>
    <!-- events -->
    <section class="event-block" v-if="getUpcomingEvents">
      <div class="container">
        <h3 class="th-sec-title text-md-center">Events</h3>
        <LazyHydrate when-visible>
          <EventSlider :events="getUpcomingEvents" v-if="getUpcomingEvents" />
        </LazyHydrate>
      </div>
    </section>
    <!-- AboutBook -->
    <about-book
    class="aboute-books-wrap"
      v-if="getHomeContent && getHomeContent.components && getHomeContent.components.middle && getHomeContent.components.middle.title_description_crop_image[0]"
      :content="getHomeContent.components.middle.title_description_crop_image[0].details[0]"
      :aboutimg="getHomeContent.components.middle.title_description_crop_image[0]"
    />
    <!-- Follow Us Section Start -->
    <section class="followus-sec mt-4">
      <div class="container">
        <h4 class="followUs text-center">Follow us @MeccaBooks</h4>
      </div>
      <follow-info></follow-info>
      
    </section>
  </div>
</AwLoader>
</template>

<script type="module">
import {
  defineComponent,
  ssrRef,
} from "@nuxtjs/composition-api";
import { onSSR, SfLoader } from "@vue-storefront/core";
import { useUser } from "@vue-storefront/magento";
import LazyHydrate from "vue-lazy-hydration";
import { mapActions, mapGetters } from "vuex";
import AboutBook from "./about-us/AboutBook.vue";
import EventSlider from "../pages/home/EventSlider.vue";
import HomeBanner from "./home/HomeBanner.vue";
import SeekerKnowledge from "./home/SeekerKnowledge.vue";
import DonatelistBlog from "./home/DonatelistBlog.vue";
import BrowseBySubject from "./home/BrowseBySubject.vue";
import FeaturedLatestPopular from "./home/FeaturedLatestPopular.vue";
import DonationBlog from "./home/DonationBlog.vue";
import FeaturedlatestPopularMobile from './home/FeaturedlatestPopularMobile.vue';
import FollowInfo from "./home/FollowInfo.vue";
import AwLoader from "./AwComponents/atoms/AwLoader.vue";
export default defineComponent({
  name: "HomePage",
  data() {
    return {
      applyClass: false
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 1000) {
        this.applyClass = true
      }
    });
  },
  components: {
    LazyHydrate,
    AboutBook,
    EventSlider,
    HomeBanner,
    SeekerKnowledge,
    DonatelistBlog,
    BrowseBySubject,
    FeaturedLatestPopular,
    DonationBlog,
    FeaturedlatestPopularMobile,
    FollowInfo,
    AwLoader,
  },
  setup(context) {
    const { loading } = useUser();

    const BrowseBySubject = ssrRef(null);

    const fetchBrowseBySubject = async () => {
      let data = await fetch(process.env.MAGENTO_MECCABOOK + '/rest/V1/subjects').then(res => res.json());
      return data;
    };

    const DonationsMagento = ssrRef(null);

    const fetchDonationsMagento = async () => {
      let data = await fetch(process.env.MAGENTO_MECCABOOK + '/rest/V1/donations').then(res => res.json());
      return data;
    };

    onSSR(async () => {
      BrowseBySubject.value = await fetchBrowseBySubject();
      DonationsMagento.value = await fetchDonationsMagento();
    });
    return {
      BrowseBySubject,
      DonationsMagento,
      loading
    };
  },
  computed: {
    ...mapGetters("drupalcms", [
      "getHomeContent",
      "getUpcomingEvents",
      "getHomeFeatured",
      "getHomeLatest",
      "getHomePopular",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchHome",
      "fetchUpcomingEvents",
      "fetchHomeFeatured",
      "fetchHomeLatest",
      "fetchHomePopular",
    ]),
  },
  beforeMount() {
    this.fetchHome();
    this.fetchUpcomingEvents();
    this.fetchHomeFeatured();
    this.fetchHomeLatest();
    this.fetchHomePopular();
  },
});
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
#home {
  box-sizing: border-box;
  @include for-desktop {
    padding: 0;
    margin: 0 auto;
  }
}
.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        --hero-item-wrapper-text-align: right;
        --hero-item-subtitle-width: 100%;
        --hero-item-title-width: 100%;
        --hero-item-wrapper-padding: var(--spacer-sm) var(--spacer-sm)
          var(--spacer-sm) var(--spacer-2xl);
      }
    }
  }
}
::v-deep .sf-hero__controls {
  --hero-controls-display: none;
}
.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}
.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}
.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}
.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}
.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}
.new-collection {
  @media (max-width: 767px) {
    padding-top: 0;
  }
}
#layout {
  max-width: none;
}
.prev,
.next {
  &.is-brown {
    background-image: url(/assets/meccabook/slide-arrow-gold.svg);
  }
  @media (max-width: 767px) {
    top: 25%;
  }
}
.next {
  right: 0;
  transform: rotate(180deg);
}
.custom-dot {
  width: 14px;
  height: 14px;
  border: 1px solid #c6b075;
  border-radius: 50%;
  cursor: pointer;
}
.slick-active {
  .custom-dot {
    background-color: #c6b075;
  }
}
.event-block {
  .container {
    @media (max-width: 768px) {
      .next,
      .prev {
        display: none;
      }
    }
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
}
.feature-homeblog {
  .feature-block {
    padding-top: 50px;
    border-top: 1px solid #c6b075;
  }
}
.related-product-sec {
  @media only screen and (min-width: 1200px) {
    .container {
      width: 1260px;
    }
  }
}
.related-slider {
  display: flex;
}
.aboute-books-wrap {
  @media only screen and (min-width: 768px) {
    margin-bottom: 136px;
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
</style>