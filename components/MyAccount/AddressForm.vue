<template>
<ValidationObserver v-slot="{ handleSubmit }" class="account-addform">
<form
id="shipping-details-form"
class="form shipping-popup account-add"
@submit.prevent="handleSubmit(submitForm)"
>
<div class="coln-two d-md-flex justify-content-between">
<div class="input-wrap">
<ValidationProvider
v-slot="{ errors }"
rules="required|alpha|min:2"
name="firstname"
class="form__element"
>
<AwInput
v-model="form.firstname"
name="firstname"
label="First Name"
:valid="!errors[0]"
:error-message="errors[0]"
/>
</ValidationProvider>
</div>
<div class="input-wrap">
<ValidationProvider
v-slot="{ errors }"
rules="required|alpha|min:2"
name="lastname"
class="form__element"
>
<AwInput
v-model="form.lastname"
name="lastname"
label="Last Name"
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
<div class="input-wrap input-shipping">
<ValidationProvider
v-slot="{ errors }"
rules="required"
name="street"
class="form__element"
>

<AwInput
v-model="form.street"
name="street"
label="Street Name"
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
label="COUNTRY*"
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
<div class="coln-two d-md-flex justify-content-between">
<div class="input-wrap input-shipping">
<ValidationProvider
v-slot="{ errors }"
rules="required"
name="street"
class="form__element"
>    
<AwInput
v-model="form.apartment"
name="apartment"
label="House/Apartment number"
class="form__element"
:valid="!errors[0]"
:error-message="errors[0]"
/>
</ValidationProvider>
</div>
</div>
<div class="coln-three d-md-flex justify-content-between">
<div class="input-wrap input-city">
<ValidationProvider
v-slot="{ errors }"
rules="required|alpha|min:2"
class="form__element"
>
<AwInput
v-model="form.city"
name="city"
label="City"
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
label="State/Province"
:disabled="!form.country_code"
name="state"
class="form__element form__element--half form__element--half-even"
:valid="!!form.country_code"
:error-message="!form.country_code ? '' : ''"
/>
<SfSelect
v-else
v-model="form.region.region_code"
v-e2e="'shipping-state'"
label="State/Province"
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
<div class="input-wrap input-zip">
<ValidationProvider
v-slot="{ errors }"
rules="required|alpha_num|min:4"
name="postcode"
class="form__element"
>
<AwInput
v-model="form.postcode"
name="postcode"
label="Zip-code"
:valid="!errors[0]"
:error-message="errors[0]"
/>
</ValidationProvider>
</div>
</div>
<SfCheckbox
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
/>
<SfButton class="form__button">
<span>{{ isNew ? "Add the address" : "Update the address" }}</span>
</SfButton>
</form>
</ValidationObserver>
</template>

<script type="module">
import {
// SfInput,
SfButton,
SfSelect,
SfCheckbox,
} from '@storefront-ui/vue';
import {
addressGetter,
useAddresses,
useCountrySearch,
} from '@vue-storefront/magento';
import { required, min, oneOf,numeric,alpha_num,regex } from 'vee-validate/dist/rules';
import {
ValidationProvider,
ValidationObserver,
extend,
} from 'vee-validate';
import {
reactive,
computed,
onBeforeMount,
defineComponent,
} from '@nuxtjs/composition-api';
import omitDeep from 'omit-deep';
import AwInput from '../../pages/AwComponents/atoms/AwInput.vue'

extend('regex', {
...regex,
message: 'Please Enter a valid mobile number',
});
extend('required', {
...required,
message: 'This field is required',
});
extend('numeric', {
...numeric,
message: 'Please Enter a valid Mobile Number',
});
extend('alpha_num', {
...alpha_num,
message: 'Please Enter a valid Zip Code',
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
AwInput,
SfButton,
SfSelect,
SfCheckbox,
ValidationProvider,
ValidationObserver,
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
const countriesList = computed(() => addressGetter.countriesList(countries.value));
const regionInformation = computed(() => addressGetter.regionList(country.value));

const submitForm = () => {
if (form.region.region_code) {
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
await searchCountry({ id: props.address.country_code });
}
});

return {
form,
submitForm,
countriesList,
regionInformation,
searchCountry,
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

.shipping-popup .input-wrap {
margin-bottom: 20px;
}
.shipping-popup {
padding-top: 15px;
}
.input-wrap.input-country .sf-select__dropdown {
padding: 5px 0;
}
.input-wrap.input-country {
  padding-top: 0;
  label.sf-select__label {
    text-transform: uppercase;
    
  }
}
</style>

