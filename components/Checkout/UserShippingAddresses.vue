<template>
  <div>
    <AwAddressPicker
      :selected="`${currentAddressId}`"
      @change="setCurrentAddress($event)"
    >
      <AwAddress
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        :name="`${userShippingGetters.getId(shippingAddress)}`"
        :addId="shippingAddress.id"
        :shippingAddress="shippingAddress"
        :load="load"
      >
        <UserAddressDetails
          :address="shippingAddress"
        />
      </AwAddress>
    </AwAddressPicker>
  </div>
</template>

<script>
import {
  SfCheckbox,
} from '@storefront-ui/vue';
import {
  useUserShipping,
  userShippingGetters,
} from '@vue-storefront/magento';
import {
  computed,
  defineComponent,
  ref
} from '@nuxtjs/composition-api';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import AwAddressPicker from '../../pages/AwComponents/molecules/AwAddressPicker.vue'
import AwAddress from '../../pages/AwComponents/molecules/AwAddress.vue'

export default defineComponent({
  name: 'UserShippingAddresses',
  components: {
    SfCheckbox,
    AwAddressPicker,
    UserAddressDetails,
    AwAddress,
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
  setup(props, { emit }) {
    const { shipping: userShipping } = useUserShipping();

    const SkippAddressId =  ref([]);

    const catchAddId = (addId) => {
      SkippAddressId.push(addId);
    }

    const setCurrentAddress = (addressId) => {
      const selectedAddress = userShippingGetters.getAddresses(
        userShipping.value,
        { id: Number.parseInt(addressId, 10) },
      );

      if (!selectedAddress) {
        return;
      }

      emit('setCurrentAddress', selectedAddress[0]);
    };

    const shippingAddresses = computed(() => userShippingGetters
      .getAddresses(userShipping.value));

    const removeAddress = async (address) => {
        await remove({ address });
        await load({});
    };

    return {
      setCurrentAddress,
      shippingAddresses,
      userShippingGetters,
      SkippAddressId,
      catchAddId,
      removeAddress
    };
  },
});
</script>

<style lang="scss" scoped>
.shipping {
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
      display: block;
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
