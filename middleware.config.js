import customProductsQuery from './customQueries/productList';
import CategoryListQuery from './customQueries/categoryList';

const config = require('./config.js');
const cookieNames = require('./enums/cookieNameEnum');




module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: config.get('magentoGraphQl'),
        cookies: {
          ...cookieNames,
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: config.get('enableMagentoExternalCheckout'),
          cmsUrl: config.get('externalCheckoutUrl'),
          syncUrlPath: config.get('externalCheckoutSyncPath'),
          stores: {
            default: config.get('enableMagentoExternalCheckout'),
          },
        },
        facets: {
          available: ['author_3nd', 'translator_3nd', 'publisher'],
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: false,
        },
      },
      customQueries: {
          /* This is where we override the default query */
          products: (context) => ({ 
            ...context,
            query: customProductsQuery,  // Your custom query
          }),
          /* This is where we override the default query */
          categoryList: (context) => ({ 
            ...context,
            query: CategoryListQuery,  // Your custom query
          })
      },
    },
  },
};
