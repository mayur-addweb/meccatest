<template>
  <ul class="sf-list">
    <slot />
  </ul>
</template>
<script>
import AwListItem from "./AwListItem.vue";
import Vue from "vue";
Vue.component("AwListItem", AwListItem);
export default {
  name: "AwList",
};
</script>
