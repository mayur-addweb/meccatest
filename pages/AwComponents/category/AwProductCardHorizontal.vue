<template>
<div>
  <div class="category-wrap listcat-vw">
    <badge :price="price" :stockStatus="stockStatus" :stockLeft="stockLeft" :is_bestseller="is_bestseller" :latest="getHomeLatest" :product="product"></badge>
    <div
      class="category-img mob-lt-hide var-hor-category-img"
      :class="
        $route.path.includes('kids')
          ? 'kidsbg' + (Math.floor(Math.random() * 8) + 1)
          : 'slider-img-bg'
      "
    >
      <slot
        name="image"
        v-bind="{ image, title, link, imageHeight, imageWidth }"
        class="img-wrap vs-hr-imgwrap"
      >
        <AwLink
          :link="link"
          class="
            sf-product-card-horizontal__link
            sf-product-card-horizontal__link--image
          "
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
        </AwLink>
      </slot>
      <div class="cat-card-links">
        <AwButton
          :link="link"
          v-on="$listeners"
          class="btn d-flex view-btn align-items-center justify-content-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.5 16.2987C12.6421 16.2987 16 12.9408 16 8.79871C16 4.65657 12.6421 1.29871 8.5 1.29871C4.35786 1.29871 1 4.65657 1 8.79871C1 12.9408 4.35786 16.2987 8.5 16.2987Z"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M18.9998 19.2988L13.7998 14.0988"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span class="btn-txt text-uppercase">view</span>
        </AwButton>
        <AwButton
          class="
            btn
            wishlist-btn
            d-flex
            align-items-center
            justify-content-center
          "
          :aria-label="`${ariaLabel} ${title}`"
          @click="toggleIsInWishlist"
          :class="isInWishlistIcon"
        >
          <slot name="wishlist-icon" v-bind="{ currentWishlistIcon }">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 19.2987L8 14.2987L1 19.2987V3.29871C1 2.19414 1.89543 1.29871 3 1.29871H13C14.1046 1.29871 15 2.19414 15 3.29871V19.2987Z"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span class="btn-txt text-uppercase">wishlist</span>
          </slot>
        </AwButton>
      </div>
    </div>
    <div class="category-details">
      <div class="category-left">
        <div class="sf-product-card-horizontal__details">
          <slot name="title" v-bind="{ title, link }">
            <AwLink :link="link" class="sf-product-card-horizontal__link">
              <h3 class="category-name">
                {{ title }}
              </h3>
            </AwLink>
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
          <slot name="rating"> </slot>
          <slot name="reviews" v-bind="{ maxRating, scoreRating }">
            <div
              :class="{ 'display-none': !scoreRating }"
              class="sf-product-card-horizontal__reviews"
            >
              <SfRating
                v-if="typeof scoreRating === 'number'"
                class="sf-product-card-horizontal__rating"
                :max="maxRating"
                :score="scoreRating"
              />
              <AwButton
                :class="{ 'display-none': !reviewsCount }"
                :aria-label="`Read ${reviewsCount} reviews about ${title}`"
                class="
                  sf-button--pure
                  sf-product-card-horizontal__reviews-count
                "
                href="#"
                @click="$emit('click:reviews')"
              >
                ({{ reviewsCount }})
              </AwButton>
            </div>
          </slot>
          <slot name="description">
            <p class="product-list-sortdesc">
              {{ description }}
            </p>
          </slot>
        </div>
      </div>
      <div class="category-right">
        <div class="preview-wrap">
          <a @click="toggleAlchemia">
            <i class="icon-search"></i>
            <span class="text">See preview</span>
          </a>
          <section :class="alchemiaVisible ? 'alchemia-show' : 'alchemia-hide'">
            <div class="popup-overlay active d-none d-md-block">
              <div class="signin-popup shipping-popup watchvideo-popup">
                <button @click="toggleAlchemia" href="#!" class="close-icn">
                  <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
                </button>
                <img class="see-preview-img" :src="image" :alt="title">
              </div>
            </div>
          </section>
        </div>

        <div class="wishlist-wrap">
          <AwButton
            :aria-label="`${ariaLabel} ${title}`"
            @click="toggleIsInWishlist"
            :class="isInWishlist ? 'sf-button--text activeSideList' : 'sf-button--text'"
          >
            <svg data-v-26d37bd6="" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-26d37bd6="" fill-rule="evenodd" clip-rule="evenodd" d="M15 19.2987L8 14.2987L1 19.2987V3.29871C1 2.19414 1.89543 1.29871 3 1.29871H13C14.1046 1.29871 15 2.19414 15 3.29871V19.2987Z" stroke="#C6B075" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span class="wishlist-txt text">{{isInWishlist? 'Remove from wishlist':'Add to wishlist'}}</span>
          </AwButton>
        </div>
        <ShareButton />
      </div>
    </div>
  </div>
<slot name="description">
  <p class="product-list-sortdesc mob">
    {{ description }}
  </p>
</slot>
</div>
</template>
<script>
import {
  SfImage,
  SfPrice,
  SfRating,
  SfButton,
  SfIcon,
} from "@storefront-ui/vue";
import AwIcon from "../atoms/AwIcon.vue";
import AwButton from "../atoms/AwButton.vue";
import AwLink from "../atoms/AwLink.vue";
import Badge from "~/components/Products/Badge";
import ShareButton from "~/pages/product-detail/ShareButton.vue";

export default {
  name: "SfProductCardHorizontal",
  components: {
    SfPrice,
    SfRating,
    SfImage,
    AwIcon,
    AwLink,
    AwButton,
    SfButton,
    SfIcon,
    // SfAddToCart,
    Badge,
    ShareButton
  },
  props: {
    description: {
      type: String,
      default: "",
    },
    image: {
      type: [Array, Object, String],
      default: "",
    },
    imageWidth: {
      type: [String, Number],
      default: 140,
    },
    imageHeight: {
      type: [String, Number],
      default: 200,
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
     * @deprecated will be removed. Use slot to replace content
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
      default: "heart_fill",
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    qty: {
      type: [Number, String],
      default: 1,
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
    is_bestseller: {
      default: null,
    },
    product: {
      default: null,
    },
    price: {
      default: null,
    }
  },
  data() {
    return {
      quantity: this.qty,
      alchemiaVisible: false,
      // productPlaceholder,
    };
  },
  computed: {
    currentWishlistIcon() {
      return this.isInWishlist ? this.isInWishlistIcon : this.wishlistIcon;
    },
    ariaLabel() {
      return this.isInWishlist ? "Remove from wishlist" : "Add to wishlist";
    },
    wishlistIconClasses() {
      const defaultClass = "sf-product-card-horizontal__wishlist-icon";
      return `${defaultClass} ${
        this.isOnWishlist ? "sf-product-card-horizontal--on-wishlist" : ""
      }`;
    },
    itemQuantity: {
      get() {
        return typeof this.quantity === "string"
          ? Number(this.quantity)
          : this.quantity;
      },
      set(newValue) {
        this.quantity = newValue;
      },
    },
  },
  methods: {
    toggleIsInWishlist() {
      this.$emit("click:wishlist", !this.isInWishlist);
    },
    toggleAlchemia() {
      this.alchemiaVisible = !this.alchemiaVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.var-hor-category-img {
  height: 295px !important;
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

.active {
  svg {
    fill: #ffffff;
  }
}

.activeSideList {
  svg {
    fill: #C6B075;
  }
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

.product-list-sortdesc {
    color: #4B4C4D;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    white-space: initial;
    display: -webkit-box !important;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

.category-wrap.listcat-vw {
  @media all and (max-width: 767px) {
    display: flex;
    margin-bottom: 0;
  }
}

.categories .listcat-vw .mob-lt-hide {
  display: flex;
  align-items: center;
  justify-content: center;
}
 .category-details .rating, .category-details .category-info, .category-details .price-wrap, .category-details .category-name {
   display: block;
 }


  .category-img.mob-lt-hide.var-hor-category-img.slider-img-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 263px;
    max-width: 263px;
    width: 100%;
    @media all and (max-width: 767px) {
        margin-bottom: 0 !important;
        height: 136px;
        max-width: 136px;
    }
}
 .category-details {
   @media all and (max-width: 767px) {
    margin-left: 8px;
   }
    .product-list-sortdesc{
      @media all and (max-width: 767px) {
          display: none !important;
      }
    }
  }

 .product-list-sortdesc.mob {
    display: none !important;

   @media all and (max-width: 767px) {
   margin-bottom: 60px;
   display: block;
   margin-top: 15px;
   overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    white-space: initial;
    display: -webkit-box !important;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
   }
 }

 a.sf-button--text {
   margin-left: 3px;
   padding-left: 0;
 }
</style>
