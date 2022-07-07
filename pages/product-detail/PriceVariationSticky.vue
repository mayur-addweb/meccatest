<template>
  <div v-if="getproductConfigurable && getproductConfigurable.code == 200" style="display: flex;">
  <ul v-for="(product, index) in getproductConfigurable.data" :key="index"
    class="boxes-list text-center text-md-left d-flex justify-content-between flex-wrap"
  >
    <li @click="putActiveButtonID(product.product_id)" :class="activeBtn == product.product_id ? 'active' : null"
      class="box box-btn d-flex align-items-center justify-content-center"
    >
      <div>
        <span class="quality d-block">{{  product.options.format  }}</span>
        <span class="price d-block">${{ product.price }}</span>
      </div>
    </li>
  </ul>
  </div>
  <div v-else>
  <ul 
    class="boxes-list text-center text-md-left d-flex justify-content-between flex-wrap"
  >
    <li
      class="box box-btn active d-flex align-items-center justify-content-center"
    >
      <div>
        <span class="quality d-block">Price</span>
        <span class="price d-block">{{ Singleprice }}</span>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
      return {
        activeBtn: null,
      }
    },
    props:  {
    productsku: {
      type: String,
      default: null
    },
    Singleprice: {
      type: String,
      default: null
    }
    },
   computed: {
    ...mapGetters("drupalcms", ["getproductConfigurable"]),
  },
  methods: {
    putActiveButtonID (val) {
      this.activeBtn = val;
    }
  }
    
}
</script>