<template>
  <div id="cart">
    <AwSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      class="sf-sidebar--right"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          :name="$t('Total items')"
          :value="totalItems"
        />
      </template>
      <transition name="sf-fade" mode="out-in">
        <div v-if="totalItems" key="my-cart" class="my-cart">
          <div class="preview-head d-flex align-items-center justify-content-between">
            <h2 class="preview-title cart-preview-custom">Cart Preview</h2>
            <span class="arrow-icn">
              <img src="/meccabook/icon-long-arrow-navi.svg" alt=""  @click="toggleCartSidebar">
            </span>
          </div>

          <div
            class="cart-item d-flex  align-items-start cart-product-custom"
            v-for="product in products"
            :key="cartGetters.getItemSku(product)"
          >
            <div class="view-item" style="background-image: url()">
              <div class="img-wrp">
                <img :src="cartGetters.getItemImage(product)" alt="cart" />
              </div>
            </div>
            <div class="desc-item">
              <h4 class="item-title">
                {{ cartGetters.getItemName(product) }}
              </h4>
              <p v-if="product.__typename == 'ConfigurableCartItem' " class="item-exp">{{ product.configurable_options[0].value_label }}</p>
              <div class="item-prices">
                <!-- <del>{{
                  $n(cartGetters.getItemPrice(product).regular, "currency")
                }}</del> -->
                <span>{{
                  $n(cartGetters.getItemPrice(product).regular/cartGetters.getItemQty(product), "currency")
                }}</span>
              </div>
              <div class="included">
                  <AwQuantitySelector
                    :disabled="loading"
                    :qty="cartGetters.getItemQty(product)"
                    @input="updateItemQty({ product, quantity: $event })"
                  />
                <div class="orig-price final-p-price">
                  <span
                    >{{
                      $n(cartGetters.getItemPrice(product).regular, "currency")
                    }}
                  </span>
                </div>
                                  
                <button
                 @click="actionRemoveItem(product)"
                  class="remove-ilnk text-underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div
            class="sub-total d-flex align-items-center justify-content-between"
          >
            <span
              >Subtotal <sub>( {{ totalItems }} items)</sub></span
            >
            <span>{{ $n(productPriceTotal, "currency") }}</span>
          </div>
        </div>
        <div v-else key="empty-cart" class="empty-cart">
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              src="/meccabook/empty-cart1.svg"
            />
            <h2
              title="Your cart is empty"
              :level="2"
              class="subtitle"
              :description="
                $t(
                  'Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.'
                )
              "
            >Your cart is empty</h2>
            <p class="desc p-1">Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.</p>
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <!-- <CouponCode /> -->
            <div class="btn-wrp">
              <nuxt-link
                to="/checkout-cart"
                class="btn CartBtn d-flex align-items-center justify-content-center"
                ><span @click="toggleCartSidebar">continue to cart</span></nuxt-link
              >
              <button @click="toggleCartSidebar" style="width: -webkit-fill-available;"
                class="btn CartBtn close-btn d-flex align-items-center justify-content-center"
                ><img src="/meccabook/icon-long-arrow-right.svg" alt="" />
                <span>close</span></button
              >
            </div>
          </div>
          <div class="btn-wrp" v-else>
            <!-- <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
            >
              {{ $t("Go back shopping") }}
            </SfButton> -->
              <nuxt-link @click="goToCheckout"
                to="/c/categories"
                class="btn CartBtn d-flex align-items-center justify-content-center"
                ><span @click="toggleCartSidebar">Go back shopping</span></nuxt-link
              >
              <button @click="toggleCartSidebar" style="width: -webkit-fill-available;"
              class="btn CartBtn close-btn d-flex align-items-center justify-content-center"
              >
              <img src="/meccabook/icon-long-arrow-right.svg" alt="" />
              <span>close</span></button>
          </div>
        </transition>
      </template>
    </AwSidebar>
  </div>
</template>
<script>
import {
  SfLoader,
  SfNotification,
  // SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  // SfQuantitySelector,
} from "@storefront-ui/vue";
import {
  computed,
  defineComponent,
  ref,
  useRouter,
} from "@nuxtjs/composition-api";
import {
  useCart,
  useUser,
  cartGetters,
  useExternalCheckout,
} from "@vue-storefront/magento";
import { onSSR } from "@vue-storefront/core";
import { useUiState, useUiNotification } from "~/composables";
import CouponCode from "./CouponCode.vue";
import AwSidebar from '../pages/AwComponents/organisms/AwSidebar.vue'
import AwQuantitySelector from '../pages/AwComponents/molecules/AwQuantitySelector.vue'

export default defineComponent({
  watch: {
  },
  name: "CartSidebar",
  components: {
    SfLoader,
    SfNotification,
    AwSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    AwQuantitySelector,
    CouponCode,
  },
  setup() {
    const { initializeCheckout } = useExternalCheckout();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const router = useRouter();
    const {
      cart,
      removeItem,
      updateItemQty,
      load: loadCart,
      loading,
    } = useCart();
    const { isAuthenticated } = useUser();
    const { send: sendNotification, notifications } = useUiNotification();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const getAttributes = (product) => product.configurable_options || [];
    const getBundles = (product) =>
      product.bundle_options?.map((b) => b.values).flat() || [];
    const visible = ref(false);
    const isLoaderVisible = ref(false);
    const tempProduct = ref();
    const productTotalwiithoutTax = ref(0);

    const productPriceTotal = computed(() => {
      productTotalwiithoutTax.value = 0;
      products.value.map((element) => productTotalwiithoutTax.value += element.prices.row_total.value) 
      return productTotalwiithoutTax.value.toFixed(2);
    });

    onSSR(async () => {
      await loadCart();
    });

    const goToCheckout = async () => {
      const redirectUrl = await initializeCheckout({
        baseUrl: "/checkout/user-account",
      });
      await router.push(redirectUrl);
    };
    const actionRemoveItem = async (product) => {
      isLoaderVisible.value = true;

      await removeItem({ product });

      isLoaderVisible.value = false;
      visible.value = false;
    };

    return {
      actionRemoveItem,
      loading,
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      notifications,
      visible,
      isLoaderVisible,
      tempProduct,
      toggleCartSidebar,
      goToCheckout,
      totals,
      totalItems,
      cartGetters,
      getAttributes,
      getBundles,
      productTotalwiithoutTax,
      productPriceTotal
    };
  },
});
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 33333;
  --overlay-z-index: 33333;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
@include for-mobile {
  .close-icon {
    display: none;
  }
}

.close-icon {
  position: fixed;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.notifications {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -350px;
  z-index: 99999;
  .sf-notification {
    padding: 20px;
    .button-wrap {
      margin-top: 15px;
      display: flex;
      column-gap: 15px;
    }
  }
}
.cart-summary {
  margin-top: var(--spacer-xl);
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  @media all and (max-width: 767px){
    padding-right: 3px;
  }

  &__total-items {
    margin: 0;
  }

  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
  }
}

.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;

  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  &__heading {
    padding: 0 var(--spacer-base);
  }

  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }

  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}

.collected-product-list {
  flex: 1;
}

.collected-product {
  margin: 0 0 var(--spacer-sm) 0;

  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;

    &:first-child {
      margin-bottom: 8px;
    }
  }

  &__actions {
    transition: opacity 150ms ease-in-out;
  }

  &__save,
  &__compare {
    --button-padding: 0;

    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }

  &__save {
    opacity: var(--cp-save-opacity, 0);
  }

  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }

  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
.preview-head {
  align-items: center !important;
}
.cart-preview-custom {
  font-size: 24px;
  letter-spacing: -0.035em;
  line-height: 1.2;
  color: #2c354e;
  margin-bottom: 0px !important;
  font-family: "leksa",serif;;
}

.cart-item  {
  padding: 20px 0;
  border-bottom: 1px solid #FFFFFF;
}
.desc-item {
  width: calc(100% - 148px);
  padding-top: 3px;
  padding-left: 20px;
  @media all and (max-width: 767px) { 
    padding-left: 8px;
  }
}
.final-p-price {
  margin-left: 10px;
  width: 80px;
  margin-top: 3px;
}
.sf-quantity-selector{
height: inherit;
background: transparent;
border: 0.5px solid #4B4C4D;
box-sizing: border-box;
width: 85px;
height: 24px;
}

.sub-total {
  margin-top: 20px;
}
.included {
  display: flex;
  align-items: start;
  @media all and (max-width: 767px) { 
    display: block;
  }
}
.btn.CartBtn.close-btn {
  width: 100%;
}
.item-prices {
  font-size: 16px;
}
.btn-wrp {
  @media all and (min-width: 992px) {
    width: 380px;
  }
}
</style>
