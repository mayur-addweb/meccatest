<template>
  <div :open-tab="1"  class="tab-orphan">
    <div>
      <h3 class="d-none block-title d-lg-block" v-if="totalItems">Wishlist</h3>
      <div v-if="loading">
        <AwLoader />
      </div>
      
      <div
        v-else
      >
       
        <div class="filters-wrap" v-if="totalItems">
          <div class="category-filter mt-4 d-lg-none">
                <div class="prev-page btn-wrap prev">
                    <PrevArrow
                        v-if="!loading"
                        v-show="pagination.totalPages > 1"
                        :current="pagination.currentPage"
                        :total="pagination.totalPages"
                        :visible="5"
                      />
                </div>
                <div class="filter-wrap">
                  <div
                v-show="pagination.totalPages > 1"
                class="products__show-on-page"
              >
                <AwSelect
                  :value="pagination.itemsPerPage.toString()"
                  class="items-select"
                  @input="th.changeItemsPerPage"
                >
                  <AwSelectOption
                    v-for="option in pagination.pageOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ $t("Show") }}
                    {{ option }}
                    <!-- {{ $t("per page") }} -->
                  </AwSelectOption>
                </AwSelect>
                <!-- </div> -->
              </div>
                </div>
                <div class="sort-wrap">   
                  <SelectPagination
                    v-if="!loading"
                    v-show="pagination.totalPages > 1"
                    :current="pagination.currentPage"
                    :total="pagination.totalPages"
                    :visible="5"
                  />
                </div>
              <div class="next-page btn-wrap next">
                  <NextArrow 
                    v-if="!loading"
                    v-show="pagination.totalPages > 1"
                    :current="pagination.currentPage"
                    :total="pagination.totalPages"
                    :visible="5"
                  />
              </div>
          </div>
            <div class="filter-left d-none d-lg-flex">
              <div class="product-show-nav">
              <div
                v-show="pagination.totalPages > 1"
                class="products__show-on-page"
              >
                <AwSelect
                  :value="pagination.itemsPerPage.toString()"
                  class="items-select"
                  @input="th.changeItemsPerPage"
                >
                  <AwSelectOption
                    v-for="option in pagination.pageOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ $t("Show") }}
                    {{ option }}
                    {{ $t("per page") }}
                  </AwSelectOption>
                </AwSelect>
                <!-- </div> -->
              </div>  
              </div>
            </div> 
            <div class="filter-right">
              <div class="page-details">
                <p>
                  {{
                    $t(
                      `Showing ${rangeOfItemsShown} of ${pagination.totalItems} items`
                    )
                  }}
                </p>
                <SelectPagination
                  v-if="!loading"
                  v-show="pagination.totalPages > 1"
                  :current="pagination.currentPage"
                  :total="pagination.totalPages"
                  :visible="5"
                />
              </div>
            </div>
        </div>
        
        <!-- End filter wrap -->
        <div class="main section" v-if="totalItems">
          <AwLoader
            :class="{ loading }"
            :loading="loading"
          >
            <div
              v-if="!loading"
            >
              <transition-group
                appear
                name="products__slide"
                class="top-block"
                tag="div"
              >
              <div 
              v-for="(product, i) in products"
              :key="productGetters.getSlug(product.product)"
              :style="{ '--index': i }"
              class="category-wrap listcat-vw">

              <div class="category-img mob-lt-hide" 
              @click="redirectToDetailPage(product.product)"
              style="background-image: url('')">
              
                <div class="img-wrap" >
                 <img :src="productGetters.getProductThumbnailImage(product.product)" alt="category" title="category">
                </div>
              </div>
              <div class="category-details">
                <div class="category-left"               
                @click="redirectToDetailPage(product.product)"
                >
                  <div class="category-name">
                    {{productGetters.getName(product.product)}}
                  </div>
                  <div class="category-info">
                   {{product.author_3nd}}
                  </div>
                  <div class="price-wrap">
                    {{$n(productGetters.getPrice(product.product).regular, 'currency')}}
                  </div>
                  <div class="rating">
                    <div class="ratings-wrap">
                     <rating :rating="productGetters.getAverageRating(product)"></rating>
                        
                    </div>
                  </div>
                </div>
                  <button class="remove-ilnk text-underline ml-0 d-lg-none" @click="removeItemFromWishlist(product.product)">Remove</button>
                <div class="category-right d-none d-lg-block">
                  <div class="wishlist-wrap remove-wishlist">
                    <button @click="removeItemFromWishlist(product.product)">
                      <i class="icon-wishlist"></i>
                      {{ $t('Remove from Wishlist') }}
                    </button>
                  </div>
                  <div class="preview-wrap">
                    <a @click="toggleAlchemia(productGetters.getProductThumbnailImage(product.product))">
                      <i class="icon-search"></i>
                      <span class="text">See preview</span>
                    </a>
                  </div>
                  <section :class="alchemiaVisible ? 'alchemia-show' : 'alchemia-hide'">
                          <div class="popup-overlay active d-none d-md-block">
                        <div class="signin-popup shipping-popup watchvideo-popup">
                          <button @click="toggleAlchemia(productGetters.getProductThumbnailImage(product.product))" href="#!" class="close-icn">
                            <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
                          </button>
                          <img class="see-preview-img" :src="previewPic" alt="image" />
                        </div>
                      </div>
                  </section>
                  <ShareButton />
                </div>
              </div>
              </div>
              </transition-group>
            </div>
          </AwLoader>
        </div>
       <div v-else class="text-center empty-wishlist">
         <h2 class="subtitle">Your wishlist is empty</h2>
         <p class="desc">Looks like you haven’t added any items to the Wishlist.</p>
         <div class="btn-shopping">
          <nuxt-link
                to="/c/categories"
                class="btn banner-btn btn-shadow"
                ><span>Go back shopping</span></nuxt-link
              >
        </div>
       </div>
      </div>
    </div>
    
  </div>
   
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { ref } from "@nuxtjs/composition-api";
import AwRating from '../AwComponents/atoms/AwRating.vue';
import AwLoader from "../AwComponents/atoms/AwLoader.vue";
import {
  SfProperty,
  SfSelect,
} from "@storefront-ui/vue";
import {
  computed,
  defineComponent,
  useRouter,
  useRoute,
  onMounted,
} from '@nuxtjs/composition-api';
import {
  useCart,
  useWishlist,
  productGetters,
  wishlistGetters,
  useFacet,
  useReview,
  reviewGetters,
} from '@vue-storefront/magento';
import { useUiHelpers, useUiState } from '~/composables';
import { productData } from '~/helpers/product/productData';
import { useUrlResolver } from "~/composables/useUrlResolver.ts";

import ShareButton from "../product-detail/ShareButton.vue";
import SelectPagination from "../AwComponents/molecules/SelectPagination.vue";
import AwSelect from "/pages/AwComponents/molecules/AwSelect.vue";
import AwSelectOption from "/pages/AwComponents/molecules/AwSelectOption.vue";
import AwButton from "../AwComponents/atoms/AwButton.vue";
import AuthorEdition from '../product-detail/AuthorEdition.vue'
import PrevArrow from "../AwComponents/molecules/PrevArrow.vue";
import NextArrow from "../AwComponents/molecules/NextArrow.vue";
import Rating from "~/components/Products/Rating";

export default defineComponent({
  name: "MyWishlist",
  components: {
    AwLoader,
    SfSelect,
    SfProperty,
    LazyHydrate,
    ShareButton,
    SelectPagination,
    AwSelect,
    AwSelectOption,
    AwButton,
    AwRating,
    AuthorEdition,
    onSSR,
    PrevArrow,
    NextArrow,
    Rating
  },
  props: {
    scoreRating: {
      type: Number,
      default: 0,
    },
  },
  
  setup() {
    const {
      product,
      id,
    } = productData();
    const { load, loading, wishlist, removeItem } =
      useWishlist("MyWishlistPage");
    const route = useRoute();
    const {
      query: { page, itemsPerPage },
    } = route.value;
    const router = useRouter();
    const th = useUiHelpers();
    const uiState = useUiState();
    const { toggleFilterSidebar, getSlugLink } = useUiState();

    const {
      addItem: addItemToCartBase,
      isInCart,
    } = useCart();
    const {
      reviews: productReviews,
      search: searchReviews,
      loading: reviewsLoading,
      addReview,
    } = useReview(`productReviews-${id}`);

    const products = computed(() => wishlistGetters.getProducts(wishlist.value));
    const pagination = computed(() => wishlistGetters.getPagination(wishlist.value[0]));
    const totalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));
    const productsku = computed(() => product.value.sku?.html || "");
     const baseReviews = computed(() => (Array.isArray(productReviews.value)
      ? [...productReviews.value].shift()
      : productReviews.value));
    const averageRating = computed(() => reviewGetters.getAverageRating(baseReviews.value));

    const { path, result: routeData, search: resolveUrl } = useUrlResolver();
    const { result } = useFacet(`facetId:${path}`);

    const addItemToCart = async ({ product, quantity }) => {
      // eslint-disable-next-line no-underscore-dangle
      const productType = product.__typename;

      switch (productType) {
        case "SimpleProduct":
          await addItemToCartBase({
            product,
            quantity,
          });
          break;
        case "BundleProduct":
        case "ConfigurableProduct":
          await router.push(
            `/p/${productGetters.getProductSku(
              product
            )}${productGetters.getSlug(product, product.categories[0])}`
          );
          break;
        default:
          throw new Error(
            `Product Type ${productType} not supported in add to cart yet`
          );
      }
    };

    const removeItemFromWishlist = async (product) => {
      await removeItem({ product });
    };

      onMounted( () => {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://static.addtoany.com/menu/page.js')
      document.head.appendChild(recaptchaScript)
    });


    onSSR(async () => {
      await load({
        searchParams: {
          currentPage: Number.parseInt(page, 10) || 1,
          pageSize: Number.parseInt(itemsPerPage, 10) || 10,
        },
      });
    });
    const rangeOfItemsShown = computed(() => {
      const { currentPage, itemsPerPage } = pagination.value;

      const startRange = currentPage * itemsPerPage - itemsPerPage + 1;
      const endRange = currentPage * itemsPerPage;

      return `${startRange}-${endRange>pagination.value.totalItems ? pagination.value.totalItems : endRange}`;
    });

    const alchemiaVisible = ref(false);
    const previewPic = ref("");

    const toggleAlchemia = (img) => {
      previewPic.value = img;
      alchemiaVisible.value = !alchemiaVisible.value;
    };

    const redirectToDetailPage = (product) => {
      const link = getSlugLink(product);
      router.push({ path: link });
    };

    return {
      ...uiState,
      addItemToCart,
      removeItemFromWishlist,
      isInCart,
      loading,
      pagination,
      productGetters,
      products,
      th,
      wishlist,
      rangeOfItemsShown,
      toggleAlchemia,
      alchemiaVisible,
      redirectToDetailPage,
      totalItems,
      averageRating,
      reviewGetters,
      productReviews,
      previewPic
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  border: 1px solid transparent;
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid transparent;
    border-width: 0 1px 0 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }

  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }

  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }

  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }

    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }

    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }

  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0 0 0 41px;
    @media all and (max-width: 1300px) {
      margin-left: 10px;
    }
  }

  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }

  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin-right: 40px;
      order: 0;
    }

    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;

      &:last-child {
        margin: 0;
      }
    }

    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}

.sort-by {
  flex: unset;
  width: 11.875rem;
}
.block-title {
  margin-bottom: 20px;
}

.category-wrap.listcat-vw {
  margin-bottom: 20px;
  display: flex;
  @media (max-width: 991px) { 
    width: 100%;
  }
}

.category-img.mob-lt-hide {
  display: block;
  @media (max-width: 991px) { 
    width: 136px;
  }
  .img-wrap {
    max-height: 190px;
    max-width: 190px;
    height: 100%;
    width: 100%;

      img {
        max-height: 150px;
        max-width: 150px;
        width: 100%;
        height: auto;
        object-fit: contain;
      }
  }
}

.wishlist-wrap.remove-wishlist {
  margin-bottom: 9px;
  margin-left: -6px;
}

.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }

  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }

  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }

  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }

    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }

    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }

  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }

  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }

    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
    @media all and (max-width: 1300px) {
      margin: 0 10px 0 10px;
    }
  }

  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }

  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }

    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;

      &:last-child {
        margin: 0;
      }
    }

    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}

.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }

  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }

  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }

  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }

  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }

  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }

  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;

    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}

.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
.page-select {
  display: block !important;
}

.filter-btn {
  @media all and (max-width: 991px) {
    display: none;
  }
}
.products__show-on-page {
  display: block !important;
}
.alchemia-show {
  display: block;
  .close-icn {
    max-width: 80px;
    width: 100%;
  }
  .see-preview-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 496px;
    height: 496px;
  }
}
.alchemia-hide {
  display: none;
}
.shipping-popup.watchvideo-popup {
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
    padding-left: 0 !important;
    @media (min-width: 1200px) {
      top: 8px;
      right: 55px;
    }
  }
}
.subtitle {
  margin-bottom: 20px;
}

p.desc {
  color: #2C354E;
  font-family: "leksa-sans",sans-serif;
}
.btn-shopping {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 40px;
}
.category-details {
  padding-left: 8px;
   @media (max-width: 991px) {
      width: calc(100% - 144px);
   }
   .category-left {
     @media (max-width: 991px) {
      margin-bottom: 0;
    }
    .rating {
      @media (max-width: 991px) {
        margin-bottom: 5px;
      }
    }
   }
}
.category-details .category-right, .category-details .rating, .category-details .category-info, .category-details .price-wrap, .category-details .category-name {
  display: block;
}
.category-name {
  @media (max-width: 991px) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  }
}
.category-info {
  @media (max-width: 991px) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  }
}
.empty-wishlist {
  @media (max-width: 767px) {
    margin-top: 30px;
  }
}
.items-select {
  @media (max-width: 991px) {
    margin-left: 10px;
  }
}
.sort-wrap {
  display: block !important;
}
.next-page.btn-wrap.next,
.prev-page.btn-wrap.prev {
  background: transparent !important;
  transform: unset !important;
}

.category-filter.mt-4.d-lg-none {
  .filter-wrap {
  @media (max-width: 991px) {
    display: block !important;
   }
  }
  .items-select:after {
    background: transparent;
  }
}

</style>