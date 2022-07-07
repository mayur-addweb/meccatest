<template>
<div class="shipping-popup-block" v-if="isAuthenticated && hasSavedShippingAddress && !newAddressform">
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form @submit.prevent="handleSubmit(handleAddressSubmit(reset))" class="address-form p-0">
      <UserShippingAddresses
        v-if="isAuthenticated && hasSavedShippingAddress && !newAddressform"
        v-model="setAsDefault"
        v-e2e="'shipping-addresses'"
        :current-address-id="currentAddressId || NOT_SELECTED_ADDRESS"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div
        v-else
        class="fields-wrap pl-0 pr-0"
      >
      <div class="coln-two d-md-flex justify-content-between">
        <div class="input-wrap">
          <label class="text-uppercase">email address*</label>
          <input type="text" class="form-control" placeholder="">
        </div>
        <div class="input-wrap">
        <ValidationProvider
          v-slot="{ errors }"
          name="phone"
          rules="required"
          slim
        >
          <AwInput
            v-model="shippingDetails.telephone"
            v-e2e="'shipping-phone'"
            label="Mobile Phone*"
            name="phone"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="telephone => changeShippingDetails('telephone', telephone)"
          />
        </ValidationProvider>
        </div>
      </div>
      <div class="coln-two d-md-flex justify-content-between">
        <div class="input-wrap">
        <ValidationProvider
          v-slot="{ errors }"
          name="firstname"
          rules="required|min:2"
          slim
        >
          <AwInput
            v-e2e="'shipping-firstName'"
            :value="shippingDetails.firstname"
            label="First Name*"
            name="firstName"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="firstname => changeShippingDetails('firstname', firstname)"
          />
        </ValidationProvider>
        </div>
        <div class="input-wrap">
         <ValidationProvider
          v-slot="{ errors }"
          name="lastname"
          rules="required|min:2"
          slim
        >
          <AwInput
            v-e2e="'shipping-lastName'"
            :value="shippingDetails.lastname"
            label="Last Name*"
            name="lastName"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="lastname => changeShippingDetails('lastname', lastname)"
          />
        </ValidationProvider>
        </div>
      </div>
      <div class="coln-two d-md-flex justify-content-between">
        <div class="input-wrap input-shipping">
        <ValidationProvider
          v-slot="{ errors }"
          name="street"
          rules="required"
          slim
        >
          <AwInput
            v-e2e="'shipping-streetName'"
            :value="shippingDetails.street"
            label="Shipping ADdress*"
            name="streetName"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="street => changeShippingDetails('street', street)"
          />
        </ValidationProvider>
        </div>
        <div class="input-wrap input-country">
          <ValidationProvider
          v-slot="{ errors }"
          name="country"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-e2e="'shipping-country'"
            :value="shippingDetails.country_code"
            label="Country*"
            name="country"
            class="form__element sf-input__wrapper form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="changeCountry"
          >
            <SfSelectOption
              v-for="countryOption in countriesList"
              :key="countryOption.id"
              :value="countryOption.abbreviation"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        </div>
      </div>
      <div class="coln-two d-md-flex justify-content-between">
        <div class="input-wrap input-shipping">
          <ValidationProvider
            v-slot="{ errors }"
            name="apartment"
            rules="required|min:2"
            slim
          >
            <AwInput
              v-e2e="'shipping-apartment'"
              :value="shippingDetails.apartment"
              label="shipping address line 2"
              name="apartment"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              @input="apartment => changeShippingDetails('apartment', apartment)"
            />
          </ValidationProvider>
        </div>
      </div>
      <div class="coln-three d-md-flex justify-content-between">
        <div class="input-wrap input-zip">
          <ValidationProvider
            v-slot="{ errors }"
            name="zipCode"
            rules="required|min:2"
            slim
          >
            <AwInput
              v-e2e="'shipping-zipcode'"
              :value="shippingDetails.postcode"
              label="Zip Code*"
              name="zipCode"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              @input="postcode => changeShippingDetails('postcode', postcode)"
            />
          </ValidationProvider>
        </div>
        <div class="input-wrap input-city">
          <ValidationProvider
            v-slot="{ errors }"
            name="city"
            rules="required|min:2"
            slim
          >
            <AwInput
              v-e2e="'shipping-city'"
              :value="shippingDetails.city"
              label="City*"
              name="city"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
              @input="city => changeShippingDetails('city', city)"
            />
          </ValidationProvider>
        </div>
        <div class="input-wrap input-state">
          <ValidationProvider
          v-slot="{ errors }"
          name="region"
          :rules="!shippingDetails.country_code || regionInformation.length === 0 ? null : 'required|min:2'"
          slim
        >
          <AwInput
            v-if="!shippingDetails.country_code || regionInformation.length === 0"
            v-e2e="'shipping-state'"
            :value="shippingDetails.region"
            label="State*"
            :disabled="!shippingDetails.country_code"
            name="state"
            :valid="!!shippingDetails.country_code"
            :error-message="!shippingDetails.country_code ? 'Please select a country first' : ''"
            @input="region => changeShippingDetails('region', region)"
          />
          <SfSelect
            v-else
            v-e2e="'shipping-state'"
            :value="shippingDetails.region"
            label="State*"
            name="state"
            class="form__element sf-input__wrapper sf-input__wrapper-even form__select sf-select--underlined"
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="region => changeShippingDetails('region', region)"
          >
            <SfSelectOption
              v-for="regionOption in regionInformation"
              :key="regionOption.id"
              :value="regionOption.abbreviation"
            >
              {{ regionOption.label }} {{ regionOption.abbreviation }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        </div>
      </div>
      </div>
      <div class="add-new">
      <button
        v-if="!newAddressform"
        class="add-addr"
        type="submit"
        @click="handleAddNewAddressBtnClick"
      >
       <span> {{ $t('Add New Shipping Address') }} </span>
      </button>
      </div>
      <LoadingSpinner v-if="spinnerStatus" />
      <div class="form">
        <div class="form__action">
          <SfButton
            v-e2e="'select-shipping'"
            :disabled="loading"
            class="form__action-button btn larg-btn py-2"
            type="submit"
          >
            <span>{{ $t('continue') }} </span>
          </SfButton>
        </div>
      </div>
    </form>
  </ValidationObserver>
</div>
<div v-else>
  <Shipping v-if="newAddressform" :addressLengthIsZero="addressLengthIsZero" />
    <div v-else>
    <LoadingSpinner/>
  </div>
</div>
</template>

<script>
import {
  SfButton,
  SfSelect,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  watch,
  onMounted, defineComponent,
} from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import {
  addressGetter,
  useCountrySearch,
  userShippingGetters,
  useShipping,
  useUser,
  useUserShipping,
  useBilling
} from '@vue-storefront/magento';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { addressFromApiToForm } from '~/helpers/checkout/address';
import { useUiState } from "~/composables";
import AwInput from '../AwComponents/atoms/AwInput.vue';
import Shipping from './Shipping.vue';
import LoadingSpinner from '../../components/LoadingSpinner.vue';

const NOT_SELECTED_ADDRESS = '';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number',
});

export default defineComponent({
  name: 'ShippingStep',
  components: {
    AwInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    Shipping,
    UserShippingAddresses: () => import('~/components/Checkout/UserShippingAddresses.vue'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue'),
    LoadingSpinner
  },
  setup() {
    const {
      load,
      save,
      loading,
      shipping: address,
    } = useShipping();

    const {
      save: billingSave,
      billing: billingAddress,
    } = useBilling();

    const {
      shipping: userShipping,
      load: loadUserShipping,
      setDefaultAddress,
    } = useUserShipping();
    const {
      load: loadCountries,
      countries,
      search: searchCountry,
      country,
    } = useCountrySearch('Step:Shipping');
    const { isAuthenticated } = useUser();

    const shippingDetails = ref(addressFromApiToForm(address.value) || {});
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);

    const setAsDefault = ref(false);
    const isFormSubmitted = ref(false);
    const canAddNewAddress = ref(true);
    const spinnerStatus = ref(false);
    const addressLengthIsZero = ref();

    const isShippingDetailsStepCompleted = ref(false);

    const { nextStep, preStep, newAddressform, openAddressform, toggleAddressForm } = useUiState();

    const canMoveForward = computed(() => !loading.value && shippingDetails.value && Object.keys(
      shippingDetails.value,
    ).length > 0);

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });
    // @ts-ignore
    const countriesList = computed(() => addressGetter.countriesList(countries.value));

    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const handleAddressSubmit = (reset) => async () => {
      spinnerStatus.value = true;
      const addressId = currentAddressId.value;
      const shippingDetailsData = {
        ...shippingDetails.value,
        customerAddressId: addressId,
      };
      // @TODO remove ignore when https://github.com/vuestorefront/vue-storefront/issues/5967 is applied
      // @ts-ignore
      await save({ shippingDetails: shippingDetailsData });


      await billingSave({
         billingDetails: {
            ...shippingDetails.value,
            customerAddressId: addressId,
            sameAsShipping: true,
         },
      });

      //await billingSave({ billingDetails: shippingDetailsData });
      if (addressId !== NOT_SELECTED_ADDRESS && setAsDefault.value) {
        const chosenAddress = userShippingGetters.getAddresses(
          userShipping.value,
          { id: addressId },
        );
        if (chosenAddress && chosenAddress.length > 0) {
          await setDefaultAddress({ address: chosenAddress[0] });
        }
      }
      spinnerStatus.value= false;
      reset();
      isShippingDetailsStepCompleted.value = true;
      if(isShippingDetailsStepCompleted.value === true && addressId) {
        await nextStep();
      }
    };

    const handleAddNewAddressBtnClick = () => {
      openAddressform();
      isShippingDetailsStepCompleted.value = false;
    };

    const ToggleformOpen = () => {
      canAddNewAddress.value = !canAddNewAddress.value;
    }

    const handleSetCurrentAddress = (addr) => {
      shippingDetails.value = { ...addressFromApiToForm(addr) };
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const changeShippingDetails = (field, value) => {
      shippingDetails.value = {
        ...shippingDetails.value,
        [field]: value,
      };
      isShippingDetailsStepCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userShippingGetters.getAddresses(
        userShipping.value,
        { default_shipping: true },
      );
      if (defaultAddress && defaultAddress.length > 0) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    const changeCountry = async (id) => {
      changeShippingDetails('country_code', id);
      await searchCountry({ id });
    };

    watch(address, (addr) => {
      shippingDetails.value = addressFromApiToForm(addr || {});
    });

    onSSR(async () => {
      await Promise.all([
        loadCountries(),
        load(),
      ]);
    });

    onMounted(async () => {
      await loadUserShipping();
      console.log(newAddressform.value,'newAddressform');
      console.log(hasSavedShippingAddress,'hasSavedShippingAddress');
      if (shippingDetails.value?.country_code) {
        await searchCountry({ id: shippingDetails.value.country_code });
      }

      if (!userShipping.value?.addresses && isAuthenticated.value) {
        await loadUserShipping();
      }
      const shippingAddresses = userShippingGetters.getAddresses(userShipping.value);

      if (!shippingAddresses || shippingAddresses.length === 0) {
        openAddressform();
        addressLengthIsZero.value = true;
        return;
      }

      const hasEmptyShippingDetails = !shippingDetails.value || Object.keys(shippingDetails.value).length === 0;
      if (hasEmptyShippingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      canAddNewAddress,
      canMoveForward,
      changeCountry,
      changeShippingDetails,
      countriesList,
      country,
      currentAddressId,
      handleAddNewAddressBtnClick,
      handleAddressSubmit,
      handleSetCurrentAddress,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      isShippingDetailsStepCompleted,
      load,
      loading,
      NOT_SELECTED_ADDRESS,
      regionInformation,
      searchCountry,
      setAsDefault,
      shippingDetails,
      nextStep,
      preStep,
      ToggleformOpen,
      toggleAddressForm,
      newAddressform,
      openAddressform,
      spinnerStatus,
      addressLengthIsZero

    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;

  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }

    ::v-deep .sf-select__label {
      left: initial;
    }
  }

  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }

  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }

    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }

      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }

    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }

  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);

    &:hover {
      color: var(--c-white);
    }

    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.shipping-popup {
  span {
    display: unset;
  }
}

</style>
