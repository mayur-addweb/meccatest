// @core-development-only-start
// eslint-disable unicorn/prefer-module /
// @core-development-only-end
import webpack from 'webpack';
import config from './config.js';
import middleware from './middleware.config';
import { getRoutes } from './routes';

const {
  integrations: {
    magento: {
      configuration: {
        cookies,
        externalCheckout,
        defaultStore,
        facets,
      },
    },
  },
} = middleware;

export default {
  ssr: true,
  dev: config.get('nuxtAppEnvironment') !== 'production',
  publicRuntimeConfig: {
    drupalURL: process.env.DEV_MECCABOOK,
    magentoURL: process.env.MAGENTO_MECCABOOK,
    stripeKey: process.env.STRIPE_PK
  },
  server: {
    port: config.get('nuxtAppPort'),
    host: '0.0.0.0',
  },
  head: {
    title: process.env.npm_package_name || '',
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.GOOGLE_MAP_APIKEY}`,
      },
      {
        src: "https://cdn-loyalty.yotpo.com/loader/qabvEbl7ThW3xKeMZ0qBkw.js",
        async: true,
        crossorigin: "anonymous"
      },
    ],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  loading: { color: '#fff' },
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxtjs/device',
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      useRawSource: {
        dev: ['@vue-storefront/magento', '@vue-storefront/core'],
        prod: ['@vue-storefront/magento', '@vue-storefront/core']
      }
    }
    ],
    ['@vue-storefront/nuxt-theme', {
      routes: false,
    }],
    ['@vue-storefront/magento/nuxt', {
      i18n: {
        useNuxtI18nConfig: true,
      },
      cookies,
      externalCheckout,
      defaultStore,
      facets,
    }],
  ],
  modules: [
    ['nuxt-i18n', {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    }],
    ['vue-social-sharing/nuxt', {
      networks: {
        fakeblock: 'https://fakeblock.com/share?url=@https://news.vuejs.org/issues/180&title=@test'
      }
    }],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
    '@nuxtjs/html-validator',
  ],
  i18n: {
    country: 'US',
    locales: [
      {
        code: 'en-US',
        label: 'English',
        file: 'en.js',
        iso: 'en_US',
      },
    ],
    defaultLocale: 'en-US',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en-US',
      numberFormats: {
        'en-US': {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          },
        },
        'de-DE': {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
          },
        },
        'nl-NL': {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
          },
        },
      },
    },
    detectBrowserLanguage: false,
  },
  pwa: {
    meta: {
      theme_color: '#5ECE7B',
    },
  },
  googleFonts: {
    families: {
      Raleway: {
        wght: [300, 400, 500, 600, 700],
        ital: [400],
      },
      Roboto: {
        wght: [300, 400, 500, 700],
        ital: [300, 400],
      },
    },
    display: 'swap',
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })],
  },
  css: ['@/assets/css/main.scss'],
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
      ],
    },
    transpile: [
      'vee-validate/dist/rules',
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || '',
        }),
      }),
    ],
    extend(cfg, ctx) {
      // eslint-disable-next-line no-param-reassign
      cfg.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';

      if (ctx && ctx.isClient) {
        // eslint-disable-next-line no-param-reassign
        cfg.optimization = {
          ...cfg.optimization,
          mergeDuplicateChunks: true,
          splitChunks: {
            ...cfg.optimization.splitChunks,
            automaticNameDelimiter: '.',
            chunks: 'all',
            enforceSizeThreshold: 40_000,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            maxSize: 128_000,
            minChunks: 1,
            minSize: 0,
            cacheGroups: {
              ...cfg.optimization.splitChunks.cacheGroups,
              vendor: {
                test: /[/\\]node_modules[/\\]/,
                reuseExistingChunk: true,
                name: (module) => `${module
                  .context
                  .match(/[/\\]node_modules[/\\](.*?)([/\\]|$)/)[1]
                  .replace(/[.@_]/gm, '')}`,
              },
            },
          },
        };
      }
    },
  },
  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}`).forEach((route) => routes.unshift(route));
    },
    prefetchLinks: false,
  },
  serverMiddleware: [
    '~/server-middleware/paymentIntent.js',
    '~/server-middleware/ribbinContent.js'
  ]
};
