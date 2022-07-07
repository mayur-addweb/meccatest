<template>
  <div>

     <template v-if="stripeElement == true">

      <div class="address-form payment-form">
            <stripe-element-payment
              ref="paymentRef"
              :pk="pk"
              class="fields-wrap"
              :elements-options="elementsOptions"
              :confirm-params="confirmParams"
            />
      </div>
      <SfButton
          type="button"
          class="btn larg-btn text-uppercase"
          @click="payNow()"
        >
          <span>{{ $t('CONFIRM PURCHASE') }} </span>
      </SfButton>
    </template>
    <template v-else>
          <SfHeading
            :level="3"
            class="sf-heading--left sf-heading--no-underline title"
          />
          <SfTable class="sf-table--bordered table desktop-only">
            <SfTableHeading class="table__row">
              <SfTableHeader class="table__header table__image">
                {{ $t('Item') }}
              </SfTableHeader>
              <SfTableHeader
                v-for="tableHeader in tableHeaders"
                :key="tableHeader"
                class="table__header"
                :class="{ table__description: tableHeader === 'Description' }"
              >
                {{ tableHeader }}
              </SfTableHeader>
            </SfTableHeading>
            <SfTableRow
              v-for="(product, index) in products"
              :key="index"
              class="table__row"
            >
              <SfTableData class="table__image">
                <SfImage
                  :src="cartGetters.getItemImage(product)"
                  :alt="cartGetters.getItemName(product)"
                />
              </SfTableData>
              <SfTableData class="table__data table__description table__data">
                <div class="product-title">
                  {{ cartGetters.getItemName(product) }}
                </div>
                <div class="product-sku">
                  {{ cartGetters.getItemSku(product) }}
                </div>
                <template
                  v-if="getAttributes(product).length > 0"
                >
                  <p
                    v-for="attr in getAttributes(product)"
                    :key="attr.option_label"
                    class="detail-information"
                  >
                    <strong>{{ `${attr.option_label}:` }}</strong>{{ `${attr.value_label}` }}
                  </p>
                </template>
                <template
                  v-if="getBundles(product).length > 0"
                >
                  <p
                    v-for="bundle in getBundles(product)"
                    :key="bundle.label"
                    class="detail-information"
                  >
                    {{ `${bundle.quantity}x ${bundle.label}` }}
                  </p>
                </template>
              </SfTableData>
              <SfTableData class="table__data">
                {{ cartGetters.getItemQty(product) }}
              </SfTableData>
              <SfTableData class="table__data price">
                <SfPrice
                  :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
                  :special="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
                  class="product-price"
                />
              </SfTableData>
            </SfTableRow>
          </SfTable>
          <div class="summary">
            <div class="summary__group">
              <div class="summary__total">
                <SfProperty
                  name="Subtotal"
                  :value="$n(productPriceTotal, 'currency')"
                  class="sf-property--full-width property"
                />
                <SfProperty
                  v-if="hasDiscounts"
                  :name="$t('Discount')"
                  :value="$n(discountsAmount, 'currency')"
                  class="sf-property--full-width sf-property--small property"
                />
              </div>
              <div
                v-if="selectedShippingMethod"
                class="summary__total"
              >
                <SfProperty
                  :value="$n(getShippingMethodPrice(selectedShippingMethod), 'currency')"
                  class="sf-property--full-width property"
                >
                  <template #name>
                    <span class="sf-property__name">
                      {{ selectedShippingMethod.carrier_title }} (<small>{{ selectedShippingMethod.method_title }}</small>)
                    </span>
                  </template>
                </SfProperty>
              </div>
              <div
                v-if="productPriceTotal !== totals.subtotal"
                class="summary__total"
              >
                <SfProperty
                  :value="$n(totals.subtotal-productPriceTotal, 'currency')"
                  class="sf-property--full-width property"
                >
                  <template #name>
                    <span class="sf-property__name">
                      Tax
                    </span>
                  </template>
                </SfProperty>
              </div>
              <div
                v-if="donationValue"
                class="summary__total"
              >
                <SfProperty
                  :value="$n(donationAmount, 'currency')"
                  class="sf-property--full-width property"
                >
                  <template #name>
                    <span class="sf-property__name">
                      Donation
                    </span>
                  </template>
                </SfProperty>
              </div>

              <SfDivider />

              <SfProperty
                name="Total price"
                :value="$n(totals.total, 'currency')"
                class="sf-property--full-width sf-property--large summary__property-total"
              />
              <!-- <VsfPaymentProvider @status="isPaymentReady = true" /> -->
              <SfCheckbox
                v-model="terms"
                v-e2e="'terms'"
                name="terms"
                class="summary__terms"
              >
                <template #label>
                  <div class="sf-checkbox__label">
                    {{ $t('I agree to') }}
                    <SfLink href="#">
                      {{ $t('Terms and conditions') }}
                    </SfLink>
                  </div>
                </template>
              </SfCheckbox>

              <div class="summary__action">
                <SfButton
                  v-e2e="'make-an-order'"
                  :disabled="loading || !isPaymentReady || !terms"
                  class="btn larg-btn"
                  @click="processOrder"
                >
                 <span> {{ $t('Make an order') }} </span>
                </SfButton>

                <div class="btn-wrap text-center">
                  <button
                    type="button"
                    class="back-link"
                    @click="preStep"
                    >
                    {{ $t('back') }}
                  </button>
                </div>
              </div>
              </div>
          </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfPrice,
  SfProperty,
  SfLink,
} from '@storefront-ui/vue';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import {
  ref,
  computed,
  defineComponent,
  useRouter,
} from '@nuxtjs/composition-api';
import {
  useMakeOrder,
  useCart,
  cartGetters,
  useShipping,
  useBilling
} from '@vue-storefront/magento';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';
import { useUiState } from "~/composables";
import { StripeElementPayment } from '@vue-stripe/vue-stripe';
import AwLoader from "../AwComponents/atoms/AwLoader.vue";

export default defineComponent({
  name: 'ReviewOrderAndPayment',
  components: {
    AwLoader,
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfPrice,
    SfProperty,
    SfLink,
    StripeElementPayment,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider.vue'),
  },
  mounted () {
      this.pk = this.$config.stripeKey;
      this.stripeElement = true;
  },
  methods: {
    payNow() {
      this.$refs.paymentRef.submit();
    },
    afterSelect() {

    }
  },
  data () {
      return {
        pk: '',
        confirmParams: {
          return_url: window.location.origin+'/checkout/thank-you', // success url // success url
        },
        donationValue: false,
        donationAmount: null,
        isLoading: true,
        elementsOptions: {
          clientSecret: localStorage.getItem('intent'),
          appearance: {
            theme: 'none',
            labels: 'floating',
            rules: {
              '.Label': {
                color: '#785600'
              },
              '.Input': {
                border: '1px solid #CCCCCC'
              },
              '.Input:focus': {
                border: '1px solid #CCCCCC'
              }
            }

          }
        },
        stripeElement: false,

      };
	},
  setup() {
    const { cart, load, setCart } = useCart();
    const { order, make, loading } = useMakeOrder();
    const { $magento } = useVSFContext();
    const router = useRouter();
    const isPaymentReady = ref(true);
    const terms = ref(true);
    const getAttributes = (product) => product.configurable_options || [];
    const getBundles = (product) => product.bundle_options?.map((b) => b.values).flat() || [];
    const { preStep } = useUiState();
    const productTotalwiithoutTax = ref(0);

    const products = computed(() => cartGetters.getItems(cart.value));

    const productPriceTotal = computed(() => {
      productTotalwiithoutTax.value = 0;
      products.value.map((element) => productTotalwiithoutTax.value += element.prices.row_total.value)
      return productTotalwiithoutTax.value.toFixed(2);
    });

    const {
      shipping: shippingDetails,
      load: loadShipping,
      shipping: address,
    } = useShipping();

     const {
      save: billingSave,
      billing: billingAddress,
    } = useBilling();

    onSSR(async () => {

    });

    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(() => -1 * discounts.value.reduce((a, el) => el.value + a, 0));

    return {
      cart,
      cartGetters,
      discounts,
      hasDiscounts,
      discountsAmount,
      getShippingMethodPrice,
      isPaymentReady,
      loading,
      products,
      selectedShippingMethod: computed(() => cartGetters.getSelectedShippingMethod(cart.value)),
      tableHeaders: ['Description', 'Quantity', 'Amount'],
      terms,
      totals: computed(() => cartGetters.getTotals(cart.value)),
      getAttributes,
      getBundles,
      order,
      preStep,
      productPriceTotal,
      productTotalwiithoutTax
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
  margin: 0 0 var(--spacer-base) 0;

  &__row {
    justify-content: space-between;
  }

  @include for-desktop {
    &__header {
      text-align: center;

      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.detail-information {
  margin: 0 !important;
  font-size: var(--font-size--sm);
}
.product-sku {
     font-size: 0.75rem;
    font-family: "leksa", serif;
    font-weight: 300;
    line-height: 1.44;
    letter-spacing: -0.015em;
    text-transform: uppercase;
    color: #2C354E;
    margin-bottom: 0;
}

.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.product-price {
  --price-font-size: var(--font-size--base);
}

.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }

  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }

  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }

  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }

    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }

  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color: var(--c-white);

    &:hover {
      color: var(--c-white);
    }
  }

  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}

.property {
  margin: 0 0 var(--spacer-sm) 0;

  &__name {
    color: var(--c-text-muted);
  }
}

.accordion {
  margin: 0 0 var(--spacer-xl) 0;

  &__item {
    display: flex;
    align-items: flex-start;
  }

  &__content {
    flex: 1;
  }

  &__edit {
    flex: unset;
  }
}

.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);

  &:last-child {
    margin: 0;
  }

  &__label {
    font-weight: var(--font-weight--normal);
  }
}

.payment-form {
   @media (max-width: 767px) {
     padding: 0 20px;
   }
  .fields-wrap {
    padding: 0 0 20px 0;
  }
}
.Input, .p-FauxInput {
    border-color: transparent !important;
}
</style>
