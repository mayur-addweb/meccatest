<template>
  <div
    class="inline-flex relative dropdown"
    data-testid="accountButton"
    @click.self="
      goToRegisterAccount();
      showMenu = true;
      changeDropdown();
    "
    @keyup.enter="goToRegisterAccount"
    tabindex="0"
    role="button"
    @mouseover="showMenu = true"
    @mouseout="showMenu = false"
    :aria-label="$t('Open my account')"
  >
    <!-- <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.0556 18.6836V16.6836C17.0556 14.4745 15.2597 12.6836 13.0444 12.6836H5.02222C2.80694 12.6836 1.01111 14.4745 1.01111 16.6836V18.6836" stroke="#2C354E" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.03333 8.68359C11.2486 8.68359 13.0444 6.89273 13.0444 4.68359C13.0444 2.47445 11.2486 0.683594 9.03333 0.683594C6.81805 0.683594 5.02222 2.47445 5.02222 4.68359C5.02222 6.89273 6.81805 8.68359 9.03333 8.68359Z" stroke="#2C354E" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> -->
    <!-- <router-link-button> <span>Sign In</span> </router-link-button> -->

    <!-- <div class="btn-wrp"> -->
      <button type="button">
        <button type="submit">
          <span> Register </span>
        </button>
      </button>
    <no-ssr>
      <div
        v-show="currentUser"
        :class="[
          'dropdown-content bg-cl-primary align-left sans-serif lh20 weight-400',
          !showMenu ? 'dropdown-content__hidden' : '',
        ]"
      >
        <div class="py5">
          <div
            v-for="(page, index) in navigation"
            :key="index"
            @click="notify(page.title)"
          >
            <router-link
              @click.native="showMenu = false"
              class="no-underline block py10 px15"
              :to="localizedRoute(page.link)"
            >
              {{ page.title }}
            </router-link>
          </div>
        </div>
        <div class="py5 brdr-top-1 brdr-cl-bg-secondary">
          <a
            href="#"
            class="no-underline block py10 px15"
            @click.prevent="logout"
          >
            {{ $t("Logout") }}
          </a>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from "vue-no-ssr";
import RouterLinkButton from "../../RouterLinkButton";
import AccountIcon from "@vue-storefront/core/compatibility/components/blocks/Header/AccountIcon";

export default {
  mixins: [AccountIcon],
  components: {
    "no-ssr": NoSSR,
    RouterLinkButton,
  },
  data() {
    return {
      showMenu: false,
      navigation: [
        { title: this.$t("My profile"), link: "/my-account" },
        {
          title: this.$t("My shipping details"),
          link: "/my-account/shipping-details",
        },
        { title: this.$t("My newsletter"), link: "/my-account/newsletter" },
        { title: this.$t("My orders"), link: "/my-account/orders" },
        { title: this.$t("My loyalty card"), link: "#" },
        { title: this.$t("My product reviews"), link: "#" },
        {
          title: this.$t("My Recently viewed products"),
          link: "/my-account/recently-viewed",
        },
      ],
    };
  },
  methods: {
    notify(title) {
      if (title === "My loyalty card" || title === "My product reviews") {
        this.$store.dispatch("notification/spawnNotification", {
          type: "warning",
          message: this.$t(
            "This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!"
          ),
          action1: { label: this.$t("OK") },
        });
      }
    },
    changeDropdown() {
      this.$emit('showHideFunc');
    }
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/base/global_vars";
@import "assets/css/variables/colors";
@import "assets/css/helpers/functions/color";
$color-icon-hover: color(secondary, $colors-background);

.dropdown {
  button {
    pointer-events: none;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  a {
    opacity: 0.6;

    &:hover,
    &:focus {
      background-color: $color-icon-hover;
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    &:hover .dropdown-content:not(.dropdown-content__hidden),
    &:focus .dropdown-content:not(.dropdown-content__hidden) {
      display: block;
    }

    &:focus-within {
      background-color: $color-icon-hover;
      opacity: 1;
      .dropdown-content:not(.dropdown-content__hidden) {
        display: block;
      }
    }
  }
}
</style>
