<template>
    <!--Page Wrapper Start-->
    <div class="wrapper">
      <!-- checkout-delivery popup Start	 -->
      <div class="popup-overlay active">
        <div class="signin-popup shipping-popup delivery-popup">
          <button type="button" @click="toggleCheckoutModal" class="close-icn" style="opacity: 0">
            <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
          </button>
          <div
            class="
              text-center
              d-md-flex
              justify-content-between
              align-items-center
            "
          >
            <a href="#!" class="logo">
              <img src="/meccabook/logo.svg" alt="logo" title="logo" />
            </a>
            <div class="code-price d-flex align-items-center">
              <span @click="toggleCheckoutModal" class="apply-txt">Apply code</span>
              <div class="cart-drpdwn">
                <i class="cart-icn"
                  ><img src="/meccabook/icon-cart.svg" alt="icon"
                /></i>
                <select>
                  <option>${{ !donationValue ? parseFloat(totals.total) : parseFloat(donationAmount) + parseFloat(mainTotal) }}</option>
                </select>
              </div>
            </div>
          </div>
          <ul class="steps-list d-flex justify-content-between">
            <li :class="shippingClass()">1. Shipping</li>
            <li :class="deliveryClass()">2. Delivery</li>
            <!-- <li :class="billingClass()">3. Billing</li> -->
            <li :class="paymentClass()">3. Payment</li>
          </ul>

          <VsfShipping v-if="checkoutstep === 1" />
          <Delivery v-if="checkoutstep === 2" />
          <!-- <Billing v-if="checkoutstep === 3" /> -->
          <Payment v-if="checkoutstep === 3" />
        </div>
      </div>
      <!-- checkout-delivery popup End -->
    </div>
    <!--Page Wrapper End-->
</template>

<script>
import { useUiState } from "~/composables";
import Shipping from "./Shipping.vue";
import Delivery from "./Delivery.vue";
import Payment from "./Payment.vue";
import VsfShipping from "./VsfShipping.vue";
import Billing from "./Billing.vue";
import {
  cartGetters,
  useCart,
} from "@vue-storefront/magento";
import {
  computed,
} from "@nuxtjs/composition-api";
export default {
    components: {
        Shipping,
        Delivery,
        Payment,
        VsfShipping,
        Billing
    },
    data() {
        return {
            selectedValue: 'shipping',
            donationValue: false,
            donationAmount: null
        }
    },
    props: {
      mainTotal: {
        type: Number,
        default: null
      }
    },
    mounted() {

    if(localStorage.getItem('donationAmount') != null) {
      this.donationValue = true;
      this.donationAmount = parseFloat(localStorage.getItem('donationAmount'));
    }

    },
    methods: {
        selectEvent(val) {
            this.selectedValue = val;
        },
        shippingClass() {
            if(this.checkoutstep == 1){
                return 'active';
            }
            else {
              return 'checked';
            }
        },
        deliveryClass() {
            if(this.checkoutstep == 2){
                return 'active';
            }
            else if (this.checkoutstep > 2) {
              return 'checked';
            }
        },
        billingClass() {
            if(this.checkoutstep == 4){
                return 'active';
            }
            else if (this.checkoutstep > 4) {
              return 'checked';
            }
        },
        paymentClass() {
            if(this.checkoutstep == 3){
                return 'active';
            }
        },
    },
    setup() {
    const {  toggleCheckoutModal, checkoutstep, changeStep } = useUiState();
    const {
      cart,
      load: loadCart,
      loading,
    } = useCart();
    const selectedShippingMethod = computed(() =>
      cartGetters.getSelectedShippingMethod(cart.value)
    );
    const totals = computed(() => cartGetters.getTotals(cart.value));
    return {
        toggleCheckoutModal,
        checkoutstep,
        changeStep,
        totals,
        selectedShippingMethod
    }
    }
}
</script>

<style scoped>
.appear {
    display: none;
}
.not-appear {
    display: block;
}
</style>
