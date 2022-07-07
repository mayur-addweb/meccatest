<template>
  <div
    class="category-wrap listcat-vw vrt-category"
    :class="{ 'has-colors': colors.length }"
    data-testid="product-card"
  >
    <badge :price="price" :stockStatus="stockStatus" :stockLeft="stockLeft" :is_bestseller="is_bestseller" :latest="getHomeLatest" :product="product"></badge>
    <div class="category-img mob-lt-hide var-hor-category-img"
          :class="$route.path.includes('kids') ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
    >
       <slot
        name="image"
        v-bind="{ image, title, link, imageHeight, imageWidth }"
        class="img-wrap vs-hr-imgwrap"
      >
        <AwButton
          :link="link"
          class="sf-button--pure sf-product-card__link"
          data-testid="product-link"
          aria-label="Go To Product"
          v-on="$listeners"
        >
          <template v-if="Array.isArray(image)">
            <SfImage
              v-for="(picture, key) in image.slice(0, 2)"
              :key="key"
              :src="picture"
              :alt="title"
              :width="imageWidth"
              :height="imageHeight"
            />
          </template>
          <SfImage
            v-else
            :src="image"
            :alt="title"
            :width="imageWidth"
            :height="imageHeight"
          />
        </AwButton>
      </slot>
      <div class="cat-card-links">
         <AwButton
          :link="link"
           v-on="$listeners"
           class="
            btn
            d-flex
            view-btn
            align-items-center
            justify-content-center
          ">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 16.2987C12.6421 16.2987 16 12.9408 16 8.79871C16 4.65657 12.6421 1.29871 8.5 1.29871C4.35786 1.29871 1 4.65657 1 8.79871C1 12.9408 4.35786 16.2987 8.5 16.2987Z" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M18.9998 19.2988L13.7998 14.0988" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span class="btn-txt text-uppercase">view</span>
         </AwButton>
        <AwButton
          class="btn wishlist-btn d-flex align-items-center justify-content-center"
          :aria-label="`${ariaLabel} ${title}`"
          @click="toggleIsInWishlist"
          :class="isInWishlistIcon">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 19.2987L8 14.2987L1 19.2987V3.29871C1 2.19414 1.89543 1.29871 3 1.29871H13C14.1046 1.29871 15 2.19414 15 3.29871V19.2987Z" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span class="btn-txt text-uppercase">wishlist</span>
        </AwButton>
      </div>
       <template :class="{ 'display-none': !showAddToCartButton }">
        <slot
          name="add-to-cart"
          v-bind="{
            isAddedToCart,
            showAddedToCartBadge,
            isAddingToCart,
            title,
          }"
        >
          <SfCircleIcon
            class="sf-product-card__add-button"
            :aria-label="`Add to Cart ${title}`"
            :has-badge="showAddedToCartBadge"
            :disabled="addToCartDisabled"
            data-testid="product-add-icon"
            @click="onAddToCart"
          >
            <span class="sf-product-card__add-button--icons">
              <transition
                v-if="!isAddingToCart && !isAddedToCart"
                name="sf-pulse"
                mode="out-in"
              >
                <slot name="add-to-cart-icon">
                  <AwIcon
                    key="add_to_cart"
                    icon="add_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
              <transition v-else name="sf-pulse" mode="out-in">
                <slot name="adding-to-cart-icon">
                  <AwIcon
                    key="added_to_cart"
                    icon="added_to_cart"
                    size="20px"
                    color="white"
                  />
                </slot>
              </transition>
            </span>
          </SfCircleIcon>
        </slot>
      </template>
    </div>
    <div class="category-details">
      <slot name="title" v-bind="{ title, link }">
        <AwButton
          :link="link"
          data-testid="product-link"
          v-on="$listeners"
        >
          <span class="category-name">
            {{ title }}
          </span>
        </AwButton>
      </slot>
      <slot name="author" v-bind="author">
          <span class="category-info">
            {{ author }}
          </span>
      </slot>
      <slot name="price" v-bind="{ specialPrice, regularPrice }">
        <SfPrice
          :class="{ 'display-none': !regularPrice }"
          class="price-wrap"
          :regular="regularPrice"
          :special="specialPrice"
        />
      </slot>
      <slot name="rating">
      </slot>
    </div>
  </div>
</template>
<script>
import {
SfImage,
SfColorPicker,
SfColor,
SfBadge,
SfPrice,
SfRating,
SfCircleIcon
} from "@storefront-ui/vue";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "../utilities/mobile-observer";
import AwIcon from '../atoms/AwIcon.vue';
import AwButton from '../atoms/AwButton.vue';
import Badge from "~/components/Products/Badge";
export default {
  name: "SfProductCard",
  components: {
    SfPrice,
    SfRating,
    AwIcon,
    SfImage,
    SfCircleIcon,
    SfBadge,
    AwButton,
    SfColorPicker,
    SfColor,
    Badge,
  },
  props: {
    image: {
      type: [Array, Object, String],
      default: "",
    },
    imageWidth: {
      type: [String, Number],
      default: "100%",
    },
    imageHeight: {
      type: [String, Number],
      default: "auto",
    },
    badgeLabel: {
      type: String,
      default: "",
    },
    badgeColor: {
      type: String,
      default: "",
    },
    colors: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    link: {
      type: [String, Object],
      default: null,
    },
    /**
     * Link element tag
     * @deprecated will be removed in 1.0.0 use slot to replace content
     */
    linkTag: {
      type: String,
      default: undefined,
    },
    scoreRating: {
      type: [Number, Boolean],
      default: false,
    },
    reviewsCount: {
      type: [Number, Boolean],
      default: false,
    },
    maxRating: {
      type: [Number, String],
      default: 5,
    },
    regularPrice: {
      type: [Number, String],
      default: null,
    },
    specialPrice: {
      type: [Number, String],
      default: null,
    },
    wishlistIcon: {
      type: [String, Array, Boolean],
      default: "heart",
    },
    isInWishlistIcon: {
      type: [String, Array],
      default: "",
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    showAddToCartButton: {
      type: Boolean,
      default: false,
    },
    isAddedToCart: {
      type: Boolean,
      deafult: false,
    },
    addToCartDisabled: {
      type: Boolean,
      default: false,
    },
    getHomeLatest: {
      type: [String, Object, Array],
      default: null,
    },
    stockStatus: {
      default: null,
    },
    stockLeft: {
      default: null,
    },
    product: {
      default: null,
    },
    price: {
      default: null,
    },
    is_bestseller: {
      default: null,
    }
  },
  data() {
    return {
      isAddingToCart: false,
      openColorPicker: false,
      // productPlaceholder,
    };
  },
  computed: {
    ...mapMobileObserver(),
    isSFColors() {
      return SF_COLORS.includes(this.badgeColor.trim());
    },
    badgeColorClass() {
      return this.isSFColors ? `${this.badgeColor.trim()}` : "";
    },
    currentWishlistIcon() {
      return this.isInWishlist ? this.isInWishlistIcon : this.wishlistIcon;
    },
    showAddedToCartBadge() {
      return !this.isAddingToCart && this.isAddedToCart;
    },
    ariaLabel() {
      return this.isInWishlist ? "Remove from wishlist" : "Add to wishlist";
    },
    wishlistIconClasses() {
      const defaultClass = "sf-button--pure sf-product-card__wishlist-icon";
      return `${defaultClass} ${this.isInWishlist ? "on-wishlist" : ""}`;
    },
    showBadge() {
      return this.colors.length > 5;
    },
  },
  beforeDestroy() {
    unMapMobileObserver();
  },
  methods: {
    toggleIsInWishlist() {
      this.$emit("click:wishlist", !this.isInWishlist);
    },
    onAddToCart(event) {
      event.preventDefault();
      this.isAddingToCart = true;
      setTimeout(() => {
        this.isAddingToCart = false;
      }, 1000);
      this.$emit("click:add-to-cart");
    },
    handleSelectedColor(colorIndex) {
      if (this.colors.length > 0) {
        this.colors.map((color, i) => {
          if (colorIndex === i) {
            this.$emit("click:colors", color);
            if (this.isMobile) {
              this.toggleColorPicker();
            }
          }
        });
      }
    },
    toggleColorPicker() {
      this.openColorPicker = !this.openColorPicker;
    },
  },
};
</script>

<style lang="scss" scoped>
.var-hor-category-img {
  height: 295px !important;
  max-width: 295px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: unset;
  @media all and (max-width: 767px) {
    height: 136px !important;
    max-width: 136px;
  }
}
.top-block.active-grid {
    .vs-hr-imgwrap {
        object-fit: cover;
    }
}
.category-details {
  width: 100%;
  display: block;
  .category-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.active {
  svg {
    fill: #FFFFFF;
  }
}

button.sf-product-card__add-button.sf-circle-icon.sf-button {
  display: none;
}
</style>
