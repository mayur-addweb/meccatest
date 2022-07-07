<template>
  <div v-if="!shippingMethods">
    <LoadingSpinner />
  </div>
  <div v-else class="shipping-provider">
    <div class="form">
      <div class="form__radio-group">
       <div class="pkg-wrap">
         
        <AwRadio
          v-for="(method, index) in shippingMethods"
          :key="index"
          v-e2e="'shipping-method-label'"
          :label="method.method_title"
          :value="method.method_code"
          :selected="
            selectedShippingMethod &&
              selectedShippingMethod.method_code
          "
          name="shippingMethod"
          :description="method.carrier_title"
          @input="selectShippingMethod(method)"
        >
        <template #label>
          <!-- <span class="d-flex justify-content-between"> -->
              <span class="name">{{ method.carrier_title }}</span>
              <span class="rate" v-if="method && (method.amount || method.price_incl_tax)">
                {{ $n(getShippingMethodPrice(method), 'currency') }}
              </span>
          <!-- </span> -->
          </template>
          <template #description>
            <div class="sf-radio__description shipping__description">
              <div class="shipping__info">
                {{ method.method_title }}
              </div>
            </div>
          </template>
        </AwRadio>
       </div>
      </div>
      <div class="form__action">
        <SfButton v-if="false"
          v-e2e="'continue-to-billing'"
          class="form__action-button btn larg-btn"
          type="button"
          :disabled="
            !isShippingMethodStepCompleted ||
              isLoading ||
              loadingShippingProvider.save
          "
          @click="$emit('submit')"
        >
         <span> {{ $t('Continue') }} </span>
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import {
  useCart,
  useShippingProvider,
  cartGetters,
  useGetShippingMethods,
} from '@vue-storefront/magento';
import {
  SfHeading, SfButton, SfLoader,
} from '@storefront-ui/vue';

import { computed, defineComponent, onMounted } from '@nuxtjs/composition-api';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';

import { useUiState, useUiNotification } from "~/composables";
import AwRadio from '../../pages/AwComponents/atoms/AwRadio.vue';
import LoadingSpinner from "../LoadingSpinner.vue";

export default defineComponent({
  name: 'VsfShippingProvider',
  components: {
    SfHeading,
    SfButton,
    AwRadio,
    SfLoader,
    LoadingSpinner
  },
  setup() {
    const {
      result: shippingMethods,
      loading: loadingShippingMethods,
      error: errorUseGetShippingMethods,
    } = useGetShippingMethods('VsfShippingProvider');
    const { cart } = useCart();

    const { checkoutstep, nextStep,preStep } = useUiState();

    const {
      state,
      error: errorShippingProvider,
      loading: loadingShippingProvider,
      setState,
    } = useShippingProvider();
    const selectedShippingMethod = computed(() => state.value);
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const isLoading = computed(
      () => loadingShippingMethods.value || loadingShippingProvider.value,
    );
    const isShippingMethodStepCompleted = computed(
      () => state.value?.method_code && !isLoading.value,
    );
    /**
     * @TODO: Do not run the setShippingMethodsOnCart mutation on in-store pickup orders.
     * Instead, specify the pickup_location_code attribute in the setShippingAddressesOnCart mutation.
     */
    const selectShippingMethod = async (method) => {
      await setState({
        carrier_code: method.carrier_code,
        method_code: method.method_code,
      });
    };

    onMounted( () => {
      if(checkoutstep < 2 && shippingMethods){
        nextStep();
      }
      console.log(shippingMethods.value,'shippingMethods');
    })

    return {
      errorShippingProvider,
      errorUseGetShippingMethods,
      getShippingMethodPrice,
      isLoading,
      isShippingMethodStepCompleted,
      loadingShippingProvider,
      selectedShippingMethod,
      selectShippingMethod,
      shippingMethods,
      state,
      totals,
      nextStep,
      checkoutstep
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

.shipping-provider {
  .sf-radio {
    &__label {
      display: flex;
      justify-content: space-between;
    }

    &__description {
      --radio-description-margin: 0;
      --radio-description-font-size: var(--font-xs);
    }
  }
}

.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 25rem;
    }
  }

  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      margin: 0 0 var(--spacer-2xl) 0;
    }
  }
}

.shipping-provider {
    padding: 0 40px;
    @media all and (max-width: 767px) {
        padding: 0 0px;
    }
}
.form__action {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
