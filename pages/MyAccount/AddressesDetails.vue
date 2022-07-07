<template>
  <transition name="fade">
    <AwTabs
      v-if="editingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <AwTab
        :title="isNewAddress ? 'Add the address' : 'Update the address'"
      >
        <h2 class="sec-title">
          {{ $t('Contact details updated') }}
        </h2>

        <AddressForm
          :address="activeAddress"
          :is-new="isNewAddress"
          @submit="saveAddress"
        />
      </AwTab>
    </AwTabs>

    <AwTabs
      v-else
      key="address-list"
      :open-tab="1"
      class="tab-orphan"
    >
      <AwTab title="Addresses details">
        <h2 class="sec-title">
          {{ $t('Manage addresses') }}
        </h2>
        <transition-group
          tag="div"
          name="fade"
          class="addresses-list"
        >
          <div
            v-for="address in userAddresses"
            :key="userAddressesGetters.getId(address)"
            class="addresses"
          >
            <div class="addresses__content">
              <div class="addresses__address">
                <UserAddressDetails :address="address" />
              </div>
            </div>
            <div class="addresses__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="smartphone-only"
                @click="removeAddress(address)"
              />
              <SfButton
                @click="changeAddress(address)"
                class="change-add"
              >
               <span> {{ $t('Change') }} </span>
              </SfButton>

              <SfButton
                v-if="!userAddressesGetters.isDefault(address)"
                class="color-light addresses__button-delete desktop-only change-add delete"
                @click="checkRemoveAdd(address)"
              >
                <span>{{ $t('Delete') }} </span>
              </SfButton>
                <!-- <button onclick="document.getElementById('id01').style.display='block'">Open Modal</button> -->
           <template>
             <div id="id01" class="modal" :style=" showDelete ?'display :block': 'display :none'"> 

  <div class="modal-content">
     
    <div class="container">
      <span @click="showDelete=false" class="close" title="Close Modal">&times;</span>
      <div>
       <h4>Are you sure you want to delete your Address?</h4>
      </div>
      

      <div class="clearfix">
         <SfButton
                @click="showDelete=false"
                class="change-add"
              >
               <span> {{ $t('Cancel') }} </span>
              </SfButton>
         <SfButton
                v-if="!userAddressesGetters.isDefault(address)"
                class="color-light addresses__button-delete desktop-only change-add delete"
                @click="removeAddress(addressId )"
              >
                <span>{{ $t('Delete') }} </span>
              </SfButton>
      </div>
    </div>
  </div>

</div>
           </template>


            </div>
          </div>
        </transition-group>
        <SfButton
          class="action-button"
          @click="changeAddress()"
        >
         <span> {{ $t('Add new address') }} </span>
        </SfButton>
      </AwTab>
    </AwTabs>
  </transition>
  
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfIcon,
} from '@storefront-ui/vue';
import { userAddressesGetters, useAddresses } from '@vue-storefront/magento';
import { ref,computed, defineComponent, useRouter, useRoute } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import AddressForm from '~/components/MyAccount/AddressForm.vue';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import AwTabs from '../../pages/AwComponents/organisms/AwTabs.vue'

export default defineComponent({
  name: 'ShippingDetails',
  components: {
    AwTabs,
    SfButton,
    SfIcon,
    UserAddressDetails,
    AddressForm,
    userAddressesGetters
  },
  setup() {
    const showDelete=ref(false);
    const addressId =ref(null);
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
        showDelete.value=false
      }    
    };
    const checkRemoveAdd = async (address) => {
        showDelete.value = true;
        addressId.value = address;
        

    };

    const saveAddress = async ({ form, onComplete, onError }) => {
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
      showDelete,
      changeAddress,
      update,
      removeAddress,
      saveAddress,
      userAddressesGetters,
      userAddresses,
      editingAddress,
      activeAddress,
      isNewAddress,
      checkRemoveAdd,
      addressId
    };
  },
});
</script>

<style lang='scss' scoped>

.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}

.addresses-list {
  margin-bottom: var(--spacer-base);
}

.addresses {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);
  @media all and (max-width: 767px) { 
    display: block;
    position: relative;
  } 

  span.smartphone-only.sf-icon {
    position: absolute;
    right: 10px;
    top: 40px;
  }
   .sf-icon-path {
      background: transparent !important;
    }

  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }

  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }

  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &__button-delete {
    color: var(--c-link);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }

  &__address {
    margin: 0;

    p {
      margin: 0;
    }
  }

  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}

.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}

.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}

h2.sec-title {
    font-size: 20px;
    margin-bottom: 36px;
    font-weight: 600;
    color: #2C354E;
}

.change-add {
  width: 140px;
}
.change-add.delete {
  background: #C6B075 !important;
}

.addresses__actions {
   @media all and (max-width: 767px) { 
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    flex-direction: row;
  }
  .change-add {
    @media all and (max-width: 767px) { 
      width: 50%;
      height: 30px;
    }
  }

}





/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Float cancel and delete buttons and add an equal width */

/* Add padding and center-align text to the container */
.container {
  padding: 16px;
  text-align: center;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color:transparent;
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: white;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* The Modal Close Button (x) */
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: black;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

/* Clear floats */
.clearfix {
  // content: "";
  // clear: both;
  // display: table;
   display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

/* Change styles for cancel button and delete button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .deletebtn {
    width: 100%;
  }
}
</style>