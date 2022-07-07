<template>
  <div id="about-us">
    <!-- About Us Section Start -->
    <div class="breadcrumb-sec d-none d-md-block">
      <div class="container">
        <div class="breadcrumb-wrapper" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">About Us</li>
          </ol>
        </div>
      </div>
    </div>
    <section v-if="getAboutusContent" class="about-us-sec">
      <div class="container">
        <div
          v-if="getAboutusContent.components"
          class="wrap d-xl-flex justify-content-between"
        >
          <div class="details">
            <header-text
              v-if="getAboutusContent.content"
              :content="getAboutusContent.content"
              :subText="getAboutusContent.components.middle"
            />
            <main-mob-image
              v-if="getAboutusContent.components.middle"
              :image="
                getAboutusContent.components.middle.image_title_description[0]
              "
            />
            <main-text-content
              v-if="getAboutusContent.components.middle"
              :content="
                getAboutusContent.components.middle.image_title_description[0]
              "
            />
          </div>
        </div>
      </div>
      <main-desk-image
        v-if="getAboutusContent.components.middle"
        :image="getAboutusContent.components.middle.image_title_description[0]"
      />
    </section>
    <!-- About Gallery Section Start -->
    <!-- timeline -->
    <section class="timeline-component">
      <timeline 
       v-if="
          getrelandingPage &&
          getrelandingPage.components &&
          getrelandingPage.components.middle &&
          getrelandingPage.components.middle.timeline_component
        "
          :timeline="getrelandingPage.components.middle.timeline_component"
        >
      </timeline>
    </section>
    <!-- <gallery /> -->
    <gallery
      v-if="
        getAboutusContent &&
        getAboutusContent.components &&
        getAboutusContent.components.middle &&
        getAboutusContent.components.middle.image_gallery &&
        getAboutusContent.components.middle.image_gallery.image
      "
      :galleryImage="getAboutusContent.components.middle.image_gallery.image"
    />
    <!-- Advisors Section Start -->
    <section
      v-if="getAboutusContent && getAboutusContent.components"
      class="advisors-sec infoBlock-wrapSec"
    >
      <div class="container">
        <advisor-head
          v-if="getAboutusContent.components.middle"
          :content="
            getAboutusContent.components.middle.image_title_description[1]
          "
        />
        <advisor-cards
          v-if="getAboutusContent.components.middle"
          class="advisors-wrap d-md-flex justify-content-between flex-wrap"
          :cards="getAboutusContent.components.middle.three_column_content"
        />
        <!-- <quote-slider /> -->
        <quote-slider
          v-if="
            getAboutusContent &&
            getAboutusContent.components &&
            getAboutusContent.components.middle &&
            getAboutusContent.components.middle.quote
          "
          :quotes="getAboutusContent.components.middle.quote"
        />
      </div>
    </section>
    <!-- AboutBook -->
    <about-book
      v-if="getAboutusContent && getAboutusContent.components"
      :content="
        getAboutusContent.components.middle.title_description_crop_image[0]
          .details[0]
      "
      :aboutimg="
        getAboutusContent.components.middle.title_description_crop_image[0]
      "
    />
    <section class="followus-sec followus-wrap mt-4">
      <div class="container">
        <h4 class="followUs text-center">Follow us @MeccaBooks</h4>
      </div>
      <follow-info></follow-info>
     
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainMobImage from "./about-us/MainMobImage.vue";
import MainDeskImage from "./about-us/MainDeskImage.vue";
import MainTextContent from "./about-us/MainImgTextContent.vue";
import HeaderText from "./about-us/PageHeaderText.vue";
import AdvisorHead from "./about-us/AdvisorHead.vue";
import AdvisorCards from "./about-us/AdvisorCard.vue";
import Gallery from "./about-us/Gallery.vue";
import AboutBook from "./about-us/AboutBook.vue";
import QuoteSlider from "./about-us/QuotesSlider.vue";
import FollowInfo from "./home/FollowInfo.vue";
import Timeline from "./Timeline.vue";

export default {
  name: "AboutUs",
  components: {
    MainTextContent,
    MainDeskImage,
    HeaderText,
    MainMobImage,
    AdvisorHead,
    AdvisorCards,
    Gallery,
    AboutBook,
    QuoteSlider,
    FollowInfo,
    Timeline,
  },
  computed: {
    ...mapGetters("drupalcms", ["getAboutusContent", "getrelandingPage"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchAboutus", "fetchlandingpage"]),
  },
  mounted() {
    this.fetchAboutus();
    this.fetchlandingpage();
  },
};
</script>

<style lang="scss" scoped>
.about-us-sec {
  .details {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
.timeline-component {
  margin: 50px 0 0 30px;
}
</style>