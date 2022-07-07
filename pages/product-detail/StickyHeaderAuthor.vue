<template>
  <span v-if="getProductDetail && getProductDetail.author_3nd" class="th-desc">{{ getProductDetail.author_3nd }} </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    productsku: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters("drupalcms", ["getProductDetail"]),
  },
};
</script>
