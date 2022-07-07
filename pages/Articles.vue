<template>
  <!--Page Wrapper Start-->
  <div>
    <!-- Checkout Section Start -->
    <div class="contact product-page">
      <div class="breadcrumb-sec d-none d-md-block">
        <div class="container">
          <div class="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Blog</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- articles-sec start -->
      <section class="articles-sec">
        <div class="container">
          <article-title
            v-if="getArticlesContent && getArticlesContent.title"
            :title="getArticlesContent.title"
          />
          <div class="row">
            <div class="col-12">
              <div class="wrap d-md-flex justify-content-between">
                <router-link
                  :to="
                    '/article-detail/' + getArticlesContent.featured[0].node_id
                  "
                  class="move-pro-detail"
                  v-if="
                    getArticlesContent &&
                    getArticlesContent.featured[0] &&
                    getArticlesContent.featured[0].node_id
                  "
                ></router-link>
                <Main-article-image
                  v-if="
                    getArticlesContent && getArticlesContent.featured[0].image
                  "
                  :content="getArticlesContent.featured[0].image"
                />
                <Article-text
                  v-if="getArticlesContent && getArticlesContent.featured[0]"
                  :content="getArticlesContent.featured[0]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- articles-sec end -->
      <!-- art-categories Start -->
      <section class="art-categories">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="wrap d-md-flex justify-content-between">
                <div
                  v-if="
                    getArticlesContent &&
                    getArticlesContent.card_article.length > 0
                  "
                  class="art-Card-wrap"
                >
                  <card-article
                    v-for="(article, index) in getArticlesContent.card_article"
                    :key="index"
                    :card="article"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- art-categories End -->
      <section
        class="art-latest"
        v-if="getArticlesContent && getArticlesContent.latest_article"
      >
        <div class="container">
          <h3 class="th-sec-title">Latest articles</h3>
          <div
            v-if="
              getArticlesContent && getArticlesContent.latest_article.length > 0
            "
            class="art-Card-wrap"
          >
            <Latest-article-card
              v-for="(article, index) in paginatedContentArticle()"
              :key="index"
              :card="article"
            />
          </div>
        </div>
      </section>
      <div class="art-showmore-btn" v-if="getArticlesContent">
        <div
          class="container"
          v-if="getArticlesContent.latest_article.length > 8"
        >
          <div class="showmore-card-btn">
            <div class="show-more">
              <button
                v-if="this.showMoreButtonIsVisibleArticle"
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
    <!-- Checkout Section End -->
  </div>
  <!--Page Wrapper End-->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleTitle from "./articles/ArticleTitle.vue";
import MainArticleImage from "./articles/MainArticleImage.vue";
import ArticleText from "./articles/ArticleText.vue";
import CardArticle from "./articles/CardArticle.vue";
import LatestArticleCard from "./articles/LatestArticleCard.vue";
import { paginate } from "../mixins/paginatedContent.js";

export default {
  data() {
    return {
      contentFieldName: "getLatestArticle",
    };
  },
  components: {
    ArticleTitle,
    MainArticleImage,
    ArticleText,
    CardArticle,
    LatestArticleCard,
  },
  mixins: [paginate],
  computed: {
    ...mapGetters("drupalcms", ["getArticlesContent", "getLatestArticle"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchArticles"]),
  },
  beforeMount() {
    this.fetchArticles();
  },
};
</script>

<style lang="scss" scoped>
.contact {
  padding: 0 0 80px;
}
.breadcrumb-sec .breadcrumb-wrapper {
  margin-bottom: 20px;
}
.art-latest {
  .art-Card-wrap {
    margin-bottom: 0px !important;
      
  }
}
.th-sec-title {
  @media all and (max-width: 767px) {
    margin-bottom: 20px;
  }
}
.th-sec-title {
  @media all and (max-width: 767px) {
    margin-bottom: 20px;
  }
}
</style>


