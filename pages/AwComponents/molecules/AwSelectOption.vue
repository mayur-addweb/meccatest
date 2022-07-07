<template>
  <option :value="value" tabindex="0">
    <slot />
  </option>
</template>
<script>
export default {
  name: "SfSelectOption",
  props: {
    value: {
      type: [String, Number, Object],
      default: "",
    },
  },
};
</script>