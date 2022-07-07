
<template>
  <section class="donation-sec">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Donations
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="donation-wrp d-md-flex justify-content-between">
            <div class="donation-info">
              <main-title-desc
                v-if="getDonationsContent"
                :content="getDonationsContent.content"
                :component="
                  getDonationsContent.components.left_sidebar
                    .image_title_description[0]
                "
              />
              <div
                class="donation-area"
                v-if="
                  getDonationsMagento &&
                  getDonationsMagento[0].data
                "
              >
                <div class="total-donation">
                  <span class="do-price">{{
                    getDonationsMagento[0].data[1].donation_amount
                  }}</span>
                  <p class="txt-desc" v-html="getDonationsMagento[0].data[2].donation_text">
                  </p>
                </div>
                <div class="donation-map d-none d-md-block">
                  <img :src="countryImageChange()" alt="map" class="map" />
                  <div class="location-card d-flex align-items-center" :class="applyClass ? 'image-fade' : '' " v-if="getDonationsMagento[0].data[0].order_data[productIndex]" :key="productIndex">
                    <div
                      class="loc-view"
                      v-if="
                        getDonationsMagento[0].data[0].order_data[productIndex]
                          .product_image
                      "
                    >
                      <img
                        :src="
                          getDonationsMagento[0].data[0].order_data[productIndex]
                            .product_image
                        "
                        alt="image"
                      />
                    </div>
                    <p
                      class="loc-desc"
                      v-if="getDonationsMagento[0].data[0].order_data[productIndex]"
                    >
                      Someone in
                      <strong>{{
                        getDonationsMagento[0].data[0].order_data[productIndex].country
                      }}</strong>
                      <br />
                      just improved Islamic education <br />
                      with their purchase of <br />
                      <strong>{{
                        getDonationsMagento[0].data[0].order_data[productIndex]
                          .product_name
                      }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="donation-partners"
              v-if="
                getDonationsContent &&
                getDonationsContent.components &&
                getDonationsContent.components.right_sidebar &&
                getDonationsContent.components.right_sidebar
                  .title_description_crop_image
              "
            >
              <h6
                class="do-title"
                v-if="
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[1].details[0] &&
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[0].details[0].title
                "
              >
                {{
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[0].details[0].title
                }}
              </h6>
              <ul
                class="recent-list d-md-flex flex-wrap align-items-center"
                v-if="
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[0].image
                "
              >
                <li
                  v-for="item in getDonationsContent.components.right_sidebar
                    .title_description_crop_image[0].image"
                  :key="item.image"
                >
                  <img class="img-donation" :src="item.image.url" :alt="item.image.alt" />
                </li>
              </ul>
              <h6
                class="prev-title do-title"
                v-if="
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[1].details[0] &&
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[1].details[0].title
                "
              >
                {{
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[1].details[0].title
                }}
              </h6>
              <ul
                class="previous-list d-flex flex-wrap justify-content-between"
                v-if="
                  getDonationsContent.components.right_sidebar
                    .title_description_crop_image[1].image
                "
              >
                <li
                  v-for="item in getDonationsContent.components.right_sidebar
                    .title_description_crop_image[1].image"
                  :key="item.image"
                >
                  <router-link to="#!"
                    ><img :src="item.image.url" :alt="item.image.alt" />
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainTitleDesc from "./donations/MainTitleDesc.vue";
export default {
  name: "Donations",
  data() {
    return {
      countryName: null,
      applyClass: false,
      productIndex: 0,
    }
  },
  components: {
    MainTitleDesc,
  },
  computed: {
    ...mapGetters("drupalcms", ["getDonationsContent", "getDonationsMagento"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchDonations", "fetchDonationsMagento"]),
    countryImageChange() {
      if(this.getDonationsMagento[0] && this.getDonationsMagento[0].data[0] && this.getDonationsMagento[0].data[0].order_data[this.productIndex].country) {
        this.countryName = this.getDonationsMagento[0].data[0].order_data[this.productIndex].country;
        if(this.countryName) {
        const imageURL = '/meccabook/country/'+this.countryName+'.svg'; 
        return imageURL;
        }
        else {
          return "/meccabook/CharityMap-01.jpg"
        }
      }else {
        return "/meccabook/CharityMap-01.jpg"
      }
    },

    changeProductIndex(){
      setTimeout(setInterval(()=>{
        if(this.getDonationsMagento[0] && this.getDonationsMagento[0].data[0] && this.getDonationsMagento[0].data[0].order_data[this.productIndex+1]){
        this.productIndex++
      }else{
        this.productIndex = 0;
      }
      },7000),7000)
      
      
    }
  },
  beforeMount() {
    this.fetchDonations();
    this.fetchDonationsMagento();
  },
  mounted() {
    this.changeProductIndex();
    window.addEventListener('scroll', () => {
      if(window.scrollY > 40) {
        this.applyClass = true
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/base-components/mixin.scss";
@import "assets/css/base-components/donation.scss";

.donation-area {
  padding: 24px 0 40px;
}
@media all and (min-width: 992px) {
  .donation-area {
    padding: 48px 0 40px;
  }
}
.total-donation {
  border-bottom: 2px solid #c6b075;
  background: #f1ede3;
  padding: 22px 50px 23px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
}

@media all and (max-width: 767px) {
  .total-donation {
    margin: 0 -26px;
    width: calc(100% + 52px);
    display: block !important;
  }
}
@media all and (min-width: 768px) {
  .total-donation {
    padding: 22px 15px 17px;
  }
}
.do-price {
  font-size: 2.8125rem;
  font-weight: 300;
  letter-spacing: -0.05em;
  color: #988146;
  line-height: 1.4;
  margin-bottom: 0;
  font-family: "leksa", serif;
}
@media all and (min-width: 768px) {
  .txt-desc {
    margin-left: 15px;
    text-align: left;
  }
}
@media all and (min-width: 992px) {
  .txt-desc {
    width: 217px;
    margin-left: 20px;
  }
}

h2.info-title,
.pageInfo-title {
  font-size: 2.25rem;
  font-family: "leksa", serif;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.4;
  letter-spacing: -0.05em;
  color: #2c354e;
}
@media all and (min-width: 1200px) {
  h2.about-title,
  h2.info-title,
  .pageInfo-title {
    font-size: 3rem;
    line-height: 1.09;
    letter-spacing: -0.065em;
    font-weight: 400;
    margin-bottom: 20px;
  }
}

.subtitle {
  font-size: 1.5rem;
  line-height: 1.2;
  font-family: "leksa", serif;
  margin-bottom: 14px;
  letter-spacing: -0.035em;
  color: #988146;
  margin-bottom: 20px;
}
@media all and (min-width: 1200px) {
  .subtitle {
    font-size: 1.875rem;
    line-height: 1.2;
    margin-bottom: 42px;
  }
}

@media all and (max-width: 767px) {
  .img-donation { 
    margin-bottom: 40px;
  }  
}
.img-donation {
  width: 188px;
  height: 58px;
}
.location-card {
  opacity: 0;
}
.image-fade {
  animation: fadeIn ease-in 1;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>