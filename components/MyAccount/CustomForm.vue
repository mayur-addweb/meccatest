<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="address-form p-0"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="coln-two d-md-flex justify-content-between">
        <div class="input-wrap">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          name="firstname"
          class="form__element"
        >
          <AwInput
            v-model="form.firstname"
            name="firstname"
            label="First Name*"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        </div>
        <div class="input-wrap">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          name="lastname"
          class="form__element"
        >
          <AwInput
            v-model="form.lastname"
            name="lastname"
            label="Last Name*"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        </div>
      </div>
      <div class="coln-two d-md-flex justify-content-between">

<div class="input-wrap input-shipping">
<ValidationProvider
v-slot="{ errors }"
rules="required|numeric|min:8"
name="telephone"
class="form__element"
>
<AwInput
v-model="form.telephone"
name="telephone"
label="Mobile Phone*"
:valid="!errors[0]"
:error-message="errors[0]"
/>
</ValidationProvider>
</div>
</div>
      <div class="coln-two d-md-flex justify-content-between">
        <div class="input-wrap input-shipping ship-bot">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="street"
            class="form__element"
          >
          <label class="text-uppercase">shipping address*</label>
            <input
              v-model="form.apartment"
              class="form-control"
              ref="streett"
              name="street"
              label="Shipping Addresss*"   
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="input-wrap input-country">
        <ValidationProvider
          v-slot="{ errors }"
          name="country_code"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-model="form.country_code"
            label="Country*"
            name="country"
            class="form__select sf-select--underlined select-input"
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="searchCountry({ id:$event })"
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
      
      <div class="coln-two d-md-flex justify-content-between ship-top">
        <div class="input-wrap input-shipping">
          <AwInput
          v-model="form.street"
          name="apartment"
          label="shipping address line 2" 
          class="form__element"
        />
        </div>
      </div>
      <div class="coln-three d-md-flex justify-content-between">
        <div class="input-wrap input-zip">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:4"
          name="postcode"
          class="form__element"
        >
          <AwInput
            v-model="form.postcode"
            name="postcode"
            label="Zip Code*"         
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        </div>
        <div class="input-wrap input-city">
          <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          class="form__element"
        >
          <AwInput
            v-model="form.city"
            name="city"
            label="City*"
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        </div>
        <div class="input-wrap input-state">
           <ValidationProvider
          v-slot="{ errors }"
          name="region"
          :rules="!form.country_code || regionInformation.length === 0 ? null : 'required|min:2'"
          slim
        >
          <AwInput
            v-if="!form.country_code || regionInformation.length === 0"
            v-model="form.region.region"
            v-e2e="'shipping-state'"
            label="State*"
            :disabled="!form.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            :valid="!!form.country_code"
            :error-message="!form.country_code ? 'Please select a country first' : ''"
          />
          <SfSelect
            v-else
            v-model="form.region.region_code"
            v-e2e="'shipping-state'"
            label="State*"
            name="state"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            :valid="!errors[0]"
            :error-message="errors[0]"
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
        </div>
      </div>
     
      <!-- <SfCheckbox
        v-model="form.default_shipping"
        name="isDefaultShipping"
        label="Set as default shipping"
        class="form__checkbox-isDefaultShipping"
      />
      <SfCheckbox
        v-model="form.default_billing"
        name="isDefaultBilling"
        label="Set as default billing"
        class="form__checkbox-isDefaultBilling"
      /> -->
      <button class="btn larg-btn">
        <span>{{ isNew ? "Add Address" : "Update the address" }}</span>
      </button>      
    </form>
  </ValidationObserver>
</template>

<script type="module">
import {
  SfButton,
  SfSelect,
  SfCheckbox,
} from '@storefront-ui/vue';
import {
  addressGetter,
  useAddresses,
  useCountrySearch,
} from '@vue-storefront/magento';
import { required, min, oneOf,numeric,alpha,alpha_num } from 'vee-validate/dist/rules';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate';
import {
  reactive,
  ref,
  computed,
  onBeforeMount,
  defineComponent,
  onMounted,
} from '@nuxtjs/composition-api';
import omitDeep from 'omit-deep';
import AwInput from '../../pages/AwComponents/atoms/AwInput.vue'

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('alpha', {
  ...alpha,
  message: 'Please Enter a valid city Name',
});
extend('alpha_num', {
  ...alpha_num,
  message: 'Please Enter a valid Zip code',
});
extend('numeric', {
  ...numeric,
  message: 'Please Enter a Valid Mobile Number',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country',
});

export default defineComponent({
  name: 'AddressForm',

  components: {
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    AwInput,
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        id: undefined,
        apartment: '',
        city: '',
        country_code: '',
        firstname: '',
        lastname: '',
        postcode: '',
        region: {
          region_code: '',
          region_id: 0,
        },
        street: '',
        telephone: '',
        default_shipping: false,
        default_billing: false,
      }),
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
      const autocomplete = new google.maps.places.Autocomplete(this.$refs['streett']);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);
        this.form.apartment = place.formatted_address;

        for(var i = 0; i < place.address_components.length; i += 1) {
          var addressObj = place.address_components[i];
          for(var j = 0; j < addressObj.types.length; j += 1) {
            if (addressObj.types[j] === 'route') {
              console.log(addressObj.types[j]); // confirm that this is 'state'
              console.log(addressObj.short_name); // confirm that this is the state name
              this.form.street = addressObj.long_name;
            }
            if (addressObj.types[j] === 'sublocality_level_2') {
              console.log(addressObj.types[j]); // confirm that this is 'state'
              console.log(addressObj.short_name); // confirm that this is the state name
              this.form.street += ", " + addressObj.long_name;
            }
            if (addressObj.types[j] === 'administrative_area_level_1') {
              console.log(addressObj.types[j]); // confirm that this is 'state'
              console.log(addressObj.short_name); // confirm that this is the state name
              // this.form.region.region = addressObj.long_name;
              this.form.region.region_code = addressObj.short_name;
            }
            if (addressObj.types[j] === 'locality') {
              console.log(addressObj.types[j]); // confirm that this is 'state'
              console.log(addressObj.long_name); // confirm that this is the state name
              this.form.city = addressObj.long_name;
            }
            if (addressObj.types[j] === 'postal_town') {
              console.log(addressObj.types[j]); // confirm that this is 'state'
              console.log(addressObj.long_name); // confirm that this is the state name
              this.form.city = addressObj.long_name;
            }
            if (addressObj.types[j] === 'postal_code') {
              console.log(addressObj.types[j]); // confirm that this is 'state'
              console.log(addressObj.long_name); // confirm that this is the state name
              this.form.postcode = addressObj.long_name;
            }
            if (addressObj.types[j] === 'country') {
              console.log(addressObj.types[j]); // confirm that this is 'country'
              console.log(addressObj.short_name); // confirm that this is the country name
              this.form.country_code = addressObj.short_name;
              this.searchCountry({ id:addressObj.short_name })
            }
          }
        }

       })
},

  setup(props, { emit }) {
    const {
      load: loadCountries,
      countries,
      search: searchCountry,
      country,
    } = useCountrySearch('my-account-shipping');

    const {
      load,
    } = useAddresses();

    const form = reactive({
      apartment: props.address.apartment,
      city: props.address.city,
      country_code: props.address.country_code,
      firstname: props.address.firstname,
      lastname: props.address.lastname,
      postcode: props.address.postcode,
      region: {
        region_code: '',
        region_id: null,
        ...props.address.region,
      },
      street: props.address.street,
      telephone: props.address.telephone,
      default_shipping: props.address.default_shipping,
      default_billing: props.address.default_billing,
      ...(props.isNew ? {} : { id: props.address.id }),
    });
    // @ts-ignore
    const origin = ref(null);
    const countriesList = computed(() => addressGetter.countriesList(countries.value));
    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const submitForm = () => {
      if (form.region.region_code) {
        console.log(form.region.region_code,'form.region.region_code');
        form.region.region_id = regionInformation.value.find((r) => r.abbreviation === form.region.region_code).id;
      }

      emit('submit', {
        form: omitDeep(form, ['__typename']),
        onComplete: async () => {
          await load();
        },
        // TODO: Handle Error
        onError: () => {},
      });
    };

    onBeforeMount(async () => {
      await loadCountries();
      if (props.address.country_code) {
        console.log(props.address.country_code,'props.address.country_code');
        await searchCountry({ id: props.address.country_code });
      }
    });

    onMounted(()=> {
        console.log(form,"form");
    })

    return {
      form,
      submitForm,
      countriesList,
      regionInformation,
      searchCountry,
      origin
    };
  },
});
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }

  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }

  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }

  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.btn.larg-btn {
  margin-top: 60px;
}
.ship-top {
  @media all and (max-width: 767px) {
    margin-top: 43px;
  }
}
.ship-bot {
  @media all and (max-width: 767px) {
    margin-bottom: 35px;
  }
}
.form__element {
    @media all and (max-width: 767px) {
    margin-bottom: 0px;
  }
}
</style>
