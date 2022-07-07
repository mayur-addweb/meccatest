<template>
  <div>
    <TopBar class="desktop-only" />
    <div id="layout">
      <Header />
      <nuxt />
      <CartSidebar />
      <LoginModal />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";
import Header from "~/components/Header.vue";
import TopBar from "~/components/TopBar.vue";
import CartSidebar from "~/components/CartSidebar.vue";
import LoginModal from "~/components/LoginModal.vue";

export default {
  name: "AccountLayout",

  components: {
    TopBar,
    AppHeader,
    Header,
    CartSidebar,
    LoginModal,
  },
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

body {
  padding: 0;
  margin: 0;
}

</style>
