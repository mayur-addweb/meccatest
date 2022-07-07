import { computed, reactive, useRoute } from '@nuxtjs/composition-api';

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isWishlistGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  searchResults: null,
  isRegisterFlag: false,
  isCheckoutPopup: false,
  checkoutstep: 1,
  newAddressform: false
});

const useUiState = () => {
  const route = useRoute()

  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
  const toggleMobileMenu = () => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  };

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    if(document.body.classList.contains('disable-page')) 
    {
    document.body.classList.remove('disable-page');
    }
    else {
    document.body.classList.add('disable-page');

    }
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
   
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const isRegisterFlagOn = computed(() => state.isRegisterFlag);

  const toggleLoginModal = () => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;

    if (route.value.params.registerFlag ==='on') {
      state.isRegisterFlag = true
    } else {
      state.isRegisterFlag = false
    }
  };

  const newAddressform = computed(() => state.newAddressform);

  const closeAddressform = () => {
    state.newAddressform = false
  }

  const openAddressform = () => {
    state.newAddressform = true
  }

  const toggleAddressForm = () => {
    state.newAddressform = !state.newAddressform
  }

  const isCheckoutPopup = computed(() => state.isCheckoutPopup);

  const toggleCheckoutModal = () => {
    state.isCheckoutPopup = !state.isCheckoutPopup
  }

  const checkoutstep = computed(() => state.checkoutstep);

  const changeStep = (step) => {
    state.checkoutstep = step
  };

  const nextStep = () => {
      state.checkoutstep = state.checkoutstep + 1; 
  };

  const preStep = () => {
    state.checkoutstep = state.checkoutstep - 1;
  };

  const resetStep = () => {
    state.checkoutstep = 1;
  }


  const getSlugLink = (product, isAlgoliaProduct) => {
    let slug = null

    if (isAlgoliaProduct === true) {
      const splitSlug = product.url.split("/");
			slug = splitSlug[splitSlug.length - 1];
    } else {
      slug = product.url_key
    }

    let sku = '';

    if (typeof product.sku === "object") {
      sku = product.sku[0];
    } else {
      sku = product.sku;
    }

    const link = `/p/${sku}/${slug}`;
    return link
  }

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen);
  const toggleNewsletterModal = () => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);

  const isWishlistGridView = computed(() => state.isWishlistGridView);

  const changeToCategoryGridView = () => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = () => {
    state.isCategoryGridView = false;
  };

  const changeToWishlistGridView = () => {
    state.isWishlistGridView = true;
  };

  const changeToWishlistListView = () => {
    state.isWishlistGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  const setSearchResults = (results) => {
    state.searchResults = results
  }

  const getSearchResults = computed(() => {
    return state.searchResults
  })

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isWishlistGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    changeToWishlistGridView,
    changeToWishlistListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    isRegisterFlagOn,
    isCheckoutPopup,
    toggleCheckoutModal,
    checkoutstep,
    changeStep,
    nextStep,
    preStep,
    setSearchResults,
    getSearchResults,
    getSlugLink,
    newAddressform,
    toggleAddressForm,
    closeAddressform,
    openAddressform,
    resetStep
  };
};

export default useUiState;
