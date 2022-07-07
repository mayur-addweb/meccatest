<template>
  <div class="page-select">
    <select v-model="pageNum">
      <option v-for="page in limitedPageNumbers" :key="page" :value="page">
        Page {{ page }}
      </option>
    </select>
  </div>
</template>

<script>
import { pagination } from "../../../mixins/pagination.js";
export default {
  name: "SelectPagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Number,
      default: 5,
    },
    hasArrows: {
      type: Boolean,
      default: true,
    },
    current: {
      type: Number,
      default: 1,
    },
    pageParamName: {
      type: String,
      default: "page",
    },
  },
  mixins: [pagination],
};
</script>
