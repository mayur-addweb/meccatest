import DrupalAxios from "axios";
export default {
  state() {
    return {
      aboutUs: null,
      donations: null,
      events: null,
      upcomingEvents: null,
      articles: null,
      latestArticle: null,
      productDetail: null,
      home: null,
      menu: null,
      relatedProduct: null,
      landingPage:null,
      productConfigurable: null,
      kids:null,
      kidslatest:null,
      kidsfeatured:null,
      kidsPopular:null,
      browseBySubject: null,
      contactUs: null,
      homePopular: null,
      homeLatest: null,
      homeFeatured: null,
      donationsMagento: null,
      articleDetails: null,
      eventDetails: null,
      dynamicPageContent: null,
      ShortArray:['12','36','72','144'],
      top50: null,
      SignedBooks:null,
      eventsHide: null,
    }
    
  },
  

  getters: {
    getEventsHide: (state) =>state.eventsHide,
    getAboutusContent: (state) => state.aboutUs,
    getDonationsContent: (state) => state.donations,
    getEventsContent: (state) => state.events,
    getUpcomingEvents: (state) => state.upcomingEvents,
    getArticlesContent: (state) => state.articles,
    getLatestArticle: (state) => state.latestArticle,
    getProductDetail: (state) => state.productDetail,
    getHomeContent: (state) => state.home,
    getMenuContent: (state) => state.menu,
    getproductConfigurable: (state) => state.productConfigurable,
    getrelatedProduct: (state) => state.relatedProduct,
    getkidspage: (state) => state.kids,
    getkidslatest: (state) => state.kidslatest,
    getkidsfeatured: (state) => state.kidsfeatured,
    getkidsPopular: (state) => state.kidsPopular,
    getBrowseBySubject: (state) => state.browseBySubject,
    getrelandingPage: (state) => state.landingPage,
    getContactUs: (state) => state.contactUs,
    getHomePopular: (state) => state.homePopular,
    getHomeLatest: (state) => state.homeLatest,
    getHomeFeatured: (state) => state.homeFeatured,
    getDonationsMagento: (state) => state.donationsMagento,
    getArticleDetails: (state) => state.articleDetails,
    getEventDetails: (state) => state.eventDetails,
    getDynamicPageContent: (state) => state.dynamicPageContent,
    getShortArray:(state)=>state.ShortArray,
    gettop50:(state)=>state.top50,
    getSignedBooks:(state)=>state.SignedBooks,
  },

  mutations: {
    SET_EVENTS_HIDE(state, data) {
      state.eventsHide = data
    },
    SET_ABOUT_US(state, data) {
      state.aboutUs = data
    },
    SET_DONATIONS(state, data) {
      state.donations = data
    },
    SET_EVENTS(state, data) {
      state.events = data
    },
    SET_UPCOMING_EVENTS(state, data) {
      state.upcomingEvents = data
    },
    SET_ARTICLES(state, data) {
      state.articles = data
    },
    SET_LATEST_ARTICLES(state, data) {
      state.latestArticle = data
    },
    SET_PRODUCT_DETAIL(state, data) {
      state.productDetail = data
    },
    SET_HOME(state, data) {
      state.home = data;
    },
    SET_MENU(state, data) {
      state.menu = data;
    },
    SET_PRODUCT_CONFIGURABLE(state, data) {
      state.productConfigurable = data
    },
    SET_RELATED_PRODUCT(state, data) {
      state.relatedProduct = data
    },
    SET_KIDS(state, data) {
      state.kids = data
    },
    SET_KIDS_LATEST(state, data) {
      state.kidslatest = data
    },
    SET_KIDS_FEATURED(state, data) {
      state.kidsfeatured = data
    },
    SET_KIDS_POPULAR(state, data) {
      state.kidsPopular= data
    },
  
    SET_LANDING_PAGE(state, data) {
      state.landingPage = data
    },
    SET_CONTACT_US(state, data) {
      state.contactUs = data
    },
    SET_BROWSE_BY_SUBJECT(state, data) {
      state.browseBySubject = data
    },
    SET_HOME_POPULAR(state, data) {
      state.homePopular = data
    },
    SET_HOME_LATEST(state, data) {
      state.homeLatest = data
    },
    SET_HOME_FEATURED(state, data) {
      state.homeFeatured = data
    },
    SET_DONATIONS_MAGENTO(state, data) {
      state.donationsMagento = data
    },
    SET_ARTICLE_DETAILS(state, data) {
      state.articleDetails = data
    },
    SET_EVENT_DETAILS(state, data) {
      state.eventDetails = data
    },
    SET_DYNAMIC_PAGE_CONTENT(state, data) {
      state.dynamicPageContent = data
    },
    SET_TOP50(state, data) {
      state.top50 = data
    },
    SET_SIGNED_BOOKS(state,data){
      state.SignedBooks=data
    },
  },

  actions: {
    fetchEventsHide({ commit, dispatch, state }, eventPath) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/event/upcoming`)
          .then(response => {
            var eventData = response.data.upcoming_events;
            eventData.splice(eventData.findIndex(v => '/events/'+v.id === eventPath), 1);
            commit('SET_EVENTS_HIDE', eventData);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchAboutus({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/6`)
          .then(response => {
            commit('SET_ABOUT_US', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchDonations({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/7`)
          .then(response => {
            commit('SET_DONATIONS', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchEvents({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/8`)
          .then(response => {
            commit('SET_EVENTS', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchUpcomingEvents({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/event/upcoming`)
          .then(response => {
            commit('SET_UPCOMING_EVENTS', response.data.upcoming_events)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchProductDetail({ commit, dispatch, state }, productSku) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/productattribute?sku=${productSku}`)
          .then(response => {
            commit('SET_PRODUCT_DETAIL', response.data[0].data);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchProductConfigurable({commit, dispatch, state}, productSku) {
      {
        DrupalAxios
        .get(`${this.$config.magentoURL}/rest/V1/configoptions?sku=${productSku}`)
          .then(response => {
              commit('SET_PRODUCT_CONFIGURABLE', response.data[0]);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchRelatedProduct({commit, dispatch, state}, productSku) {
      {
        DrupalAxios
        .get(`${this.$config.magentoURL}/rest/V1/relatedproduct?sku=${productSku}`)
          .then(response => {
              commit('SET_RELATED_PRODUCT', response.data[0]);
              console.log('conf p',response.data[0]);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchKids({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/63`)
          .then(response => {
              commit('SET_KIDS', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchKidslatest({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/latestproduct?category_id=88`)
          .then(response => {
            console.log(response.data)
              commit('SET_KIDS_LATEST', response.data)
              
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchKidsfeatured({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/featuredproduct?category_id=88`)
          .then(response => {
            console.log(response.data)
              commit('SET_KIDS_FEATURED', response.data)
              
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchKidspopular({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`/kidsPopular`)
          .then(response => {
            console.log(response.data)
              commit('SET_KIDS_POPULAR', response.data)
              
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchArticles({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/article/list`)
          .then(response => {
            commit('SET_ARTICLES', response.data);
            commit('SET_LATEST_ARTICLES', response.data.latest_article);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchHome({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/56`)
          .then(response => {
            commit('SET_HOME', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    fetchlandingpage({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/36`)
          .then(response => {
              commit('SET_LANDING_PAGE', response.data);
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
    fetchContactUs({commit, dispatch, state}) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/64`)
          .then(response => {
              commit('SET_CONTACT_US', response.data);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchMenu({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/menu`)
          .then(response => {
            commit('SET_MENU', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    fetchBrowseBySubject({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/subjects`)
          .then(response => {
            commit('SET_BROWSE_BY_SUBJECT', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    fetchHomePopular({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`/adultPopular`)
          .then(response => {
            commit('SET_HOME_POPULAR', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchHomeLatest({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/latestproduct`)
          .then(response => {
            commit('SET_HOME_LATEST', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchHomeFeatured({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/featuredproduct`)
          .then(response => {
            commit('SET_HOME_FEATURED', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchDonationsMagento({ commit, dispatch, state }) {
      {
        DrupalAxios
          .get(`${this.$config.magentoURL}/rest/V1/donations`)
          .then(response => {
            commit('SET_DONATIONS_MAGENTO', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchArticleDetails({ commit, dispatch, state }, articleNode) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/`+articleNode)
          .then(response => {
            commit('SET_ARTICLE_DETAILS', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchEventDetails({ commit, dispatch, state }, eventNode) {
      {
        DrupalAxios
          .get(`${this.$config.drupalURL}/api/content/`+eventNode)
          .then(response => {
            commit('SET_EVENT_DETAILS', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchDynamicPageContent({ commit, dispatch, state }, pageNode) {
      {
        console.log(pageNode);
        DrupalAxios
          .get('https://devmeccabooks.addwebprojects.com/api/content/'+pageNode)
          .then(response => {
            commit('SET_DYNAMIC_PAGE_CONTENT', response.data)
            console.log(response.data);
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    fetchtop50({commit, dispatch, state}){
      {
      DrupalAxios
          .get('http://meccamagento.addwebprojects.com/rest/V1/top-50')
          .then(response => {
            commit('SET_TOP50', response.data)
            console.log(response.data);
          })
          .catch(error => {
            console.log(error)
          })
    }
  },
  fetchSignedBooks({commit, dispatch, state}){
    {
    DrupalAxios
        .get('http://meccamagento.addwebprojects.com/rest/V1/signed-book')
        .then(response => {
          commit('SET_SIGNED_BOOKS', response.data)
          console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })
  }
},
}
}
