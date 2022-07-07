<template>
  <div>
    <Header :magentoURL="$config.magentoURL" :drupalURL="$config.drupalURL" />

    <div id="layout">
      <nuxt :key="route.fullPath" />

      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
import { onSSR } from "@vue-storefront/core";
import { useRoute, defineComponent } from "@nuxtjs/composition-api";
import { useCart, useUser } from "@vue-storefront/magento";
import AppHeader from "~/components/AppHeader.vue";
import Header from "~/components/Header.vue";
import AppFooter from "~/components/AppFooter.vue";
import TopBar from "~/components/TopBar.vue";
import CartSidebar from "~/components/CartSidebar.vue";
import WishlistSidebar from "~/components/WishlistSidebar.vue";
import LoginModal from "~/components/LoginModal.vue";
import Notification from "~/components/Notification";
import { useMagentoConfiguration } from "~/composables/useMagentoConfiguration";

export default defineComponent({
  name: "DefaultLayout",

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
    Header,
  },

  setup() {
    const route = useRoute();
    const { load: loadUser } = useUser();
    const { load: loadCart } = useCart();

    const { loadConfiguration } = useMagentoConfiguration();

    onSSR(async () => {
      await loadConfiguration();
      await Promise.all([loadUser(), loadCart()]);
    });

    return {
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
</style>
