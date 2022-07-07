<template>
  <div>
    <select
      :id="label"
      :value="value"
      :disabled="disabled"
      @change="changeHandler"
    >
      <option
        v-if="placeholder"
        disabled
        :selected="!!placeholder"
        value
        :label="placeholder"
      >
        <slot name="placeholder" v-bind="{ placeholder }" />
        {{ placeholder }}
      </option>
      <slot />
    </select>
  </div>
</template>
<script>

export default {
  name: "Selecttag",
  props: {
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "This field is not correct.",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeHandler(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

