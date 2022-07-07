<template>
  <div>
    <div class="breadcrumb-sec d-none d-md-block">
      <div class="container">
        <div class="breadcrumb-wrapper mb-20" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Events</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- Event-detail Section Start -->
    <section
      v-if="getEventDetails"
      class="blogWrap-sec pt-0"
    >
      <mobile-img
        v-if="getEventDetails.components"
        :image="getEventDetails.components.image"
      />
      <div class="container">
        <div class="row">
          <desktop-img
            v-if="getEventDetails.components"
            :image="getEventDetails.components.image"
          />
          <blog-text
            :content="getEventDetails.content"
            :detailComponents="getEventDetails.components"
          />
        </div>
      </div>
    </section>
    <!-- Event-detail Section End -->
    <!-- Event Gallery Section Start -->
    <gallery
      v-if="
        getEventDetails &&
        getEventDetails.components &&
        getEventDetails.components.gallery
      "
      class="event-gallery"
      :galleryImage="getEventDetails.components.gallery"
    />
    <!-- art-latest Section Start -->
    <section class="art-latest">
      <div class="container" v-if="getEventsHide  && getUpcomingEvents">
        <h3 class="th-sec-title text-center">Upcoming Event</h3>
        <div v-if="getEventsHide" class="art-Card-wrap">
          <event-card
            v-for="(event, index) in paginatedContent()"
            :key="index"
            :card="event"
          />
        </div>
      </div>
    </section>
    <!-- art-latest Section End -->
    <div class="art-showmore-btn" v-if="getEventsHide">
      <div class="container" v-if="getEventsHide.length > 4">
        <div class="showmore-card-btn">
          <div class="show-more">
            <button
              v-if="this.showMoreButtonIsVisible"
              class="btn"
              @click="incrementlimitIndex"
            >
              <i class="down-arrow"></i>
              <span>Show More</span>
            </button>

            <button v-else class="btn" @click="decrementlimitIndex">
              <i class="down-arrow is-up-arrow"></i>
              <span>Show Less</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogText from "./events/BlogText.vue";
import Gallery from "./about-us/Gallery.vue";
import DesktopImg from "./events/DesktopImg.vue";
import MobileImg from "./events/MobileImg.vue";
import EventCard from "./events/EventCard.vue";

import { paginate } from "../mixins/paginatedContent.js";

export default {
  components: {
    BlogText,
    DesktopImg,
    MobileImg,
    EventCard,
    Gallery,
  },
  mixins: [paginate],
  data() {
    return {
      contentFieldName: "getEventsHide",
      contentFieldName: (this.$route.path === '/events/' || this.$route.path === '/events') ?"getUpcomingEvents":"getEventsHide",
    };
  },
  computed: {
    ...mapGetters("drupalcms", [
      "getEventDetails",
      "getEventsHide",
      "getUpcomingEvents",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchEventDetails",
      "fetchEventsHide",
      "fetchUpcomingEvents",
    ]),
  },
  beforeMount() {
    this.fetchEventsHide(this.$route.path);
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchEventDetails(id);
    this.fetchUpcomingEvents();
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-sec .breadcrumb-wrapper {
  margin-bottom: 20px;
}
.blogWrap-sec {
  margin-bottom: 0;
  padding-bottom: 0;
}
.th-sec-title {
  margin-top: 80px;
  @media all and (max-width: 1199px) {
    margin-top: 40px;
  }
}

.art-Card-wrap {
  .artcard.card-wrao-info {
    margin: 0 5px 20px 0;
}
}
</style>