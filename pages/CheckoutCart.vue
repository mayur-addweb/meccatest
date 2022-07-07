<template>
  <div class="wrapper-blog">
    <div class="contact product-page">
      <div class="breadcrumb-sec d-none d-md-block">
        <div class="container">
          <div class="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">Home</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </div>
        </div>
      </div>
      <section class="checkout-sec">
        <div class="container">
          <h2 class="checkout-title">Cart</h2>
          <div class="d-md-flex justify-content-between">
            <div class="cart-wrapper d-block">
              <div
                class="product-head d-none d-md-flex justify-content-between"
              >
                <ul class="list-left">
                  <li class="item">Item</li>
                </ul>
                <ul class="list-right d-flex justify-content-between">
                  <li class="price">Price</li>
                  <li class="qty">Qty</li>
                  <li class="total">Total</li>
                </ul>
              </div>

              <div class="cart-preview">
                <div
                  class="
                    check
                    cart-item
                    d-flex
                    justify-content-between
                    align-items-start
                  "
                  v-for="product in products"
                  :key="cartGetters.getItemSku(product)"
                >
                  <div class="view-item" style="background-image: url()">
                    <div class="img-wrp">
                      <img
                        :src="cartGetters.getItemImage(product)"
                        alt="cart"
                      />
                    </div>
                  </div>
                  <div class="desc-item d-md-flex">
                    <div class="d-wrp1">
                      <h4 class="item-title">
                        {{ cartGetters.getItemName(product) }}
                      </h4>
                      <p v-if="product.__typename == 'ConfigurableCartItem' " class="item-exp">{{ product.configurable_options[0].value_label }}</p>
                      <p class="sku-txt">SKU: {{ cartGetters.getItemSku(product) }}</p>
                      <span v-if="product.product.stock_status == 'IN_STOCK' " class="instock">In Stock</span>
                      <span v-else class="instock">Out of Stock</span>
                    </div>
                    <div
                      class="
                        d-wrp2 d-md-flex
                        align-items-start
                        justify-content-between
                      "
                    >
                      <div class="item-prices">
                        <span>{{
                          $n(
                            cartGetters.getItemPrice(product).regular/cartGetters.getItemQty(product),
                            "currency"
                          )
                        }}</span>
                      </div>
                      <div class="included d-md-flex align-items-center">
                        <AwQuantitySelector
                          :disabled="loading"
                          :qty="cartGetters.getItemQty(product)"
                          @input="updateItemQty({ product, quantity: $event })"
                        />
                        <div class="orig-price">
                          <span
                            >{{
                              $n(
                                cartGetters.getItemPrice(product).regular,
                                "currency"
                              )
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
                </div>
              </div>
            </div>
            <form class="checkout-summary">
              <h4 class="summary-title">Total</h4>
              <div class="sub-total d-flex justify-content-between">
                <span
                  >Subtotal <sub>({{ totalItems }} items)</sub></span
                >
                <span>{{ $n(productPriceTotal, "currency") }}</span>
              </div>
              <div
                class="
                  sub-total
                  estimate
                  d-flex
                  align-items-start
                  justify-content-between
                "
              >
                <span>Estimated Shipping</span>
                
                <span>${{getEasyShipAmount}}</span>
              </div>
              <div class="post-code">
                <div
                  class="
                    input-wrap
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ZIP / Postcode"
                    v-model="postcode"
                  />
                  <button
                    type="button"
                    class="promo-code__button btn d-flex align-items-center"
                    @click="()=>addEasyShip(isAuthenticated)"
                  >
                    <span> Apply </span>
                  </button>
                  <span class="post-txt text-right"
                    >Actual shipping cost will be calculated at checkout</span
                  >
                </div>
              </div>
              <div
                class="
                  sub-total
                  coupon
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <span>Coupon</span>
                <span>{{ $n(discountsAmount, "currency") }}</span>
              </div>
              <div class="post-code">
                <CouponCode />
              </div>
              <div
                class="
                  sub-total
                  tax-rw
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <span>Tax</span>
                <span>{{ $n((totals.subtotal-productPriceTotal), "currency") }}</span>
              </div>
              <p class="frm-desc">
                Mecca Books <strong>donates 2% of all sales</strong> to
                <a href="#!">organizations</a> that help improve the minds and
                lives through Islamic scholarship and education.
              </p>
              <div class="donation-checked">
                <div
                  class="
                    sub-total
                    verify-check
                    d-flex
                    align-items-start
                    justify-content-between
                  "
                >
                  <p class="frm-desc">
                    Would you like to include an extra donation towards these
                    organizations?
                  </p>
                  <div class="input-wrap d-flex justify-content-between">
                    <input v-model="donationValue" type="checkbox" :value="donationValue" id="checkId" class="form-control" />
                    <label for="checkId">YES</label>
                  </div>
                </div>
                <div v-if="donationValue"
                  class="
                    sub-total
                    ext-donation
                    d-flex
                    align-items-start
                    justify-content-between
                  "
                >
                  <span>Your extra donation</span>
                  <select v-model="donationAmount">
                    <option value="5">$5</option>
                    <option value="10">$10</option>
                    <option value="15">$15</option>
                  </select>

                </div>
              </div>

              <div
                class="
                  sub-total
                  total-price
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <span>Total Price</span>
                <span>${{donationValue ? ( parseFloat(donationAmount) + parseFloat(mainTotal) ).toFixed(2) :  mainTotal}}</span>
              </div>
              <button
                type="button"
                @click="goToCheckout"
                class="btn checkout-btn"
              >
                <span>go to checkout</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <Stepbaar :mainTotal="mainTotal" v-if="isCheckoutPopup" />
      </section>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref
} from "@nuxtjs/composition-api";
import {
  useCart,
  useUser,
  cartGetters,
} from "@vue-storefront/magento";
import { onSSR } from "@vue-storefront/core";
import { useUiState } from "~/composables";
import CouponCode from "../components/CouponCode.vue";
import Stepbaar from "./AWcheckout/Stepbaar.vue";
import getShippingMethodPrice from "~/helpers/checkout/getShippingMethodPrice";
import AwQuantitySelector from '../pages/AwComponents/molecules/AwQuantitySelector.vue'
import axios from "axios";

export default defineComponent({
  name: "CartSidebar",
  components: {
    AwQuantitySelector,
    CouponCode,
    Stepbaar,
  },
  data() {
    return {
      donationValue: false,
      donationAmount: 5,
      postcode: '',
      easyShipAmount: 0,
    }
  },
  mounted() {

    if(localStorage.getItem('donationAmount') != null) {
      // this.donationValue = true;
      this.donationAmount = parseFloat(localStorage.getItem('donationAmount'));
    }

  },
  computed: {
    getEasyShipAmount(){
      return this.easyShipAmount;
    }
  },
  watch: {
    donationValue(newVal, oldVal) {
      let donation = 0;

      if(newVal === true) {
        donation = this.donationAmount;
      }

      this.addDonation(this.cart.id, donation);

    },
    donationAmount(newVal, oldVal) {
      if(newVal != oldVal) {
        this.addDonation(this.cart.id, newVal);
      }
    },
    isAuthenticated(newVal, oldVal) {
      if(newVal === true && this.donationValue === true) {
        this.addDonation(this.cart.id, this.donationAmount);
      }
    }
  },
  setup() {
    const {
      toggleCheckoutModal,
      isCheckoutPopup,
    } = useUiState();
    const {
      cart,
      removeItem,
      updateItemQty,
      load: loadCart,
      loading,
    } = useCart();
    const { user, isAuthenticated } = useUser();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(
      () => -1 * discounts.value.reduce((a, el) => el.value + a, 0)
    );
    const visible = ref(false);
    const productTotalwiithoutTax = ref(0);
    const isLoaderVisible = ref(false);

    const { toggleLoginModal } = useUiState();
    const selectedShippingMethod = computed(() =>
      cartGetters.getSelectedShippingMethod(cart.value)
    );

    const productPriceTotal = computed(() => {
      productTotalwiithoutTax.value = 0;
      products.value.map((element) => productTotalwiithoutTax.value += element.prices.row_total.value)
      return productTotalwiithoutTax.value.toFixed(2);
    });

    onSSR(async () => {
      await loadCart();
    });

    const mainTotal = computed (() => {
      if(selectedShippingMethod.value) {
        return (parseFloat(totals.value.subtotal) + parseFloat(getShippingMethodPrice(selectedShippingMethod.value)) + parseFloat(discountsAmount.value));
      }
      else {
        return parseFloat(totals?.value.subtotal) + parseFloat(discountsAmount.value);
      }
    })

    const goToCheckout = async () => {
      if (isAuthenticated.value) {
        toggleCheckoutModal();
      } else {
        toggleLoginModal();
      }
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
      visible,
      isLoaderVisible,
      goToCheckout,
      totals,
      totalItems,
      cartGetters,
      isCheckoutPopup,
      toggleCheckoutModal,
      discountsAmount,
      discounts,
      hasDiscounts,
      getShippingMethodPrice,
      selectedShippingMethod,
      cart,
      user,
      productPriceTotal,
      productTotalwiithoutTax,
      mainTotal
    };
  },
  methods: {
      addDonation(cartID, donation) {
        localStorage.setItem('donationAmount', donation);
        let customer = this.getCustomerCookie();

        axios.get("/addDonation?cart="+ cartID +'&donation='+donation+'&token='+ customer)
            .then(response => {
              console.log(response);
            });
      },
      addEasyShip(isAuth) {
        if(isAuth){
        let customer = this.getCustomerCookie();

        axios.get("/addEasyShip?postcode="+ this.postcode +'&token='+ customer)
            .then(response => {
              this.easyShipAmount = response.data[0].data.amount;
            });
        }
      },
      getCustomerCookie() {
        let n = 'vsf-customer';
        let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
        return a ? a[1] : '';
      }
  }
});
</script>

<style lang="scss" scoped>
.checkout-sec {
  @media all and (min-width: 1300px) {
    padding: 40px 0;
  }
}
.sf-quantity-selector {
  height: inherit;
  background: transparent;
  border: 0.5px solid #4b4c4d;
  box-sizing: border-box;
  width: 85px;
  height: 24px;
}
.amount-add {
  display: flex;
  justify-content: end;
  align-items: center;
  span.amount {
    margin-left: 5px;
  }
}
</style>
