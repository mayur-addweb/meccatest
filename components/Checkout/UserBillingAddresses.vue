<template>
  <div v-if="!billingAddresses">
    <LoadingSpinner />
  </div>
  <div v-else class="shipping-provider">
    <AwAddressPicker
      :selected="`${currentAddressId}`"
      @change="setCurrentAddress($event)"
    >
      <AwAddress
        v-for="billingAddress in billingAddresses"
        :key="userBillingGetters.getId(billingAddress)"
        :name="`${userBillingGetters.getId(billingAddress)}`"
      >
        <UserAddressDetails :address="billingAddress" />
      </AwAddress>
    </AwAddressPicker>
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker,
} from '@storefront-ui/vue';
import {
  useUserBilling,
  userBillingGetters,
} from '@vue-storefront/magento';
import {
  defineComponent,
} from '@nuxtjs/composition-api';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import AwAddressPicker from '../../pages/AwComponents/molecules/AwAddressPicker.vue';
import AwAddress from '../../pages/AwComponents/molecules/AwAddress.vue';
import LoadingSpinner from "../LoadingSpinner.vue";

export default defineComponent({
  name: 'UserBillingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker,
    UserAddressDetails,
    AwAddressPicker,
    AwAddress,
    LoadingSpinner
  },
  props: {
    currentAddressId: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['setCurrentAddress'],
  setup(_, { emit }) {
    const { billing: userBilling } = useUserBilling();

    const setCurrentAddress = (addressId) => {
      const selectedAddress = userBillingGetters.getAddresses(userBilling.value, { id: Number.parseInt(addressId, 10) });
      if (!selectedAddress || selectedAddress.length === 0) {
        return;
      }
      emit('setCurrentAddress', selectedAddress[0]);
    };

    const billingAddresses = userBillingGetters.getAddresses(userBilling.value);

    return {
      billingAddresses,
      setCurrentAddress,
      userBillingGetters,
    };
  },
});
</script>

<style lang="scss" scoped>
.shipping-provider {
    padding: 0 40px;
    @media all and (max-width: 767px) {
        padding: 0 0px;
    }
}

.billing {
  &__address {
    margin-bottom: var(--spacer-base);
    @include for-desktop {
      margin-right: var(--spacer-sm);
      display: flex;
      width: 100%;
      flex-direction: column;
    }
  }

  &__addresses {
    margin-bottom: var(--spacer-xl);
    @include for-desktop {
      display: flex;
    }
  }

  &__setAsDefault {
    margin-bottom: var(--spacer-xl);
  }
}

.sf-divider, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>