<template>
   <div id="error">
    <section class="blogWrap-sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-sm-12 d-lg-flex justify-content-lg-center">
            <div class="blog-left">
              <img src="/meccabook/404-blog.png" alt="404" />
            </div>
          </div>
          <div class="col-lg-5 col-sm-12">
            <div class="blog-right">
              <span class="er-title">Error 404</span>
              <h2 class="pageInfo-title about-title colorBlue">
                Page Not Found
              </h2>
              <p class="desc">
                We searched through every book we have, but the
                page you seek could not be found. Please check your
                query and try again.
              </p>
              <p class="desc last-child">
                If you continue to experience issues please get in touch through the contact page. This page is sure to be found.
              </p>
              <router-link class="btn readmore-btn" to="/contact-us"
                ><span>Contact Us</span></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
        <!-- Browse Section End -->
    <BrowseBySubject v-if="getBrowseBySubject && getBrowseBySubject[0] && getBrowseBySubject[0].data" :browseBySubject="getBrowseBySubject[0].data"/>
     <!-- donated list Section Start -->
    <section class="donatelist-sec d-none d-md-block">
      <div class="container">
    
        <DonatelistBlog
          v-if="
            getHomeContent &&
            getHomeContent.components &&
            getHomeContent.components.middle &&
            getHomeContent.components.middle.category_component
          "
          :donateList="getHomeContent.components.middle.category_component"
        />
      
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

<script>
import BrowseBySubject from "../pages/home/BrowseBySubject.vue";
import DonatelistBlog from "../pages/home/DonatelistBlog.vue";
import FollowInfo from "../pages/home/FollowInfo.vue"
import { mapActions, mapGetters } from "vuex";
export default{
  name: "errorLayout",
  components:{
    BrowseBySubject,
    DonatelistBlog,
    FollowInfo
  },
  computed: {
    ...mapGetters("drupalcms", ["getBrowseBySubject", "getHomeContent"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchBrowseBySubject", "fetchHome"]),
  },
  async mounted() {
    await this.fetchBrowseBySubject();
    await this.fetchHome();
  },
};
</script>


<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.blogWrap-sec{
  background-image:url('/meccabook/404-page-bg.png');
  background-size:cover;
  background-repeat:no-repeat;
}
.donatelist-sec{
  margin-bottom:60px;
}
</style>
