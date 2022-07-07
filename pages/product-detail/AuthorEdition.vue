<template>
    <div v-if="getProductDetail">
    <span v-if="getProductDetail.author_3nd" class="publisher d-block">{{ getProductDetail.author_3nd }}</span>
    <span v-if="getProductDetail.publisher" class="press d-block">{{ getProductDetail.publisher }}</span>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props:  {
    productsku: {
      type: String,
      default: null
    }
    },
   computed: {
    ...mapGetters("drupalcms", ["getProductDetail"]),
  },
  methods: {
    ...mapActions("drupalcms", ["fetchProductDetail"]),
  },
  mounted() {
    this.fetchProductDetail(this.productsku);
  },
    
}
</script>