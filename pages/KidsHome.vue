<template>
  <div class="wrapper-blog kids-wrapper-blog">
    <section
      class="kids-home-banner"
      
      v-bind:style="{ 'background-image': 'url(' + getkidspage.components.middle.image_title_description[0].image.url + ')' }"
      v-if="
        getkidspage && getkidspage.components && getkidspage.components.middle
      "
    >
      <div class="container">
        <div class="kinds-banner-content">
          <h1 class="kinds-bn-title" v-html="getkidspage.components.middle.image_title_description[0].title.replaceAll(' ','&nbsp')">
          </h1>
        </div>
      </div>
    </section>
    <section class="knowledge-sec kids-knowledge-sec">
      <div
        class="container"
        v-if="
          getkidspage &&
          getkidspage.components &&
          getkidspage.components.middle &&
          getkidspage.components.middle.category_component
        "
      > 
       <div class="kids-card-head">
          <template
          >
            <div class="kids-img-card">
              <button v-if="getkidspage.components.middle.category_component[0].link"
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[0].image.img_url"
                  :alt="getkidspage.components.middle.category_component[0].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/kids-read-button-2.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[0].name}}</h6>
                </div>
              </button>
            </div>
          </template>
          <template
          >
            <div class="kids-img-card">
              <button v-if="getkidspage.components.middle.category_component[1].link" 
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[1].image.img_url"
                  :alt="getkidspage.components.middle.category_component[1].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/holding-box-button.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[1].name}}</h6>
                </div>
              </button>
            </div>
          </template>
           <template
          >
            <div class="kids-img-card">
              <button v-if="getkidspage.components.middle.category_component[2].link"
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[2].image.img_url"
                  :alt="getkidspage.components.middle.category_component[2].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/parent-and-kids-button-2.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[2].name}}</h6>
                </div>
              </button>
            </div>
          </template>
          <template
          >
            <div class="kids-img-card">
              <button :href="getkidspage.components.middle.category_component[3].link"
               class="select-tab">
                <img
                  v-bind:src="getkidspage.components.middle.category_component[3].image.img_url"
                  :alt="getkidspage.components.middle.category_component[3].image.alt"
                  class="kids-ctg-img"
                />
                <img
                  src="/meccabook/kids-with-toy-button-2.gif"
                  alt=""
                  class="kind-ctg"
                />
                <div class="ctg-name">
                  <h6>{{getkidspage.components.middle.category_component[3].name}}</h6>
                </div>
              </button>
            </div>
          </template>
      </div>
        <div
          v-if="getkidspage && getkidspage.components"
          class="kids sec-head text-center"
        >
          <h2 class="sec-title blue-text">
            {{ getkidspage.components.middle.image_title_description[1].title }}
          </h2>
          <p class="sec-desc blue-text">
            {{
              removeTags(
                getkidspage.components.middle.image_title_description[1]
                  .description.text
              )
            }}
          </p>
        </div>

        <FeaturedLatestPopular
          v-if="
            getkidsfeatured &&
            getkidsfeatured[0].data &&
            getkidsPopular &&
            getkidsPopular[0].model
          "
          :featured="getkidsfeatured"
          :popular="getkidsPopular"
        />
         
      </div>
        <FeaturedlatestPopularMobile
          v-if="
            getkidsfeatured &&
            getkidsfeatured[0].data &&
            getkidsPopular &&
            getkidsPopular[0].model
          "
          :featured="getkidsfeatured"
          :popular="getkidsPopular"
        />
    </section>
    <section class="related-product-sec">
      <div class="container" v-if="getkidslatest && getkidslatest[0].data">
        <h4 class="related-title blue-text Acme-font text-center">
          Latest items
        </h4>

        <kidslatest v-if="getkidslatest" :latest="getkidslatest[0].data">
        </kidslatest>
      </div>
    </section>
    <div class="art-showmore-btn">
      <div class="container" v-if="getkidslatest && getkidslatest[0].data">
        <div class="kids-showmore-card-btn">
          <div class="kids-show-more">
            <nuxt-link
            to="c/kids"
              class="btn"
            >
              <span>Show More</span>
              <i class="right-side-arrow"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Kidslatest from "../pages/kidshome/Kidslatest.vue";
import { mapActions, mapGetters } from "vuex";
import FeaturedLatestPopular from "./home/FeaturedLatestPopular.vue";
import FeaturedlatestPopularMobile from './home/FeaturedlatestPopularMobile.vue'
export default {
  components: {
    FeaturedLatestPopular,
    FeaturedlatestPopularMobile,
    Kidslatest,
  },
  computed: {
    ...mapGetters("drupalcms", [
      "getkidspage",
      "getkidslatest",
      "getkidsfeatured",
      "getkidsPopular",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchKids",
      "fetchKidslatest",
      "fetchKidsfeatured",
      "fetchKidspopular",
    ]),

    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },

  beforeMount() {
    document.body.classList.add('kids-home');
    this.fetchKids();
    this.fetchKidslatest();
    this.fetchKidsfeatured();
    this.fetchKidspopular();
  },
  beforeDestroy() {
    document.body.classList.remove('kids-home');
  },
};
</script>

<style lang="scss" scoped>
.related-wrap {
  margin-bottom: 59px;
  @media all and (max-width: 767px) {
    margin-bottom: 30px;
  }
  .category-img {
    min-width: unset;
  }
  .related-details {
    opacity: 1;
  }
}
.kids-show-more .btn {
  background-color: transparent;
}

.kids-wrapper-blog {
  background-image: url("/meccabook/kids-bg-img.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.kids-knowledge-sec {
    @media all and (max-width: 767px) {
    padding-top: 20px !important;
  }
}
.kids-card-head {
   @media all and (max-width: 767px) {
    margin-bottom: 20px !important;
  }
}

.event-prev {
  background: url(/meccabook/event-left-arror.png) no-repeat center center;
  left: -75px !important;
  z-index: 99;
}

.event-next {
  background: url(/meccabook/event-right-arrow.png) no-repeat center center;
  transform: unset !important;
  right: -75px !important;
  z-index: 99;
}

.prev,
.next {
  top: 40%;
}
.select-tab {
  background: transparent;
}
.nav.nav-tabs {
  margin-top: 40px;
}
.art-showmore-btn {
  margin-top: 0;
}
.related-product-sec {
  padding-bottom: 0;
}

</style>
