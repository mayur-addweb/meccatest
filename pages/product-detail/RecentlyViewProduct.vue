<template>
  <section
    v-if="RecentViewProduct && RecentViewProduct.length > 0"
    class="related-product-sec d-none d-md-block"
  >
    <div class="container">
      <h4 class="related-title text-center">Recently viewed</h4>
      <div class="related-slider">
    <div class="row">
        <div
          v-for="(product, index) in RecentViewProduct"
          :key="index"
          class="col-md-3 col-sm-6 related-wrap category-wrap listcat-vw vrt-category"
        >
          <div class="related-img category-img var-hor-category-img"
            @click="redirectToDetailPage(product)" 
            :class="breadcrumbs[0].text==='Kids' ? ('kidsbg' + (Math.floor(Math.random() * 8)+1)) : 'slider-img-bg'"
          >
            <div class="img-wrap vs-hr-imgwrap">
              <img v-if="product.image"
                :src="product.image"
                alt="category"
                title="category"
              />
            </div>
          </div>
          <div class="related-details text-center"
           @click="redirectToDetailPage(product)">
            <div v-if=" product.title" class="category-name">{{ product.title }}</div>
            <div v-if="product.author" class="category-info">{{ product.author }}</div>
            <div v-if="product.price" class="price-wrap">${{ product.price }}</div>
            <rating :rating="product.rating"></rating>
          </div>
        </div>
    </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUiState } from "~/composables";
import { useRouter } from "@nuxtjs/composition-api";
import rating from "~/components/Products/Rating.vue";

export default {
  components: {
    rating
  },
  data() {
    return {
      RecentViewProduct: null,
    };
  },
  props: {
    breadcrumbs: {
      type: [Array, Object],
      default: null
    }
  },
  mounted() {
    const Storedata = JSON.parse(localStorage.getItem("rvproducts"));
    if(Storedata && Storedata.length > 4) {
        this.RecentViewProduct = Storedata.slice(0, 4);
    }
    else{
        this.RecentViewProduct = Storedata;
    }
  },
  beforeMount() {
    document.body.classList.add('pro-detail');
  },
  beforeDestroy() {
    document.body.classList.remove('pro-detail');
  },
  setup() {
    const { getSlugLink } = useUiState();

    const redirectToDetailPage = (product) => {
    const link = getSlugLink(product);
    router.push({ path: link });
  };
    const router = useRouter();
    return {
      redirectToDetailPage
    }
  }
};
</script>
<style lang="scss" scoped>
.related-slider-img {
  .category-wrap.vrt-category {
    width: unset;
    overflow: hidden;
  }
}
.related-details {
  justify-content: center;
}
.var-hor-category-img {
    max-height: 295px !important;
    height: 100%;
    max-width: 295px;
    display: flex;
    align-items: center;
    justify-content: center;
   @media all and (max-width: 575px) {
     height: 182px !important;
     max-width: 184px;
    }
}

.vs-hr-imgwrap {
  object-fit: cover;
    img {
        max-width: 232px;
        max-height: 232px;
        height: 100%;
        width: 100%;
        object-fit: contain;
    @media all and (max-width: 767px) {
        height: 145px !important;
        max-width: 145px;
    }
    }
}

</style>
