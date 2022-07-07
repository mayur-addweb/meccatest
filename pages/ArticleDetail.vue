<template>
        <!--Page Wrapper Start-->
    <div class="wrapper-wrap">
      <!-- breadcrumb-sec start -->
      <div class="breadcrumb-sec d-none d-md-block">
        <div class="container">
          <div class="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
              <li class="breadcrumb-item" aria-current="page">Content</li>
              <li class="breadcrumb-item" aria-current="page"><nuxt-link to="/articles">Articles</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page" v-if="getArticleDetails && getArticleDetails.components && getArticleDetails.components.title">
                {{ getArticleDetails.components.title[0].value }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- breadcrumb-sec end -->
      <!-- Banner Section Start -->
      <!-- small-banner start -->
      <div class="small-banner d-lg-none" v-if="getArticleDetails && getArticleDetails.components && getArticleDetails.components.image && getArticleDetails.components.image.url">
        <img :src="getArticleDetails.components.image.url" :alt="getArticleDetails.components.image.alt" />
        <div class="container">
          <h1 class="bn-title d-block d-lg-none" v-if="getArticleDetails.components.title && getArticleDetails.components.title[0].value">
            {{ getArticleDetails.components.title[0].value }}
          </h1>
        </div>
      </div>
      <!-- small-banner end -->
      <section
        class="banner dtl-banner"
        :style="'background-image: url('+ (getArticleDetails.components.image.url? getArticleDetails.components.image.url : '')+')'"
       v-if="getArticleDetails && getArticleDetails.components">
        <div class="container">
          <div class="banner-heading">
            <div class="row">
              <div class="col-md-6 offset-md-2">
                <div class="banner-desc-wrap">
                  <div class="date-address d-none d-md-block">
                    <span class="date" v-if="getArticleDetails.components.date">{{ formatCompat(getArticleDetails.components.date) }}</span>
                  </div>
                  <h1 class="bn-title d-none d-md-block" v-if="getArticleDetails.components.title">
                    {{ getArticleDetails.components.title[0].value }}
                  </h1>
                  <div class="date-address d-none d-md-block" v-if="getArticleDetails.components.tags">
                    <span class="address" v-for="(item,i) in getArticleDetails.components.tags" :key="i">{{ getArticleDetails.components.tags[i+1] ? item+", " : item }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Banner Section End -->
      <!-- Detail-wrap-sec Section Start -->
      <section class="detail-wrap-sec" v-if="getArticleDetails && getArticleDetails.components">
        <div class="container">
          <div class="row">
            <div class="col-lg-2 col-xl-2 d-none d-lg-block">
              <div class="detail-left-wrap">   
                <p class="desc" v-html="getArticleDetails.components.description.text" v-if="getArticleDetails && getArticleDetails.components && getArticleDetails.components.description && getArticleDetails.components.description.text">
                </p>
              </div>
            </div>
            <div class="col-lg-8 col-xl-8">
              <div class="detail-right-wrap">
                <h3 class="subtitle" v-if="getArticleDetails.components.detail_page_title[0] && getArticleDetails.components.detail_page_title[0].value">
                  {{getArticleDetails.components.detail_page_title[0].value}}
                </h3>
                <template v-if="getArticleDetails.components.description_2">
                <p class="desc desc-pera" v-if="getArticleDetails.components.description_2.wysiwyg && getArticleDetails.components.description_2.wysiwyg[0] && getArticleDetails.components.description_2.wysiwyg[0].content" v-html="getArticleDetails.components.description_2.wysiwyg[0].content">
                </p>
                <h6 class="desc-title desc-pera" v-if="getArticleDetails.components.description_2.image_title_description && getArticleDetails.components.description_2.image_title_description[0] && getArticleDetails.components.description_2.image_title_description[0].title">{{ getArticleDetails.components.description_2.image_title_description[0].title }}</h6>
                <p class="desc desc-pera" v-if="getArticleDetails.components.description_2.image_title_description && getArticleDetails.components.description_2.image_title_description[0] && getArticleDetails.components.description_2.image_title_description[0].description" v-html="getArticleDetails.components.description_2.image_title_description[0].description.text">
                
                </p>
                
                <div class="d-view-img" v-if="getArticleDetails.components.description_2.image_title_description[1] && getArticleDetails.components.description_2.image_title_description[1].image && getArticleDetails.components.description_2.image_title_description[1].image.url">
                  <img :src="getArticleDetails.components.description_2.image_title_description[1].image.url" :alt="getArticleDetails.components.description_2.image_title_description[1].image.alt" />
                </div>
                <h6 class="desc-title" v-if="getArticleDetails.components.description_2.image_title_description[1] && getArticleDetails.components.description_2.image_title_description[1].title">{{ getArticleDetails.components.description_2.image_title_description[1].title }}</h6>
                <p class="desc" v-if="getArticleDetails.components.description_2.image_title_description[1] && getArticleDetails.components.description_2.image_title_description[1].description && getArticleDetails.components.description_2.image_title_description[1].description.text" v-html="getArticleDetails.components.description_2.image_title_description[1].description.text">
                </p>
                <h6 class="desc-title" v-if="getArticleDetails.components.description_2.image_title_description[2] && getArticleDetails.components.description_2.image_title_description[2].title">{{ getArticleDetails.components.description_2.image_title_description[2].title }}</h6>
                <p class="desc" v-if="getArticleDetails.components.description_2.image_title_description[2] && getArticleDetails.components.description_2.image_title_description[2].description && getArticleDetails.components.description_2.image_title_description[2].description.text" v-html="getArticleDetails.components.description_2.image_title_description[2].description.text">
                </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Detail-wrap-sec Section End -->
    </div>
    <!--Page Wrapper End-->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default{
  computed: {
    ...mapGetters("drupalcms", ["getArticleDetails"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchArticleDetails"]),
   formatCompat(d3) {
      const initial = d3.toString().replace(/-/g, "/").split(/\//);
      const t = [initial[1], initial[0], initial[2]].join("/");
      const d = new Date(t);
      const ms = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return (
        ms[d.getMonth()] +
        " " +
        String(d.getDate()).padStart(2, "0") +
        "," +
        d.getFullYear()
      );
    },
  },
  mounted() {
    const id = this.$route.params.nodeId;
    this.fetchArticleDetails(id);
  },
}
</script>




<style lang="scss" scoped>
.side-content{
  font-size: 14px;
}
.breadcrumb{
  li{
    color: #4B4C4D;
    a{
      color: #4B4C4D;
    }
  }
}
.detail-wrap-sec{
  .container{
    .detail-left-wrap{
    p.desc{
      color: #4B4C4D;
      }
    }
  }
}
.banner{
  .container{
    .banner-heading{
      .banner-desc-wrap{
        .date-address{
          span{
            font-weight:400;
            line-height:25px;
            font-family: "leksa-sans",sans-serif;
          }
        }
      }
    }
  }
}
.detail-right-wrap{
  @media all and (min-width: 768px) {
    max-width: 715px;
  }
  .desc-title.desc-pera{
    color: #4B4C4D;
  }
} 
p.desc.desc-pera{
  color: #4B4C4D;
}
p.desc{
  color:#2C354E;
}
.breadcrumb-sec .breadcrumb-wrapper {
    margin-bottom: 20px;
}
.banner.dtl-banner {
  position: relative;
  opacity: 1;
  z-index: 1;
  &::after {
    content: '';
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(61, 69, 93, 0.87) 100%);
    opacity: .9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
.d-view-img img {
  @media all and (min-width: 768px) {
    width: 715px;
    height: 361px;
  } 
}
</style>