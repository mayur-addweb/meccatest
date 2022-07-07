<template>
  <div
    id="accountContainer"
    class="Mobile-container"
    @mouseover="showDrop"
    @mouseleave="closeDropDown"
  >
    <button
      type="button"
      class="bg-cl-transparent brdr-none p0"
      @click="showHideFunc"
      v-bind:class="{ active: isActive }"
    >
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.0556 18.6836V16.6836C17.0556 14.4745 15.2597 12.6836 13.0444 12.6836H5.02222C2.80694 12.6836 1.01111 14.4745 1.01111 16.6836V18.6836"
          stroke="#2C354E"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.03333 8.68359C11.2486 8.68359 13.0444 6.89273 13.0444 4.68359C13.0444 2.47445 11.2486 0.683594 9.03333 0.683594C6.81805 0.683594 5.02222 2.47445 5.02222 4.68359C5.02222 6.89273 6.81805 8.68359 9.03333 8.68359Z"
          stroke="#2C354E"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div
      v-bind:class="[!isVisible ? 'hidder-style' : 'show-style']"
      id="hideMe"
    >
      <!-- <div v-bind:class="[getDropdownStatus ? 'show-style' : 'hidder-style']"> -->
      <div class="signin-drpdwn">
        <account-icon :isVisible="isVisible" @showHideFunc="showHideFunc" />
        <account-register @showHideFunc="showHideFunc" />
        <!-- <router-link to="/" class="acc-link">Register</router-link> -->
        <router-link to="/" v-if="currentUser" class="acc-link"
          >Manage Account</router-link
        >
        <router-link to="/" v-if="currentUser" class="acc-link"
          >Orders</router-link
        >
        <router-link to="/" class="acc-link">Wishlist</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AccountIcon from "theme/components/core/blocks/Header/AccountIcon";
import AccountRegister from "theme/components/core/blocks/Header/AccountRegister";
import RouterLinkButton from "../../RouterLinkButton";
export default {
  props: {
    currentUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isVisible: false,
      isActive: false,
    };
  },
  mounted() {
    var accountContainer = document.getElementById("accountContainer");
    var dropdown = document.getElementsByClassName("signin-drpdwn");
    document.onclick = function (e) {
      if (e.target.id !== "accountContainer") {
        // dropdown.style.display = 'none';
        this.isVisible = false;
      }
    };
  },
  computed: {
    getDropdownStatus() {
      return this.$store.getters["homepage/getAccountDropdownStatuc"];
    },
    changeDropdownStatus() {
      return this.$store.getters["homepage/changeAccountDropdownStatuc"];
    },
  },
  components: {
    AccountIcon,
    RouterLinkButton,
    AccountRegister,
  },
  methods: {
    showHideFunc() {
      this.isVisible = !this.isVisible;
    },
    showDrop() {
      this.isVisible = true;
    },
    closeDropDown() {
      this.isVisible = false;
    },
    changeDropDown() {
      return this.$store.dispatch("homepage/ChangeDropdown");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~theme/css/base/global_vars";
@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";
$color-icon-hover: color(secondary, $colors-background);

// .Mobile-container {
//   // padding: 26px;
// }

.hidder-style {
  display: none;
}

.show-style {
  display: block;
}

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

  // @media (max-width: 767px) {
  //   .Mobile-container {
  //   padding: 0px !important;
  // }
  // }

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

@media (max-width: 752px) {
  .Mobile-container {
    padding: 0;
  }

  .signin-drpdwn {
    top: 60px !important;
  }
}

.signin-drpdwn {
  top: 100%;
  right: 0;
  bottom: auto;
  left: auto;
  position: absolute;
  background: #f1ede3;
  width: 160px;
  padding-bottom: 10px;
}
@media all and (min-width: 992px) {
  .signin-drpdwn {
    right: auto;
    transform: translateX(-50%);
  }
}
.signin-drpdwn .btn-wrp {
  padding: 10px 10px 5px;
}
.signin-drpdwn .btn-wrp .btn {
  display: block;
  width: 100%;
  padding: 7px 19px;
  letter-spacing: 0.08em;
}
.signin-drpdwn .acc-link {
  font-size: 0.875rem;
  display: block;
  text-align: center;
  line-height: 1.4;
  font-weight: 300;
  color: #2c354e;
  padding: 3px;
  transition: all 0.5s ease-in-out;
}
.signin-drpdwn .acc-link:hover {
  background: #fff;
}
</style>
