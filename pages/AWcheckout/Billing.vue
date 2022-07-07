<template>
<div class="shipping-popup-block" v-if="isAuthenticated && hasSavedBillingAddress && !newAddressform">
  <ValidationObserver v-slot="{ handleSubmit, reset }" class="span-from">
    <!-- <span class="billingtitle"> Billing </span> -->
    <form
      @submit.prevent="handleSubmit(handleAddressSubmit(reset))"
      class="copy-wrap"
    >
      <UserBillingAddresses
        v-if="isAuthenticated && hasSavedBillingAddress && !newAddressform"
        v-model="setAsDefault"
        v-e2e="'billing-addresses'"
        :current-address-id="currentAddressId || NOT_SELECTED_ADDRESS"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div
        v-if="canAddNewAddress"
        class="form invisible-element"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="firstname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'firstName'"
            :value="billingDetails.firstname"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="firstname => changeBillingDetails('firstname', firstname)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="lastname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'lastName'"
            :value="billingDetails.lastname"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="lastname => changeBillingDetails('lastname', lastname)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="street"
          rules="required"
          slim
        >
          <SfInput
            v-e2e="'streetName'"
            :value="billingDetails.street"
            label="Street name"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="street => changeBillingDetails('street', street)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="apartment"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'apartment'"
            :value="billingDetails.apartment"
            label="House/Apartment number"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="apartment => changeBillingDetails('apartment', apartment)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="city"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'city'"
            :value="billingDetails.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="city => changeBillingDetails('city', city)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="state"
          :rules="!regionInformation ? null : 'required|min:2'"
          slim
        >
          <SfInput
            v-if="!billingDetails.country_code || regionInformation.length === 0"
            v-model="billingDetails.region"
            v-e2e="'state'"
            label="State/Province"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            :disabled="!billingDetails.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            @input="region => changeBillingDetails('region', region)"
          />
          <SfSelect
            v-else
            v-model="billingDetails.region"
            v-e2e="'state'"
            label="State/Province"
            name="state"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            @input="state => changeBillingDetails('region', state)"
          >
            <SfSelectOption
              v-for="regionOption in regionInformation"
              :key="regionOption.id"
              :value="regionOption.abbreviation"
            >
              {{ regionOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="country_code"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-e2e="'country'"
            :value="billingDetails.country_code"
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
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
        <ValidationProvider
          v-slot="{ errors }"
          name="postcode"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'zipcode'"
            :value="billingDetails.postcode"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="postcode => changeBillingDetails('postcode', postcode)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="telephone"
          rules="required"
          slim
        >
          <SfInput
            v-e2e="'phone'"
            :value="billingDetails.telephone"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="telephone => changeBillingDetails('telephone', telephone)"
          />
        </ValidationProvider>
      </div>
      <div class="add-new">
      <button
        v-if="!newAddressform"
        class="add-addr"
        type="submit"
        @click="handleAddNewAddressBtnClick"
      >
       <span> {{ $t('Add New Billing Address') }} </span>
      </button>
      </div>
      <div>
        <LoadingSpinner v-if="spinnerStatus" />
      </div>
      <div class="form">
        <div class="form__action">
          <SfButton
            v-e2e="'continue-to-payment'"
            class=" btn larg-btn py-2"
            type="submit"
          >
           <span> {{ $t('Continue') }} </span>
          </SfButton>
        </div>
      </div>
      <div class="btn-wrap text-center">
        <button type="button" @click="preStep" class="back-link">Back</button>
      </div>
    </form>
  </ValidationObserver>
</div>
<div v-else>
  <Shipping v-if="newAddressform" />
    <div v-else>
    <LoadingSpinner/>
  </div>
</div>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox,
} from '@storefront-ui/vue';
import {
  useUserBilling,
  userBillingGetters,
  useUser,
  useBilling,
  useShipping,
  useCountrySearch,
  addressGetter,
} from '@vue-storefront/magento';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import { onSSR } from '@vue-storefront/core';
import {
  ref,
  computed,
  onMounted,
  watch,
  useRouter,
  defineComponent,
} from '@nuxtjs/composition-api';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import { addressFromApiToForm, formatAddressReturnToData } from '~/helpers/checkout/address';
import { useUiState, useUiNotification } from "~/composables";
import Shipping from "./Shipping.vue";
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
  name: 'BillingStep',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    LoadingSpinner,
    Shipping,
    UserBillingAddresses: () => import('~/components/Checkout/UserBillingAddresses.vue'),
  },
  setup() {
    const router = useRouter();
    const {
      load,
      save,
      loading,
      billing: address,
    } = useBilling();
    const {
      billing: userBilling,
      load: loadUserBilling,
      setDefaultAddress,
    } = useUserBilling();
    const {
      shipping: shippingDetails,
      load: loadShipping,
    } = useShipping();
    const {
      load: loadCountries,
      countries,
      search: searchCountry,
      country,
    } = useCountrySearch('Step:Billing');
    const { isAuthenticated } = useUser();
    let oldBilling = null;
    const sameAsShipping = ref(false);
    const spinnerStatus = ref(false);
    const billingDetails = ref(addressFromApiToForm(address.value) || {});
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);
    const setAsDefault = ref(false);
    const isFormSubmitted = ref(false);
    const canAddNewAddress = ref(true);
    const isBillingDetailsStepCompleted = ref(false);
    const { checkoutstep, nextStep,preStep, newAddressform, toggleAddressForm, openAddressform } = useUiState();
    const canMoveForward = computed(() => !loading.value && billingDetails.value && Object.keys(
      billingDetails.value,
    ).length > 0);
    const hasSavedBillingAddress = computed(() => {
      if (!isAuthenticated.value || !userBilling.value) {
        return false;
      }
      const addresses = userBillingGetters.getAddresses(userBilling.value);
      return Boolean(addresses?.length);
    });
    const countriesList = computed(() => addressGetter.countriesList(countries.value));
    const regionInformation = computed(() => addressGetter.regionList(country.value));
    const handleAddressSubmit = (reset) => async () => {
      spinnerStatus.value = true;
      console.log(spinnerStatus.value,'spinnerStatus');
      const addressId = currentAddressId.value;
      // await save({
      //   billingDetails: {
      //     ...billingDetails.value,
      //     customerAddressId: addressId,
      //     sameAsShipping: sameAsShipping.value,
      //   },
      // });
      if (addressId !== NOT_SELECTED_ADDRESS && setAsDefault.value) {
        const chosenAddress = userBillingGetters.getAddresses(
          userBilling.value,
          { id: addressId },
        );
        if (chosenAddress && chosenAddress.length > 0) {
          await setDefaultAddress({ address: chosenAddress[0] });
        }
      }
      reset();
      spinnerStatus.value = false;
      console.log(spinnerStatus.value,'after-spinnerStatus');
      isBillingDetailsStepCompleted.value = true;
      if(isBillingDetailsStepCompleted.value === true && addressId) {
        await nextStep();
      }
    };
    const handleCheckSameAddress = async () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        if (!shippingDetails.value) {
          await loadShipping();
          await searchCountry({ id: shippingDetails.value.country_code });
        }
        oldBilling = { ...billingDetails.value };
        billingDetails.value = { ...formatAddressReturnToData(shippingDetails.value) };
        currentAddressId.value = NOT_SELECTED_ADDRESS;
        canAddNewAddress.value = true;
        setAsDefault.value = false;
        if (billingDetails.value.country_code) {
          await searchCountry({ id: billingDetails?.value.country_code });
        }
        return;
      }
      billingDetails.value = oldBilling;
      if (billingDetails.value.country_code) {
        await searchCountry({ id: billingDetails?.value.country_code });
      }
    };
    const handleAddNewAddressBtnClick = () => {
      openAddressform();
      isBillingDetailsStepCompleted.value = false;
    };
    const handleSetCurrentAddress = (addr) => {
      billingDetails.value = { ...addressFromApiToForm(addr) };
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isBillingDetailsStepCompleted.value = false;
    };
    const changeBillingDetails = (field, value) => {
      billingDetails.value = {
        ...billingDetails.value,
        [field]: value,
      };
      isBillingDetailsStepCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };
    const selectDefaultAddress = () => {
      const defaultAddress = userBillingGetters.getAddresses(
        userBilling.value,
        { default_billing: true },
      );
      if (defaultAddress && defaultAddress.length > 0) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };
    const changeCountry = async (id) => {
      changeBillingDetails('country_code', id);
      await searchCountry({ id });
    };
    watch(address, (addr) => {
      billingDetails.value = addressFromApiToForm(addr || {});
    });
    onSSR(async () => {
      await Promise.all([
        loadCountries(),
        load(),
        handleCheckSameAddress()
      ]);

    });
    onMounted(async () => {
      await loadUserBilling();
      if (billingDetails.value?.country_code) {
        await searchCountry({ id: billingDetails.value.country_code });
      }
      if (!userBilling.value?.addresses && isAuthenticated.value) {
        await loadUserBilling();
      }
      const billingAddresses = userBillingGetters.getAddresses(userBilling.value);
      if (!billingAddresses || billingAddresses.length === 0) {
        return;
      }
      const hasEmptyBillingDetails = !billingDetails.value || Object.keys(billingDetails.value).length === 0;
      if (hasEmptyBillingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });
    return {
      canAddNewAddress,
      canMoveForward,
      changeCountry,
      changeBillingDetails,
      countriesList,
      country,
      currentAddressId,
      handleAddNewAddressBtnClick,
      handleAddressSubmit,
      handleSetCurrentAddress,
      handleCheckSameAddress,
      hasSavedBillingAddress,
      isAuthenticated,
      isFormSubmitted,
      isBillingDetailsStepCompleted,
      load,
      loading,
      NOT_SELECTED_ADDRESS,
      regionInformation,
      searchCountry,
      setAsDefault,
      billingDetails,
      sameAsShipping,
      nextStep,
      preStep,
      spinnerStatus,
      newAddressform,
      openAddressform
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}
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

.invisible-element {
  opacity: 0;
}

.span-from {
  width: 100%;
  z-index: -1 !important;
}
.copy-wrap {
  text-align: center;
  width: 100%;
  z-index: -1 !important;
}
.form__action {
  //  z-index: -1 !important;
   button {
     z-index: 10;
   }
}

.billingtitle {
  color: #2C354E;
  font-size: 1.7rem;
  line-height: 1.2;
  font-family: "leksa", serif;
  letter-spacing: -0.035em;
  right: auto;
  bottom: auto;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 40px;
}
</style>
