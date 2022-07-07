<template>
    <form class="address-form p-0">
            <VsfShippingProvider
              v-if="true"
              @submit="nextStep"
            />
            <VsfPaymentProvider @status="isPaymentReady = true" />
            <button type="button" @click="moveToBilling" class="btn larg-btn text-uppercase">
              <span>continue</span>
            </button>
            <div class="btn-wrap text-center">
              <button type="button" @click="preStep" class="back-link">Back</button>
            </div>
          </form>
</template>

<script>
import {
  useCart,
  useShippingProvider,
  cartGetters,
  useGetShippingMethods,
  useMakeOrder
} from '@vue-storefront/magento';
import { computed } from '@nuxtjs/composition-api';
import { useUiState } from "~/composables";
import { onSSR } from '@vue-storefront/core';
import {
  useShipping,
  useBilling
} from '@vue-storefront/magento';
import ShipDetail from "./ShipDetail.vue";
import axios from "axios";



export default {
    components: {
      VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue'),
      VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider.vue'),
      ShipDetail,
    },
    setup() {
        const { checkoutstep, nextStep,preStep } = useUiState();
        const { order, make, loading } = useMakeOrder();
        const {
      state,
      error: errorShippingProvider,
      loading: loadingShippingProvider,
      setState,
    } = useShippingProvider();


    const {
      save: billingSave,
      billing: billingAddress,
    } = useBilling();

    const selectedShippingMethod = computed(() => state.value);
        const {
          shipping: shippingDetails,
          load: loadShipping,
          shipping: address,
        } = useShipping();

    const moveToBilling = async () => {

    if(selectedShippingMethod.value){

        await billingSave({
          billingDetails: {
              ...shippingDetails.value,
              sameAsShipping: true,
          },
        });

        await make();

        axios.get("/getPaymentIntent?orderId=" + order.value.order_number)
          .then(response => {
            localStorage.setItem('intent', response.data[0].clientSecret);
            nextStep();
          });


      }
    }

        onSSR(async () => {
      await Promise.all([
        loadShipping(),
      ]);

      if (!shippingDetails.value) {
          await loadShipping();
      }
      else{
        console.log(shippingDetails.value,'shippingDetails');
      }
    });

        return {
            nextStep,
            preStep,
            selectedShippingMethod,
            moveToBilling
        }
    }

}
</script>
