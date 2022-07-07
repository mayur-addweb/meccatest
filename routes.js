const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [
    {
      name: "home",
      path: "/",
      component: path.resolve(themeDir, "pages/Home.vue"),
    },
    {
      name: "landing",
      path: "/landing",
      component: path.resolve(themeDir, "pages/Landing.vue"),
    },
    {
      name: "timeline",
      path: "/timeline",
      component: path.resolve(themeDir,"pages/Timeline.vue"),
    },
    {
      name: "searchresults",
      path: "/search-results",
      component: path.resolve(themeDir, "pages/SearchResults.vue"),
    },
    {
      name: "kids-home",
      path: "/kids-home",
      component: path.resolve(themeDir, "pages/KidsHome.vue"),
    },
    {
      name: "events",
      path: "/events/:id",
      component: path.resolve(themeDir, "pages/Events.vue"),
    },
    {
      name: "donations",
      path: "/donations",
      component: path.resolve(themeDir, "pages/Donations.vue"),
    },
    {
      name: "articles",
      path: "/articles",
      component: path.resolve(themeDir, "pages/Articles.vue"),
    },
    {
      name: "article-detail",
      path: "/article-detail/:nodeId",
      component: path.resolve(themeDir, "pages/ArticleDetail.vue"),
    },
    {
      name: "about-us",
      path: "/about-us",
      component: path.resolve(themeDir, "pages/AboutUs.vue"),
    },
    {
      name: "dynamic-page",
      path: "/landing/:nodeId",
      component: path.resolve(themeDir, "pages/DynamicPage.vue"),
    },
    {
      name: "contact-us",
      path: "/contact-us",
      component: path.resolve(themeDir, "pages/ContactUs.vue"),
    },
    {
      name: "wishlist",
      path: "/wishlist",
      component: path.resolve(themeDir, "pages/Wishlist.vue"),
    },
    {
      name: "checkout-cart",
      path: "/checkout-cart",
      component: path.resolve(themeDir, "pages/CheckoutCart.vue"),
    },
    {
      name: "error",
      path: "/error",
      component: path.resolve(themeDir, "pages/Error.vue"),
    },
    {
      name: "product-detail",
      path: "/p/:id/:slug/",
      component: path.resolve(themeDir, "pages/ProductDetail.vue"),
    },
    {
      name: 'product',
      path: '/b/:id/:slug/',
      component: path.resolve(themeDir, 'pages/Product.vue'),
    },
    {
      name: "category",
      path: "/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
      component: path.resolve(themeDir, "pages/Category.vue"),
    },
    {
      name: "my-account",
      path: "/my-account/:pageName?",
      component: path.resolve(themeDir, "pages/MyAccount.vue"),
    },

    {
      name: "checkout",
      path: "/checkout",
      component: path.resolve(themeDir, "pages/Checkout.vue"),
      children: [
        {
          path: "user-account",
          name: "user-account",
          component: path.resolve(themeDir, "pages/Checkout/UserAccount.vue"),
        },
        {
          path: "shipping",
          name: "shipping",
          component: path.resolve(themeDir, "pages/Checkout/Shipping.vue"),
        },
        {
          path: "billing",
          name: "billing",
          component: path.resolve(themeDir, "pages/Checkout/Billing.vue"),
        },
        {
          path: "payment",
          name: "payment",
          component: path.resolve(themeDir, "pages/Checkout/Payment.vue"),
        },
        {
          path: "thank-you",
          name: "thank-you",
          component: path.resolve(themeDir, "pages/Checkout/ThankYou.vue"),
        },
        {
          path: "external-thank-you",
          name: "external-thank-you",
          component: path.resolve(themeDir, "pages/Checkout/ExternalCheckoutThankYou.vue"),
        },
      ],
    },
    {
      name: "reset-password",
      path: "/reset-password",
      alias: "/customer/account/createPassword",
      component: path.resolve(themeDir, "pages/PasswordReset.vue"),
    },
    {
      name: "page",
      path: "/:slug+",
      component: path.resolve(themeDir, "pages/Page.vue"),
    },

  ];
}
