<template>
  <div
    :class="{
      'is-active': isChecked,
      'is-disabled': disabled,
    }"
  >
      <input
        v-focus
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        class="form-control"
        :disabled="disabled"
        @change="changeHandler"
        @input="inputHandler"
      />
      <div class="addr-label">
      <slot name="checkmark" v-bind="{ isChecked, disabled }">
        <span
          class="sf-radio__checkmark"
          :class="{ 'sf-radio__checkmark is-active': isChecked }"
        ></span>
      </slot>
        <slot name="label" v-bind="{ label, isChecked, disabled }">
          <span :class="{ 'display-none': !label }" class="sf-radio__label">{{
            label
          }}</span>
        </slot>
      </div>
  </div>
</template>
<script>
import { userAddressesGetters, useAddresses } from '@vue-storefront/magento';
import { computed, defineComponent, useRouter, useRoute } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { focus } from "../utilities/directives";
export default {
  name: "AwRadio",
  directives: {
    focus,
  },
  model: {
    prop: "selected",
    event: "change",
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    }
  },
    setup() {
    const {
      addresses,
      load,
      remove,
      update,
      save,
    } = useAddresses();
    
    const userAddresses = computed(() => userAddressesGetters.getAddresses(addresses.value));
    const router = useRouter();
    const route = useRoute();
    const activeAddress = computed(
      () => userAddresses.value.filter((address) => address?.id == route.value.query.id).pop()
    );

    const isNewAddress = computed(() => !activeAddress.value);
    const editingAddress = computed(() => !!route.value.query.id);
    const changeAddress = async (address) => {
      const addressId = address?.id || 'new';
      await router.push({ path: '/my-account/addresses-details', query: { id: addressId } });
    };

    const removeAddress = async (address) => {
      const isDefault = userAddressesGetters.isDefault(address);
      if (!isDefault) {
        await remove({ address });
        await load({});
      }
    };

    const saveAddress = async ({ form, onComplete, onError }) => {
      console.log(form,"form");
      try {
        const actionMethod = isNewAddress.value ? save : update;
        const data = await actionMethod({ address: form });
        await onComplete(data);
        await router.push({ path: '/my-account/addresses-details' });
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await load({});
    });

    return {
      changeAddress,
      update,
      removeAddress,
      saveAddress,
      userAddressesGetters,
      userAddresses,
      editingAddress,
      activeAddress,
      isNewAddress,
    };
  },
  computed: {
    isChecked() {
      return this.value === this.selected;
    },
  },
  methods: {
    changeHandler() {
      this.$emit("change", this.value);
    },
    inputHandler() {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.addr-label {
  border-radius: 20px;
}
</style>