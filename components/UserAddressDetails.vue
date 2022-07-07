<template>
  <div class="address-card">
    <span class="name"
      :style="userAddress.isDefault ? '' : ''"
    >
      {{ userAddress.firstName }} {{ userAddress.lastName }}
    </span>
    <p class="addr">{{ userAddress.street }}, {{ userAddress.streetNumber }}
      {{ userAddress.city }}, {{ userAddress.province }} -
      {{ userAddress.postalCode }}, {{ userAddress.country }}
    </p>
    <p
      v-if="userAddress.phone"
      class="addr"
    >
      {{ userAddress.phone }}
    </p>
  </div>
</template>

<script>
import {
  toRef,
  computed,
  defineComponent,
} from '@nuxtjs/composition-api';
import { userAddressesGetters } from '@vue-storefront/magento';

export default defineComponent({
  name: 'UserAddressDetails',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const address = toRef(props, 'address');

    const userAddress = computed(() => ({
      firstName: userAddressesGetters.getFirstName(address.value),
      lastName: userAddressesGetters.getLastName(address.value),
      street: userAddressesGetters.getStreetName(address.value),
      streetNumber: userAddressesGetters.getApartmentNumber(address.value),
      postalCode: userAddressesGetters.getPostCode(address.value),
      city: userAddressesGetters.getCity(address.value),
      province: userAddressesGetters.getProvince(address.value) || '',
      country: userAddressesGetters.getCountry(address.value),
      phone: userAddressesGetters.getPhone(address.value),
      isDefault: userAddressesGetters.isDefault(address.value),
      isDefaultShipping: userAddressesGetters.isDefaultShipping(address.value),
      isDefaultBilling: userAddressesGetters.isDefaultBilling(address.value),
    }));

    const addressDefaultText = computed(() => {
      if (userAddress.value.isDefaultShipping) return 'Default Shipping Address';
      if (userAddress.value.isDefaultBilling) return 'Default Billing Address';
      return '';
    });

    return {
      userAddress,
      addressDefaultText,
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.phone {
  margin-top: var(--spacer-base);
}
.address-card  {
  .addr, .name {
      font-size: 18px;
  }
}
</style>
