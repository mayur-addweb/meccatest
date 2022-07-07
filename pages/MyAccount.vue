<template>
  <div id="my-account" class="categories wishlist-content">
    <div class="container">
      <div class="row">
        <div class="col-">
          <div class="breadcrumb-sec d-none d-md-block">
					<div class="container">
						<div class="breadcrumb-wrapper" aria-label="breadcrumb">
							<ol v-for="val,index in breadcrumbs" :key="index" class="breadcrumb">
							  <li class="breadcrumb-item"><nuxt-link :to="val.link ? splitHTML(val.link) : '!#'">{{ val.text }} </nuxt-link> <span v-if="breadcrumbs && index < breadcrumbs.length-1">></span> </li>
							</ol>
						</div>
					</div>
				</div>
        </div>
      </div>
      <AwContentPages
        v-e2e="'my-account-content-pages'"
        title="Your Account"
        :active="activePage"
        @click:change="changeActivePage"
      >

            <AwContentPage title="Addresses details">
              <AddressesDetails />
            </AwContentPage>
            <AwContentPage title="Manage Account">
              <MyProfile />
            </AwContentPage>
            <AwContentPage title="Orders">
              <OrderHistory />
            </AwContentPage>
            <AwContentPage title="Wishlist">
            <MyWishlist />
            </AwContentPage>
    </AwContentPages>
    </div>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import { useUser } from '@vue-storefront/magento';
import {
  mapMobileObserver,
  unMapMobileObserver,
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import MyProfile from './MyAccount/MyProfile.vue';
import AddressesDetails from './MyAccount/AddressesDetails.vue';
import MyWishlist from './MyAccount/MyWishlist.vue';
import OrderHistory from './MyAccount/OrderHistory.vue';
import AwContentPages from '../pages/AwComponents/organisms/AwContentPages.vue'

export default defineComponent({
  name: 'MyAccount',
  components: {
    AddressesDetails,
    MyProfile,
    MyWishlist,
    OrderHistory,
    AwContentPages,
  },
  middleware: [
    'is-authenticated',
  ],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { logout } = useUser();
    const { localePath } = useContext();
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const breadcrumbs = ref([
      {
        text: 'Home',
        route: { link: '#' },
      },
      {
        text: 'Account',
        route: { link: '#' },
      },
    ]);

    const activePage = computed(() => {
      const { pageName } = route.value.params;
      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      } if (!isMobile.value) {
        return 'My profile';
      }
      return '';
    });

    const changeActivePage = async (title) => {
      if (title === 'Log out') {
        await logout();
        await router.push(localePath({ name: 'home' }));

        return;
      }

      const slugifiedTitle = (title || '').toLowerCase().replace(' ', '-');
      const transformedPath = `/my-account/${slugifiedTitle}`;

      const localeTransformedPath = localePath(transformedPath);
      await router.push(localeTransformedPath);
    };

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      activePage,
      breadcrumbs,
      changeActivePage,
    };
  },
});
</script>

<style lang='scss' scoped>
.my-account {
  @include for-mobile {
    --content-pages-sidebar-category-title-font-weight: var(
      --font-weight--normal
    );
    --content-pages-sidebar-category-title-margin: var(--spacer-sm)
      var(--spacer-sm) var(--spacer-sm) var(--spacer-base);
  }
  @include for-desktop {
    --content-pages-sidebar-category-title-margin: var(--spacer-xl) 0 0 0;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) 0 var(--spacer-lg);
}
.sf-content-pages {
  height: auto;
}
::v-deep .sf-content-pages__content {
  height: auto;
}
.sf-content-pages__content {
  height: auto;
}
</style>
