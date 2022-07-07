<template>
  <div class="wrapper-blog" v-if="getDynamicPageContent && getDynamicPageContent.components && getDynamicPageContent.components.middle">
    <!-- Hero Section Start -->

      <div v-for="(item, label, idx) in getDynamicPageContent.components.middle" :key="idx">
        <component :is="label.replaceAll('_','-')" :content="item"></component>
      </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ImageGallery from "./dynamicPage/ImageGallery.vue";
import CardWithBgColor from "./dynamicPage/CardWithBgColor.vue";
import FourColumnContent from "./dynamicPage/FourColumnContent.vue";
import ImageTitleDescription from "./dynamicPage/ImageTitleDescription.vue";
import quote from "./dynamicPage/quote.vue";
import CategoryComponent from "./dynamicPage/CategoryComponent.vue";
import TitleDescriptionCropImage from "./dynamicPage/TitleDescriptionCropImage.vue";
import TitleContentCtaImage from  "./dynamicPage/TitleContentCtaImage.vue";
import BannerComponent from "./dynamicPage/BannerComponent.vue";
import VideoComponent from "./dynamicPage/VideoComponent.vue";
import TimelineComponent from "./dynamicPage/TimelineComponent.vue";
import CardWithRatingsComponent from "./dynamicPage/CardWithRatingsComponent.vue";
import Wysiwyg from "./dynamicPage/Wysiwyg.vue";
import ThreeColumnPricingComponent from "./dynamicPage/ThreeColumnPricingComponent.vue";
import Typeform from "./dynamicPage/Typeform.vue";

export default {
  name: "dynamic-page",
  components: {
    ImageGallery,
    quote,
    CardWithBgColor,
    FourColumnContent,
    ImageTitleDescription,
    CategoryComponent,
    TitleDescriptionCropImage,
    TitleContentCtaImage,
    BannerComponent,
    VideoComponent,
    TimelineComponent,
    CardWithRatingsComponent,
    Wysiwyg,
    ThreeColumnPricingComponent,
    Typeform,
  },
  computed: {
    ...mapGetters("drupalcms", ["getDynamicPageContent"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchDynamicPageContent"]),
  },
  async mounted() {
    await this.fetchDynamicPageContent(this.$route.params.nodeId);
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
</style>