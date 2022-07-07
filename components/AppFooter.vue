<template>
  <footer class="footer" 
   :style="$route.path.includes('kids') ? 'background-image: url(/meccabook/kids-bg-img.png)' : 'background-image: url()'">
    <div class="container">
      <div class="row" v-if="$route.path !== '/landing'">
        <div class="col-12"  >
          <div
            class="feature-block"
            v-if="
              home &&
              home.components &&
              home.components.middle &&
              home.components.middle.four_column_content
            "
          >
            <div
              class="feature-wrap"
              v-for="item in home.components.middle
                .four_column_content"
              :key="item.image.url"
            >
              <div class="feature-icon">
                <img class="feature-four-icons" :src="item.image.url" :alt="item.image.alt">
              </div>
              <div class="feature-info">
                <h4>{{ item.title }}</h4>
                <p v-html="item.description.text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            class="primary-footer"
            v-if="menu && menu.footer"
          >
            <client-only>
            <template v-for="item in menu.footer">
              <div class="test" v-if="item.name" :key="item.name">
                <div class="links-wrap">
                  <h4 class="links-tl">{{ item.name }}</h4>
                  <ul class="footer-links" v-if="item.name">
                    <li v-for="subitem in item.child" :key="subitem[0].name">
                      <div
                        v-if="!isAuthenticated && subitem[0].url == '/login'"
                        @click="handleAccountClick"
                      >
                        <nuxt-link to="#!">
                          {{ subitem[0].name }}
                        </nuxt-link>
                      </div>

                      <div
                        v-if="
                          subitem[0].url == '/logout' && isAuthenticated
                        "
                        @click="logoutFunc"
                      >
                        <nuxt-link to="">{{ subitem[0].name }}</nuxt-link>
                      </div>
                      
                      <div
                      v-if="
                          subitem[0].url == '/my-account' && isAuthenticated
                        "
                        @click="handleAccountClick"
                      >

                      <nuxt-link to="">{{ subitem[0].name }}</nuxt-link>
                       </div>
                      <nuxt-link
                        :to="subitem[0].url"
                        v-else-if="
                          subitem[0].url !== '/login' &&
                          subitem[0].url !== '/logout' &&
                          subitem[0].url !== '/my-account'
                        "
                        >{{ subitem[0].name }}</nuxt-link
                      >

                      <div
                        v-if="!isAuthenticated && subitem[0].url == '/login'"
                        @click="showRegisterForm"
                      >
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            </client-only>
            <div class="subscribe-wrap"
              :style="$route.path.includes('kids') ? 'background-image: url(/meccabook/kids-bg-img.png)' : 'background-image: url()'">
              <div class="klaviyo-form-WpCtWK"></div>
              <div class="social-links">
                <div class="social-wrap">
                  <a href="https://www.facebook.com/meccabooks/" target="_blank">
                    <i class="icon-facebook"></i>
                  </a>
                </div>
                <div class="social-wrap">
                  <a href="https://www.instagram.com/meccabooks/" target="_blank">
                    <i class="icon-insta"></i>
                  </a>
                </div>
                <div class="social-wrap">
                  <a href="https://twitter.com/meccabooks" target="_blank">
                    <i class="icon-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="copyright-info">&copy; Mecca Books 2021</div>
        </div>
      </div>
    </div>
    <div class="chat-wrap">
      <router-link to="#">
        <div class="chat-btn-wrap">
          <i class="icon-chat"></i>
          <span class="chat-txt">Live Chat</span>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { onSSR } from "@vue-storefront/core";
import { useUser } from "@vue-storefront/magento";
import { SfFooter, SfList, SfImage, SfMenuItem } from "@storefront-ui/vue";
import { useUiState } from "~/composables";
import { useRoute, useRouter, useContext, ssrRef } from "@nuxtjs/composition-api";

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
  },
  setup() {
    const { isAuthenticated, logout } = useUser();
    const { toggleLoginModal } = useUiState();
    const route = useRoute();
    const router = useRouter();
    const { localePath } = useContext();

    const home = ssrRef(null);
    const menu = ssrRef(null);

    const fetchHome = async () => {
      let homeURL = process.env.DEV_MECCABOOK + '/api/content/56'
      let data = await fetch(homeURL).then(res => res.json());
      return data;
    };

    const fetchMenu = async () => {
      let menuURL = process.env.DEV_MECCABOOK + '/api/menu'
      let data = await fetch(menuURL).then(res => res.json());
      return data;
    };



    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push("/my-account/manage-account");
      } else {
        toggleLoginModal();
      }
    };

    const showRegisterForm = () => {
      route.value.params.registerFlag = "on";
      toggleLoginModal();
    };

    const logoutFunc = async () => {
      await logout();
      await router.push(localePath({ name: "home" }));

      return;
    };

    onSSR(async () => {
      home.value = await fetchHome();
      menu.value = await fetchMenu();
    });

    return {
      isAuthenticated,
      handleAccountClick,
      showRegisterForm,
      logoutFunc,
      home,
      menu
    };
  },
  data() {
    return {
      aboutUs: ["Who we are", "Quality in the details", "Customer Reviews"],
      departments: ["Women fashion", "Men fashion", "Kidswear", "Home"],
      help: ["Customer service", "Size guide", "Contact us"],
      paymentsDelivery: ["Purchase terms", "Guarantee"],
      social: ["facebook", "pinterest", "google", "twitter", "youtube"],
      isMobile: false,
      desktopMin: 1024,
    };
  },
  mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Vu2zry')
      document.head.appendChild(recaptchaScript)
    },
};
</script>

<style lang="scss">
.footer {
  @include for-desktop {
    margin-bottom: 0;
  }
  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);
    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }
  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
  }
}
.sf-footer {
  @include for-desktop {
    border-top: var(--spacer-xs) solid var(--c-primary);
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }
  &__container {
    margin: var(--spacer-sm);
    @include for-desktop {
      max-width: 69rem;
      margin: 0 auto;
    }
  }
}
</style>
