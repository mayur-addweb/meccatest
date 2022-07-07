<template>
    <div v-if="shipDetail" class="addr-overview d-flex justify-content-between">
      <span>Shipping to</span>
     <strong v-if="shipDetail">{{ shipDetail.value.street[0] }},{{ shipDetail.value.street[1] }} {{ shipDetail.value.city }}  {{ shipDetail.value.region.code }} -{{ shipDetail.value.postcode }}  {{ shipDetail.value.country.code }}</strong>
    </div>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import {
  useUserBilling,
  userBillingGetters,
  useUser,
  useBilling,
  useShipping,
  useCountrySearch,
  addressGetter,
} from '@vue-storefront/magento';
import {
  ref,
  computed,
  onMounted,
  watch,
  useRouter,
  defineComponent,
} from '@nuxtjs/composition-api';


export default {

    setup() {
        const {
          shipping: shippingDetails,
          load: loadShipping,
        } = useShipping();
        const shipDetail = ref(null);

        onSSR(async () => {
      await Promise.all([
        loadShipping(),
      ]);

      if (!shippingDetails.value) {
          await loadShipping();
      }
      else{
        shipDetail.value = shippingDetails;
      }
    });

    return{
        shipDetail
    }
    }
    
}
</script>