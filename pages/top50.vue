<template>
  <div class="wrapper-blog">
    <section class="banner product-list-banner">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="banner-wrap">
              <h1 class="ban-title capitalize">{{ heading }}</h1>
              <p class="ban-title">
                Mecca Books was formed to provide today’s generation of
                knowledge seekers a place where they can get traditional Islamic
                books.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="categories"
     :style="$route.path.includes('kids') ? 'background-image: url(/meccabook/kids-bg-img.png)' : 'background-image: url()'"
    >
      <div class="container">
        <h1 class="ban-title">{{ heading }}</h1>
        <div class="row">
          <div class="col-12">
            <div class="breadcrumb-wrapper" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{heading}}
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3">
            <div class="left-menu">
              <div class="sidebar" v-if="facets">
                <LazyHydrate when-visible>
                  <CategorySidebarMenu :no-fetch="true" />
                </LazyHydrate>
              </div>
            </div>
          </div>
          <div class="col-xl-9 col-lg-12">
            <div class="filters-wrap">
              <div class="filter-left">
                <div class="view-btns">
                <div class="prev-page">
                  <PrevArrow
                    v-if="!loading"
                    v-show="pagination.totalPages > 1"
                    :current="pagination.currentPage"
                    :total="pagination.totalPages"
                    :visible="5"
                  />

                </div>
                <div class="icon-page">
                  <i
                    ref="catgridview"
                    class="grid-view-icon"
                    :class="isCategoryGridView? 'active':''"
                    @click="changeToCategoryGridView"
                  ></i>
                  <i
                    ref="catlistview"
                    class="list-view-icon"
                    :class="!isCategoryGridView? 'active':''"
                    @click="changeToCategoryListView"
                  ></i>
                </div>
                 <div class="next-page">
                  <NextArrow
                    v-if="!loading"
                    v-show="pagination.totalPages > 1"
                    :current="pagination.currentPage"
                    :total="pagination.totalPages"
                    :visible="5"
                  />
                </div>
                </div>

                <div class="product-show-nav">
                  <div
                    v-show="pagination.totalPages > 1"
                    class="products__show-on-page"
                  >
                    <!-- <div on-interaction class="items-select"> -->
                    <AwSelect
                      :value="pagination.itemsPerPage.toString()"
                      class="items-select"
                      @input="th.changeItemsPerPage"
                    >
                      <AwSelectOption
                        v-for="option in getShortArray"
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
                  <div class="navbar__sort">
                    <div on-interaction class="items-sort">
                      <AwSelect
                        :value="sortBy.selected"
                        placeholder="Select sorting"
                        @input="th.changeSorting"
                      >
                        <AwSelectOption
                          v-for="option in sortBy.options"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ $t("Sort by") }}
                          {{ $t(option.label) }}
                        </AwSelectOption>
                        
                      </AwSelect>
                    </div>
                  </div>
                </div>
                
                <div class="filter-btn">
                  <AwButton @click="toggleFilterSidebar">
                    <i class="icon-top"></i>
                  </AwButton>
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
            
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import findDeep from "deepdash/findDeep";
import LazyHydrate from "vue-lazy-hydration";
import AwSelect from "./AwComponents/molecules/AwSelect.vue";
import AwSelectOption from "./AwComponents/molecules/AwSelectOption.vue";
import BaseButton from "../components/Button/BaseButton.vue";
import AwPagination from "./AwComponents/molecules/AwPagination.vue";
import AwButton from "./AwComponents/atoms/AwButton.vue";
import AwLoader from "./AwComponents/atoms/AwLoader.vue";
import SelectPagination from "./AwComponents/molecules/SelectPagination.vue";
import AwLink from "./AwComponents/atoms/AwLink.vue";
import ShareButton from "./product-detail/ShareButton.vue";
import AddToWishlist from "~/components/AddToWishlist";
import PrevArrow from "./AwComponents/molecules/PrevArrow.vue";
import NextArrow from "./AwComponents/molecules/NextArrow.vue";
import AwAccordion from './AwComponents/accordion/AwAccordion.vue'
import AwAccordionItem from './AwComponents/accordion/AwAccordionItem.vue'

import {
  SfSidebar,
  SfHeading,
  SfFilter,
  SfRadio,
  SfProductCard,
  SfProductCardHorizontal,
  SfAccordion,
  SfColor,
  SfProperty,
  SfButton
} from "@storefront-ui/vue";
import {
  ref,
  computed,
  defineComponent,
  useRouter,
  useRoute,
  onMounted,
} from "@nuxtjs/composition-api";
import {
  categoryGetters,
  facetGetters,
  productGetters,
  useCategory,
  useFacet,
  useUser,
  useWishlist,
} from "@vue-storefront/magento";
import { onSSR, useVSFContext } from "@vue-storefront/core";
import CategorySidebarMenu from "~/components/Category/CategorySidebarMenu";
import { useUrlResolver } from "~/composables/useUrlResolver.ts";
import { useUiHelpers, useUiState } from "~/composables";
import cacheControl from "~/helpers/cacheControl";
import { useAddToCart } from "~/helpers/cart/addToCart";
import Badge from "~/components/Products/Badge";
import Price from "~/components/Products/Price";
import Rating from "~/components/Products/Rating";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  components: {
    CategorySidebarMenu,
    SfSidebar,
    SfFilter,
    SfRadio,
    SfProductCard,
    SfProductCardHorizontal,
    SfAccordion,
    AwLoader,
    SfColor,
    SfHeading,
    SfProperty,
    LazyHydrate,
    AwButton,
    AwLink,
    AwSelect,
    AwSelectOption,
    BaseButton,
    AwPagination,
    SelectPagination,
    ShareButton,
    AddToWishlist,
    PrevArrow,
    NextArrow,
    Badge,
    Price,
    Rating,
    SfButton,
    AwAccordion,
    AwAccordionItem
  },
  middleware: cacheControl({
    "max-age": 60,
    "stale-when-revalidate": 5,
  }),
  transition: "fade",

  data(){
    return {
      heading: (this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)).replaceAll('-',' '),
      latestProducts: null,
    }
  },

  computed: {
    ...mapGetters("drupalcms", [
      "getHomeLatest",
      "getShortArray",
    ]),
  },
  methods: {
    ...mapActions("drupalcms", [
      "fetchHomeLatest",
    ]),
  },
  mounted() {

    this.fetchHomeLatest();
    
    // this.fetchHomeLatest().then(function(result){
    //     that.latestProducts = result;
    // });
  },

  setup() {
    const th = useUiHelpers();
    const uiState = useUiState();
    const { path, result: routeData, search: resolveUrl } = useUrlResolver();
    const router = useRouter();
    const route = useRoute();
    const {
      $magento: { config: magentoConfig },
    } = useVSFContext();
    const { isAuthenticated } = useUser();

    const { isInWishlist } = useWishlist();

    const { result, search, loading } = useFacet(`facetId:${path}`);
    const { changeFilters, isFacetColor } = useUiHelpers();
    const { toggleFilterSidebar, getSlugLink } = useUiState();
    const {
      categories,
      search: categoriesSearch,
      loading: categoriesLoading,
    } = useCategory(`categoryList:${path}`);
    const { addItemToCart, isInCart } = useAddToCart();

    const selectedFilters = ref(
      Object.fromEntries(
        magentoConfig.facets.available.map((curr) => [
          curr,
          curr === "price" ? "" : [],
        ])
      )
    );
    console.log(result);
    const products = computed(() => facetGetters.getProducts(result.value));

    const categoryTree = computed(() =>
      categoryGetters.getCategoryTree(
        categories.value?.[0],
        routeData.value?.entity_uid,
        false
      )
    );
    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs(result.value)
    );
    const sortBy = computed(() => facetGetters.getSortOptions(result.value));
    const facets = computed(() =>
      facetGetters.getGrouped(result.value, magentoConfig.facets.available)
    );

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const activeCategory = computed(() => {
      const items = categoryTree.value?.items;

      if (!items) {
        return "";
      }

      const category = items.find(
        (cat) => cat.isCurrent || cat.items.find((c) => c.isCurrent)
      );

      return category?.label || items[0]?.label;
    });

    const activeCategoryUid = (categoryUid) => {
      const items = categoryTree.value?.items;

      if (!items) {
        return "";
      }

      const categoryDeep = findDeep(
        categoryTree.value?.items,
        (value, key, parentValue, _deepCtx) => {
          const hasUid = key === "0" && value && Array.isArray(parentValue);

          return hasUid ? value === categoryUid : false;
        }
      );

      const categoryUidResult =
        categoryDeep?.parent && categoryDeep?.parent.length === 1
          ? categoryDeep?.parent[0]
          : categoryDeep?.parent;

      return categoryUidResult || items[0]?.uid;
    };

    const isFilterSelected = (facet, option) => {
      if (facet.id === "price") {
        return selectedFilters.value[facet.id];
      }
      return (selectedFilters.value[facet.id] || []).includes(option.value);
    };

    const selectFilter = (facet, option) => {
      if (facet.id === "price") {
        selectedFilters.value[facet.id] = option.value;
        return;
      }

      if (!selectedFilters.value[facet.id]) {
        selectedFilters.value[facet.id] = [];
      }

      if (selectedFilters.value[facet.id].find((f) => f === option.value)) {
        selectedFilters.value[facet.id] = selectedFilters.value[
          facet.id
        ]?.filter((f) => f !== option.value);

        return;
      }

      selectedFilters.value[facet.id].push(option.value);
    };

    const applyFilters = (filters) => {
      toggleFilterSidebar();

      if (filters) {
        selectedFilters.value = filters;
      }

      changeFilters(selectedFilters.value);
    };

    const addItemToWishlist = async (product) => {
      await (isInWishlist({ product })
        ? removeItemFromWishlist({ product })
        : addItemToWishlistBase({ product }));
    };

    const searchCategoryProduct = async () => {
      const categoryId = activeCategoryUid(routeData.value?.entity_uid)
        ? activeCategoryUid(routeData.value?.entity_uid)
        : routeData.value?.entity_uid;
      await search({
        ...th.getFacetsFromURL(),
        categoryId,
      });
    };

    // onMounted(() => {
    //   if (route.value.params.slug_1 === "kids") {
    //     document.body.classList.add("kids-route");
    //   }
    // });

    onSSR(async () => {
    //   await resolveUrl();

      await categoriesSearch({
        pageSize: 20,
      });

    //   if (routeData?.value) {
    //     if (facets.value && facets.value.length > 0) {
    //       selectedFilters.value = facets.value?.reduce(
    //         (prev, curr) =>
    //           curr.id === "price"
    //             ? {
    //                 ...prev,
    //                 [curr.id]: curr.options.find((o) => o.selected)?.value,
    //               }
    //             : {
    //                 ...prev,
    //                 [curr.id]: curr.options
    //                   ?.filter((o) => o.selected)
    //                   ?.map((o) => o.value),
    //               },
    //         {}
    //       );
    //     }

    //     await searchCategoryProduct();
    //   }
    });

    const rangeOfItemsShown = computed(() => {
      const { currentPage, itemsPerPage } = pagination.value;

      const startRange = currentPage * itemsPerPage - itemsPerPage + 1;
      const endRange = currentPage * itemsPerPage;

      return `${startRange}-${endRange}`;
    });

    const redirectToDetailPage = (product) => {
      const link = getSlugLink(product);
      router.push({ path: link });
    };

    const alchemiaVisible = ref(false);

    const toggleAlchemia = () => {
      alchemiaVisible.value = !alchemiaVisible.value;
    };

    const { addItem } = useWishlist();
    const { toggleLoginModal } = useUiState();

    return {
      routeData,
      ...uiState,
      activeCategory,
      addItemToCart,
      addItemToWishlist,
      applyFilters,
      breadcrumbs,
      categories,
      categoriesLoading,
      categoryTree,
      facets,
      isAuthenticated,
      isFacetColor,
      isFilterSelected,
      isInCart,
      isInWishlist,
      loading,
      pagination,
      productGetters,
      products,
      selectedFilters,
      selectFilter,
      sortBy,
      th,
      rangeOfItemsShown,
      redirectToDetailPage,
      alchemiaVisible,
      toggleAlchemia,
      addItem,
      toggleLoginModal
    };
  },
});
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
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

.main {
  display: flex;
}

.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
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

  &--categories {
    @include for-desktop {
      margin-top: 3.75rem;
    }
  }
}
.categories {
  h1.ban-title {
    display: block;
    margin-bottom: 18px;
    @media all and (min-width: 992px) {
      display: none;
    }
  }
}

::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.sf-select__dropdown {
  margin-bottom: 0 !important;
}
.sf-select {
  padding: 0 !important;
}

.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;

    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }

  &__colors {
    display: flex;
  }

  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }

  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }

  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);

    &:last-child {
      border-bottom: 0;
    }

    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }

  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }

  &__buttons {
    margin: var(--spacer-sm) 0;
  }

  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
.left-menu {
  @media all and (max-width: 1199px) {
    display: none;
  }
}
.filter-btn {
  @media all and (max-width: 991px) {
    display: none;
  }
}

.var-hor-category-img {
  height: 300px !important;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: unset;
  @media all and (max-width: 767px) {
    height: 136px !important;
    max-width: 136px;
  }
}

.vs-hr-imgwrap {
  object-fit: cover;
  img {
    max-width: 232px;
    max-height: unset;
    height: 232px;
    // height: 100%;
    width: 100%;
    object-fit: contain;
  @media all and (max-width: 767px) {
    height: 106px !important;
    max-width: 106px;
  }
  }
}
.category-details {
  width: 100%;
}

.alchemia-show {
  display: block;
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
.popup-overlay {
  background: #9e9fa21c;
}
.capitalize {
    text-transform: capitalize;
}
</style>
