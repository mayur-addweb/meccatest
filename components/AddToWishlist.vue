<template>
  <component :is="component" v-if="isShow" @click="$emit('addToWishlist')">
    <AwButton :class="isInWishlist ? 'sf-button--text active' : 'sf-button--text'">
      <svg data-v-26d37bd6="" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-26d37bd6="" fill-rule="evenodd" clip-rule="evenodd" d="M15 19.2987L8 14.2987L1 19.2987V3.29871C1 2.19414 1.89543 1.29871 3 1.29871H13C14.1046 1.29871 15 2.19414 15 3.29871V19.2987Z" stroke="#C6B075" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      <span class="wishlist-txt text"> {{ $t(actionText) }}</span>
    </AwButton>
  </component>
  <component :is="component" v-else class="wishlist-wrap">
    <button @click="toggleLoginModal()">
      <i class="icon-wishlist"></i>
      <span class="text">Add to wishlist</span>
    </button>
  </component>
</template>

<script>
import { defineComponent, computed } from "@nuxtjs/composition-api";
import { SfIcon, SfButton } from "@storefront-ui/vue";
import AwButton from "../pages/AwComponents/atoms/AwButton.vue";
import { useUiState } from "~/composables";

export default defineComponent({
  name: "AddToWishlist",
  components: {
    SfIcon,
    AwButton,
  },
  props: {
    component: {
      type: String,
      default: "span",
    },
    isInWishlist: {
      type: Boolean,
      default: false,
    },
    wishlistIcon: {
      type: String,
      default: "heart",
    },
    isInWishlistIcon: {
      type: String,
      default: "heart_fill",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const actionText = computed(() =>
      props.isInWishlist ? "Remove from wishlist" : "Add to wishlist"
    );

    const { toggleLoginModal } = useUiState();

    return {
      actionText,
      toggleLoginModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-to-wishlist {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__content {
    margin-left: 5px;
    display: flex;
  }
}
.active {
  svg {
    fill: #C6B075 !important;
  }
}
</style>
