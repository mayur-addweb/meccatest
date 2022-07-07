<template>
  <div class="related-slider d-flex">
    <div class="row" >
      <template v-for="(item,idx) in latest">
      <div class="col-md-3 col-sm-6 col-xs-6" v-if="idx <=7"  :key="idx">
        <div class="related-wrap" >
          <div
            class="related-img category-img var-hor-category-img"
            :class="$route.path === '/kids-home'
          ? ('kidsbg' + (Math.floor(Math.random() * 8)+1))
          : 'slider-img-bg'"
            @click="redirectToDetailPage(item)"
          >
            <div class="img-wrap vs-hr-imgwrap">
              <img
                :src="item.product_image"
                alt="category"
                title="category"
              />
            </div>
          </div>
          <div class="related-details text-center" 
            @click="redirectToDetailPage(item)"
            >
            <div class="category-name">
                {{ item.product_name }}
            </div>
            <div class="category-info">
              {{item.author_name}}
            </div>
            <div class="price-wrap">${{item.price}}</div>
            <div class="rating">
              <div class="ratings-wrap">
                <rating
                  :rating="item.review"
                ></rating>
              </div>
            </div>
          </div>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>
<script>
import { useUiState } from "~/composables";
import { useRouter } from "@nuxtjs/composition-api";
import Rating from "~/components/Products/Rating";

export default {
    props:{
      latest:{
        type: Array,
        default: null
      }
    },
    components: {
      Rating,
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
}
</script>

<style lang="scss" scoped>
.related-wrap {
  margin-bottom: 59px;
  @media all and (max-width: 767px) {
    margin-bottom: 30px;
  }
  .category-img {
    min-width: unset;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .related-details {
    opacity: 1;
    flex-wrap: unset;
    display: block;
    justify-content: center;
    text-align: center;
    padding: 23px 1px;
    @media all and (min-width: 1200px) {
      padding: 23px 25px 0;
    }
  }
}
.kids-show-more .btn {
  background-color: transparent;
}
.footer,
.kids-wrapper-blog {
  background-image: url("/meccabook/kids-bg-img.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.var-hor-category-img {
    height: 300px;
    max-width: 100%;
   @media all and (max-width: 767px) {
     height: 136px;
     max-width: 136px;
    }
}
.related-img.category-img.var-hor-category-img {
  padding: 0;
}

.vs-hr-imgwrap {
  object-fit: cover;
  display: inline-table;
    img {
        max-width: 232px;
        max-height: 232px;
        height: 100%;
        width: 100%;
        object-fit: contain;
        @media all and (max-width: 767px) {
          height: 106px;
          width: 106px;
          object-fit: cover;
        }
    }
}
</style>