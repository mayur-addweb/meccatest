<template>
  <div id="product">
    <AwLoader
      :class="{ 'loading--product': productDataIsLoading }"
      :loading="productDataIsLoading"
    >
      <div>
        <div class="breadcrumb-sec d-none d-md-block">
          <div class="container">
            <div class="breadcrumb-wrapper" aria-label="breadcrumb">
              <nuxt-link to="/" class="breadcrub-link">Home ></nuxt-link>
              <ol
                v-for="(val, index) in breadcrumbs"
                :key="index"
                class="breadcrumb"
              >
                <li class="breadcrumb-item">
                  <nuxt-link :to="val.link ? (val.text!==breadcrumbs[0].text ? (index == 2 ? splitHTML(val.link).replace('/c', splitHTML(breadcrumbs[0].link)  + splitHTML(breadcrumbs[1].link.replace('/c',''))) : splitHTML(val.link).replace('/c','/c/' + breadcrumbs[0].text.toLowerCase())) : (index == 2 ? (splitHTML(val.link)).replace('/c','/c/' + breadcrumbs[1].link.replace('/c','')) : splitHTML(val.link)) )  : '!#'"
                    >{{ val.text === 'Kids' || val.text === 'Categories' ? "Books"
                    : val.text }}
                  </nuxt-link>
                  <span v-if="breadcrumbs && index < breadcrumbs.length - 1"
                    >></span
                  >
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="product-banner">
          <div class="container">
            <div class="d-lg-flex justify-content-between">
              <div class="view-product d-block">
                <product-slider
                  v-if="product.media_gallery"
                  :productGallery="product.media_gallery"
                  :breadcrumbs="breadcrumbs"
                  :imageIndex="product.media_gallery.findIndex((object) => object.url === product.image.url)"
                />
                <div v-else class="product-slider">
                  <div class="product-img" style="background-image: url()">
                    <img src="/meccabook/product-slide-img.png" alt="" />
                  </div>
                </div>

                <div class="thumb-slider d-none d-lg-block"></div>
              </div>
              <div class="product-details">
                <h2 class="pageInfo-title">
                  {{ productGetters.getName(product) }}
                </h2>

                <AuthorEdition :productsku="product.sku" />
                <div class="rating">
                          <rating :rating="productGetters.getAverageRating(product)"></rating>
                </div>
                <p class="desc">{{productShortDescription ? removeTags(productShortDescription) : '' }}</p>
                <div
                  class="stiky-onscroll"
                  :class="stickyHeader ? 'active-sticky' : null"
                >
                  <div
                    class="
                      container
                      d-flex
                      align-items-center
                      justify-content-between
                    "
                  >
                    <div class="th-wrp d-flex align-items-center"
                    @click="scrollToTop">
                      <div class="thumb-img"
                        :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
                      >
													<img v-if="product && product.image && product.image.url" :src="product.image.url" alt="">
											</div>

                      <div class="th-info">
                        <h4 class="th-title">
                          {{ productGetters.getName(product) }}
                        </h4>
                        <StickyHeaderAuthor :productsku="product.sku" />
                      </div>
                    </div>
                    <div class="d-flex">
                         <PriceVariation
                              v-if="product.__typename == 'SimpleProduct'"
                              :productsku="product.sku"
                              :Singleprice="$n(productPrice, 'currency')"
                            />
                            <template
                            v-for="option in configurableOptions"
                          >
                            <div
                              v-if="option.attribute_code === 'color'"
                              :key="option.uid"
                              class="product__colors desktop-only"
                            >
                              <p class="product__color-label">
                                {{ option.label }}:
                              </p>
                              <SfColor
                                v-for="color in option.values"
                                :key="color.uid"
                                :color="productGetters.getSwatchData(color.swatch_data)"
                                :selected="productConfiguration[option.attribute_uid] === color.uid"
                                class="product__color"
                                @click="() => updateProductConfiguration(option.attribute_uid, color.uid)"
                              />
                            </div>
                            <div
                              v-else-if="option.attribute_code === 'format'"
                              :key="option.uid"
                              class="product__colors desktop-only"
                            >

                              <AWPriceSelector
                                v-for="(color, index) in option.values"
                                :key="index"
                                :idx="index"
                                :configPrice="priceStoreConfig ? priceStoreConfig[index] : '' "
                                :color="productGetters.getSwatchData(color.swatch_data)"
                                :productsku="product.sku"
                                :selected="productConfiguration[option.attribute_uid] === color.uid"
                                @click="() => updateProductConfiguration(option.attribute_uid, color.uid)"
                              >
                              </AWPriceSelector>
                            </div>
                          </template>
                      <div class="add-cart">
                        <button
                          @click="addItem({ product, quantity: parseInt(qty) })"
                          href="#"
                          class="btn cart-btn btn-larg-yello text-uppercase"
                          :disabled="product.only_x_left_in_stock>0"
                        >
                          <span>Add to cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <PriceVariation
                  v-if="product.__typename == 'SimpleProduct'"
                  :productsku="product.sku"
                  :Singleprice="$n(productPrice, 'currency')"
                />
                <template
                v-for="option in configurableOptions"
              >
                <div
                  v-if="option.attribute_code === 'color'"
                  :key="option.uid"
                  class="product__colors desktop-only"
                >
                  <p class="product__color-label">
                    {{ option.label }}:
                  </p>
                  <SfColor
                    v-for="color in option.values"
                    :key="color.uid"
                    :color="productGetters.getSwatchData(color.swatch_data)"
                    :selected="productConfiguration[option.attribute_uid] === color.uid"
                    class="product__color"
                    @click="() => updateProductConfiguration(option.attribute_uid, color.uid)"
                  />
                </div>
                <div
                  v-else-if="option.attribute_code === 'format'"
                  :key="option.uid"
                  class="product__colors"
                >
                  <AWPriceSelector
                    v-for="(color, index) in option.values"
                    :key="index"
                    :idx="index"
                    :configPrice="priceStoreConfig ? priceStoreConfig[productGetters.getSwatchData(color.swatch_data)] : '' "
                    :color="productGetters.getSwatchData(color.swatch_data)"
                    :productsku="product.sku"
                    :selected="productConfiguration[option.attribute_uid] === color.uid"
                    @click="() => updateProductConfiguration(option.attribute_uid, color.uid)"
                  >
                  </AWPriceSelector>
                </div>
              </template>

              <template v-if="product.stock_status == 'IN_STOCK' || !isAuthenticated">
                <div class="add-cart d-md-flex">
                  <div
                    class="
                      inc-dcr-item
                      count
                      d-none d-md-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <button
                      type="button"
                      @click="qty > 2 ? qty-- : (qty = 1)"
                      class="decre-btn"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="onlyNumber form-control pull-left"
                      :value="qty"
                      name="noOfRoom"
                    />
                    <button
                      type="button"
                      @click="qty++"
                      value="+"
                      class="incr-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="addItem({ product, quantity: parseInt(qty) })"
                    href="#"
                    class="btn btn-larg-yello text-uppercase"
                    :disabled="product.only_x_left_in_stock>0"
                  >
                    <span>Add to cart</span>
                  </button>

                  <!-- configurableOptions pricevariation -->
                </div>
              </template>

              <template v-if="product.stock_status == 'OUT_OF_STOCK' && isAuthenticated">
                <!-- <form class="out-of-stock"> -->
										<span class="stock-title text-uppercase d-block">currently out of Stock</span>
										<div class="input-wrap notify_block">
											<!-- <label for="email">Enter your email to be notified when available</label> -->
											<div class="fld-wrp d-flex justify-content-between">
												<!-- <input type="email" id="email" class="form-control" placeholder="Your email address" /> -->
                        <button class="btn" @click="notifyUser(email)">
                          Notify Me
                        </button>

												<!-- <a href="" class="btn"><span>Notify Me</span></a> -->
											</div>
                      <div class="fld-wrp d-flex justify-content-between" v-if="notificationAdded">
                        <span class="notify_success">You will be notified once this product is in stock again.</span>
                      </div>
										</div>
								<!-- </form> -->
              </template>
                <div class="share-links d-md-flex align-items-center">
                  <div class="wishlist-wrap">
                    <AddToWishlist
                      :is-in-wishlist="isInWishlist"
                      :is-show="isAuthenticated"
                      @addToWishlist="addItemToWishlist({ product })"
                    />
                  </div>
                  <ShareButton />
                </div>
                <div
                  id="watchVideo"
                  class="watch-content text-center text-md-left"
                  v-if="alchemiyaVideo != null"
                >
                  <button @click="toggleAlchemia" class="alchemia-btn">
                    <img src="/meccabook/watch-logo.svg" alt="watch" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
           
        <section :class="alchemiaVisible ? 'alchemia-show' : 'alchemia-hide'">
          <div class="popup-overlay active d-none d-md-block">
            <div class="signin-popup shipping-popup watchvideo-popup">
              <button @click="toggleAlchemia" href="#!" class="close-icn">
                <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
              </button>
              <iframe
                width="620"
                height="315"
                class="product-vid"
                :src="alchemiyaVideo"
              >
              </iframe>
            </div>
          </div>
        </section>
          <section class="product-about-sec">
          <div class="container">
            <div class="about-product d-lg-flex justify-content-between">
              <div class="data-sheet d-lg-none">
                <div class="control-link d-lg-flex">
                  <a
                    @click="e => e.target.classList.toggle('active')"
                    class="
                      btns-links
                      datasheet-btn
                      d-flex
                      text-uppercase
                      align-items-center
                      justify-content-center
                    "
                    ><i class="arrow-icn"
                      ><img src="/meccabook/icon-down.svg" alt="icn"
                    /></i>
                    <span>data sheet</span></a
                  >
                  <div class="view-datasheet d-lg-none">
                    <datasheet v-if="product.sku" :productsku="product.sku" />
                  </div>
                  <a
                    @click="e => e.target.classList.toggle('active')"
                    class="
                      btns-links
                      d-flex
                      datasheet-btn
                      reviews-btn
                      text-uppercase
                      align-items-center
                      justify-content-center
                    "
                    ><i class="arrow-icn"
                      ><img src="/meccabook/icon-down.svg" alt="icn"
                    /></i>
                    reviews</a
                  >
                  <div class="view-datasheet d-lg-none"
                  :class="[isVisible ? 'active' : '']">
                   <template v-if="magentoReviews && magentoReviews.length>0">
                  <div v-for="review in magentoReviews" :key="review" class="review-wrap">
                    <h5 v-if="review.user && review.user.display_name" class="list-rw"><span class="list-head">User : </span>
                      <span class="list-desc">{{review.user.display_name}}</span></h5>
                    <h6 v-if="review.title"><span class="list-head">Title :</span><span class="list-desc">{{review.title}}</span></h6>
                    <p class="desc" v-if="review.content"><span class="list-head">Content :
                      </span><span class="list-desc">{{review.content}}</span></p>
                  </div>
                  </template>
                  <p class="desc" v-else>                    The first textbook of its kind in the English-speaking
                    world, Revelation draws on the most authoritative sources to
                    present a detailed yet refreshing guide to the life of the
                    Prophet and the story of Qur'anic revelation.
                  </p>
                </div> 
                </div>
              </div>
              <div class="data-sheet d-none d-lg-block">
                <div class="control-link d-lg-flex">
                  <button
                    @click="isVisible = true"
                    :class="[isVisible ? 'active' : '']"
                    href=""
                    class="
                      btns-links
                      deskdatasheet-btn
                      d-flex
                      text-uppercase
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="arrow-icn"
                      ><img src="/meccabook/icon-down.svg" alt="icn"
                    /></i>
                    <span>data sheet</span>
                  </button>
                  <button
                    @click="isVisible = false"
                    :class="[!isVisible ? 'active' : '']"
                    href=""
                    class="
                      btns-links
                      d-flex
                      reviewss-btn
                      text-uppercase
                      align-items-center
                      justify-content-center
                    "
                  >
                    <i class="arrow-icn"
                      ><img src="/meccabook/icon-down.svg" alt="icn"
                    /></i>
                    reviews
                  </button>
                </div>
                <div
                  class="view-datasheet deskdata-view"
                  :class="[isVisible ? 'active' : '']"
                >
                  <datasheet :productsku="product.sku" />
                </div>
                <div class="view-reviews" :class="[!isVisible ? 'active' : '']">
                <template v-if="magentoReviews && magentoReviews.length>0">
                  <div v-for="review in magentoReviews" :key="review" class="review-wrap">
                    <h5 v-if="review.user && review.user.display_name" class="list-rw"><span class="list-head">User : </span>
                      <span class="list-desc">{{review.user.display_name}}</span></h5>
                    <h6 v-if="review.title"><span class="list-head">Title :</span><span class="list-desc">{{review.title}}</span></h6>
                    <p class="desc" v-if="review.content"><span class="list-head">Content :
                      </span><span class="list-desc">{{review.content}}</span></p>
                  </div>
                  </template>
                  <p class="desc" v-else>                    The first textbook of its kind in the English-speaking
                    world, Revelation draws on the most authoritative sources to
                    present a detailed yet refreshing guide to the life of the
                    Prophet and the story of Qur'anic revelation.
                  </p>
                </div>
              </div>
              <div class="product-info">
                <p v-html="setHtmlData" class="desc product-desc"></p>
              </div>
            </div>
          </div>
        </section> 
        <LazyHydrate when-visible>
          <RelatedProduct :productsku="product.sku" :breadcrumbs="breadcrumbs" />
        </LazyHydrate>
        <RecentlyViewProduct :breadcrumbs="breadcrumbs" />
        <RecentlyViewProductMobile :breadcrumbs="breadcrumbs" />
      </div>
    </AwLoader>
  </div>
</template>
<script>
import LazyHydrate from "vue-lazy-hydration";
import axios from "axios";
import AWPriceSelector from "./AwComponents/atoms/AWPriceSelector.vue";

import {
  SfColor,
  SfLoader,
} from "@storefront-ui/vue";
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  reviewGetters,
  useUser,
  useWishlist,
  userGetters
} from "@vue-storefront/magento";
import { onSSR } from "@vue-storefront/core";
import {
  ref,
  computed,
  useContext,
  useRoute,
  useRouter,
  defineComponent,
  onMounted,
  onBeforeMount,
  watch,
} from "@nuxtjs/composition-api";
import { productData } from "~/helpers/product/productData";
import cacheControl from "~/helpers/cacheControl";
import BundleProductSelector from "~/components/Products/BundleProductSelector";
import GroupedProductSelector from "~/components/Products/GroupedProductSelector";
import InstagramFeed from "~/components/InstagramFeed.vue";
import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import ProductAddReviewForm from "~/components/ProductAddReviewForm.vue";
import RelatedProducts from "~/components/RelatedProducts";
import HTMLContent from "~/components/HTMLContent";
import AddToWishlist from "~/components/AddToWishlist";
import ProductSlider from "./product-detail/ProductSlider.vue";
import Datasheet from "./product-detail/DataSheet.vue";
import AuthorEdition from "./product-detail/AuthorEdition.vue";
import StickyHeaderAuthor from "./product-detail/StickyHeaderAuthor.vue";
import PriceVariation from "./product-detail/PriceVariation.vue";
import RelatedProduct from "./product-detail/RelatedProduct.vue";
import ShareButton from "./product-detail/ShareButton.vue";
import RecentlyViewProduct from "./product-detail/RecentlyViewProduct.vue";
import RecentlyViewProductMobile from './product-detail/RecentlyViewProductMobile.vue';
import Rating from "~/components/Products/Rating";
import AwLoader from './AwComponents/atoms/AwLoader.vue'

export default defineComponent({
  name: "ProductPage",
  components: {
    BundleProductSelector,
    GroupedProductSelector,
    HTMLContent,
    InstagramFeed,
    LazyHydrate,
    MobileStoreBanner,
    ProductAddReviewForm,
    RelatedProducts,
    SfColor,
    AwLoader,
    AddToWishlist,
    ProductSlider,
    Datasheet,
    AuthorEdition,
    StickyHeaderAuthor,
    PriceVariation,
    RelatedProduct,
    ShareButton,
    axios,
    AWPriceSelector,
    RecentlyViewProduct,
    RecentlyViewProductMobile,
    Rating
  },
  middleware: cacheControl({
    "max-age": 60,
    "stale-when-revalidate": 5,
  }),
  transition: "fade",
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }, 
    notifyUser(email) {
        let that = this;
        axios.get("/addNotification?email=" + email + '&product='+atob(this.product.uid))
          .then(response => {
            that.notificationAdded = true;
          })
          .catch(function (error) {
            console.log(error);
          });;

    }
  },
  beforeMount() {
    document.body.classList.add('pro-detail');
  },
  beforeDestroy() {
    document.body.classList.remove('pro-detail');
  },
  destroyed() {
    document.body.classList.remove("kids-route");
  },
  setup() {
    const qty = ref(1);
    const notificationAdded = ref(false);
    const { product, id } = productData();
    const route = useRoute();
    const router = useRouter();
    const { search, loading: productLoading } = useProduct(`product-${id}`);
    const { addItem, loading } = useCart();
    const {
      reviews: productReviews,
      search: searchReviews,
      loading: reviewsLoading,
      addReview,
    } = useReview(`productReviews-${id}`);
    const { user, isAuthenticated } = useUser();
    const { addItem: addItemToWishlist, isInWishlist } =
      useWishlist("GlobalWishlist");
    const { error: nuxtError } = useContext();
    const basePrice = ref(0);
    const openTab = ref(1);
    const isVisible = ref(true);
    const watchVideoPosition = ref(null);
    const windowScrollPosition = ref(null);
    const stickyHeader = ref(false);
    const alchemiaVisible = ref(false);
    const priceStoreConfig = ref(null);
    const recentlyViewProducts = ref([]);
    const magentoReviews = ref(null);
    const alchemiyaVideo = ref(null);
    const testData = ref('')

    const productName = computed(()=> product.value.name);
    const psku = computed(() => product.value.sku);
    const purl = computed(() => product.value.image.url);
    const pprice = computed(() => productPrice.value);
    const pUrlKey = computed(() => product.value.url_key);


    const productDataIsLoading = computed(
      () => productLoading.value && !productGetters.getName(product.value)
    );
    const productShortDescription = computed(
      () => product.value.short_description?.html || ""
    );
    const productDescription = computed(
      () => product.value.description?.html || ""
    );

    const setHtmlData = computed(() => {
      testData.value =  productDescription.value
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
    return testData.value
    })
 
    const productsku = computed(() => product.value.sku?.html || "");
    const canAddToCart = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      if (product.value.__typename === "ConfigurableProduct") {
        return !!product.value.configurable_product_options_selection?.variant
          ?.uid;
      }
      const inStock = product.value.stock_status || "";
      const stockLeft =
        product.value.only_x_left_in_stock === null
          ? true
          : qty.value <= product.value.only_x_left_in_stock;
      return inStock && stockLeft;
    });
    const categories = computed(() =>
      productGetters.getCategoryIds(product.value)
    );
    const baseReviews = computed(() =>
      Array.isArray(productReviews.value)
        ? [...productReviews.value].shift()
        : productReviews.value
    );
    const reviews = computed(() => reviewGetters.getItems(baseReviews.value));
    const totalReviews = computed(() =>
      reviewGetters.getTotalReviews(baseReviews.value)
    );
    const averageRating = computed(() =>
      reviewGetters.getAverageRating(baseReviews.value)
    );

    const breadcrumbs = computed(() => {
      const productCategories = product.value.categories;
      return productGetters.getBreadcrumbs(
        product.value,
        Array.isArray(productCategories) ? [...productCategories].pop() : []
      );
    });
    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        // eslint-disable-next-line no-underscore-dangle
        alt: product.value._name || product.value.name,
      }))
    );

    const configurableOptions = computed(
      () => product.value.configurable_options
    );
    const productConfiguration = ref(Object.entries(route.value.query));
    const productTypedPrice = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      switch (product.value.__typename) {
        case "BundleProduct":
          return basePrice.value;
        case "GroupedProduct":
          return basePrice.value;
        default:
          return 0;
      }
    });
    const productPrice = computed(
      () =>
        productTypedPrice.value ||
        productGetters.getPrice(product.value).regular
    );
    const productSpecialPrice = computed(() => {
      // eslint-disable-next-line no-underscore-dangle
      switch (product.value.__typename) {
        case "SimpleProduct":
        default:
          return productGetters.getPrice(product.value).special;
      }
    });

    const changeTab = (tabNumber, callback) => {
      document.querySelector("#tabs").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      openTab.value = tabNumber;
      if (callback && typeof callback === "function") callback();
    };
    const changeNewReview = () => {
      changeTab(2, () => {
        setTimeout(
          () =>
            document.querySelector("#addReview").scrollIntoView({
              behavior: "smooth",
              block: "end",
            }),
          500
        );
      });
    };
    const successAddReview = async (reviewData) => {
      await addReview(reviewData);
      document.querySelector("#tabs").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };

    const updateProductConfiguration = async (label, value) => {
      productConfiguration.value.push([label, value]);

      await router.push({
        path: route.value.fullPath,
        query: {
          ...Object.fromEntries(productConfiguration.value),
        },
      });
    };

    const fetchProductReview = () => {
      axios.get("/productReviews?productSku="+product.value.sku)
        .then(response => {
          magentoReviews.value = response.data[0].data.response.reviews;
      })
    };
     const fetchalchemiyaVideo = () => {

      axios.get("/alchemiyaVideo?productSku="+product.value.sku)
        .then(response => {
          alchemiyaVideo.value = response.data[0].data.alchemia_video;
      })
    };
    

    watch(recentlyViewProducts, () => {
      localStorage.setItem('rvproducts', JSON.stringify(recentlyViewProducts.value));
    })
onBeforeMount(() => {
      fetchalchemiyaVideo();   
    });
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      if(product.value.__typename === "ConfigurableProduct") {
        configProductOption();
      }
      if (
        breadcrumbs.value[0] &&
        breadcrumbs.value[0].text === "Kids"
      ) {
        document.body.classList.add("kids-route");
      }

      if (process.client) {
        const Storedata = JSON.parse(localStorage.getItem('rvproducts'));

        if(Storedata){
          const elemsToDelete = Storedata.length - 15;
          if (Storedata.length > 15) {
              Storedata.splice(Storedata.length - elemsToDelete,
                 elemsToDelete);
              recentlyViewProducts.value = Storedata;
          }
          else{
            recentlyViewProducts.value = Storedata;
          }
        }
      }

      let recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://static.addtoany.com/menu/page.js"
      );
      document.head.appendChild(recaptchaScript);

      fetchProductReview();
    });

      const AddrecentlyViewProducts = async () => {

          const Newproduct = {
            'sku': psku.value,
            'title': productName.value,
            'image': purl.value,
            'author': 'Shaykh Ahmad Ibn’Ajiba Al-Hasani',
            'price': pprice.value,
            'url_key': pUrlKey.value,
            'rating': averageRating.value,
          }
          const indexx = await recentlyViewProducts.value.findIndex(object => object.sku === Newproduct.sku);
          if(indexx === -1) {
            await recentlyViewProducts.value.unshift(Newproduct);
          }
          else {
            console.log("item is already in store");
          }

      }

      const handleScroll = () => {
        windowScrollPosition.value = window.scrollY
        if (windowScrollPosition.value > 900) {
          stickyHeader.value = true;
        }else{
          stickyHeader.value = false;
        }
      }

    const toggleAlchemia = () => {
      alchemiaVisible.value = !alchemiaVisible.value;
    };

    const splitHTML = (link) => {
      let newResult = link.split(".");
      return newResult[0];
    };

    onSSR(async () => {
      const baseSearchQuery = {
        filter: {
          sku: {
            eq: id,
          },
        },
        ...(productConfiguration.value.length > 0
          ? {
              configurations: productConfiguration.value.map(
                (config) => config[1]
              ),
            }
          : {}),
      };

      await search({
        queryType: "DETAIL",
        ...baseSearchQuery,
      });

      if (product?.value?.length === 0) nuxtError({ statusCode: 404 });

      await searchReviews(baseSearchQuery);

      await AddrecentlyViewProducts();
    });

    const removeTags = (str) => {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    };

    const configProductOption = () => {
      const psku = product.value.sku;
      axios
        .get(`https://meccamagento.addwebprojects.com/rest/V1/configoptions?sku=${psku}`)
          .then(response => {
              console.log(response.data[0].data);
              let data = [];
              for(let i = 0; i < response.data[0].data.length; i++){
                  data[response.data[0].data[i].options.format] = response.data[0].data[i];
              }

              priceStoreConfig.value = data
          })
          .catch(error => {
            console.log(error);
          })
    };

    return {
      addItem,
      addItemToWishlist,
      averageRating,
      basePrice,
      breadcrumbs,
      canAddToCart,
      categories,
      changeNewReview,
      changeTab,
      configurableOptions,
      isAuthenticated,
      isInWishlist: computed(() => isInWishlist({ product: product.value })),
      loading,
      openTab,
      product,
      productConfiguration: computed(() =>
        Object.fromEntries(productConfiguration.value)
      ),
      productDataIsLoading,
      productDescription,
      productGallery,
      productGetters,
      productLoading,
      productPrice,
      productReviews,
      productShortDescription,
      productSpecialPrice,
      qty,
      reviewGetters,
      reviews,
      reviewsLoading,
      successAddReview,
      totalReviews,
      updateProductConfiguration,
      removeTags,
      productsku,
      isVisible,
      handleScroll,
      watchVideoPosition,
      windowScrollPosition,
      stickyHeader,
      splitHTML,
      alchemiaVisible,
      toggleAlchemia,
      priceStoreConfig,
      configProductOption,
      recentlyViewProducts,
      productName,
      AddrecentlyViewProducts,
      psku,
      purl,
      pprice,
      pUrlKey,
      email: userGetters.getEmailAddress(user.value),
      notificationAdded,
      magentoReviews,
      alchemiyaVideo,
      fetchProductReview,
      fetchalchemiyaVideo,
      testData,
      setHtmlData
    };
  },
});
</script>
<style lang="scss" scoped>
.notify_block {
  margin-bottom: 15px;
}

.notify_success {
  margin-top: 10px;
  color: #2c354e;
}
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.product-loader {
  height: 38px;
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }

  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }

  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__additional-actions {
    display: flex;
    justify-content: flex-start;
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.loading {
  &--product {
    padding: var(--spacer-3xl) auto;
    @include for-desktop {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }

  &--product-gallery {
    padding: var(--spacer-3xl) auto;
    @include for-desktop {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
    }
  }
}

.alchemia-btn {
  background: transparent;
}

.book-slider {
  display: flex;
  flex-direction: row;
}

.active-sticky {
  opacity: 1;
  visibility: visible;
  transition: all 0.5s ease-in;
  .container {
    box-shadow: 0px 4px 4px #00000010;
  }

}

.alchemia-show {
  display: block;
}

.alchemia-hide {
  display: none;
}

.shipping-popup.watchvideo-popup {
  background: transparent;
  justify-content: center;
  display: flex;
  align-items: center;
  .product-vid {
    border-color: transparent;
    border-radius: 18px;
    width: 100%;
    height: 100%;
    min-height: 350px;
    max-width: 550px;
    margin: auto;
    align-items: center !important;
  }
  .close-icn {
    width: 42px;
    height: 42px;
    background: transparent;
    @media (min-width: 1200px) {
      top: 8px;
      right: 55px;
    }
  }
}
.wishlist-wrap {
  margin-bottom: 0px;
  margin-right: 25px;
}
.breadcrub-link {
  color: #4B4C4D;
}

p.desc p strong span {
    font-size: 1.5rem;
    color: red !important;
    letter-spacing: -0.035em;
    line-height: 1.2;
    margin-bottom: 18px;
    font-weight: 400;
    font-family: "leksa", serif;
}
.product__colors {
  @media all and (max-width: 767px) {
    flex-wrap: wrap;
  }
}

.view-reviews.active {

  .review-wrap {
    box-shadow: 0px 4px 4px rgb(0 0 0 / 6%);
    margin-bottom: 20px;
    padding: 15px;
  }
  h5,h6,p {
    display: flex;
    align-items: center;

    // span {
    //   margin-left: 20px;
    // }
  }
}
button:disabled {
opacity: 1;
}
</style>
