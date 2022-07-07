<template>
  <div
   class="address-card"
    :class="{
      'is-active': isChecked,
      'is-disabled': disabled,
    }"
  >
      <input
        v-focus
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        @change="changeHandler"
        @input="inputHandler"
        class="form-control"
      />
      <div class="addr-label">
        
         <slot name="checkmark" v-bind="{ isChecked, disabled }">
        <span class="checked"
          :class="{ ' ': isChecked }"
        ></span>
         </slot>
         
         <span class="d-flex justify-content-between">
         <slot name="label" v-bind="{ label, isChecked, disabled }">
          <span :class="{ 'display-none': !label }">{{
            label
          }}</span>
         </slot>
         <slot name="details" v-bind="{ details }">
          <span :class="{ 'display-none': !details }">
            {{ details }}
          </span>
         </slot>
         </span>
        <!-- <slot name="description" v-bind="{ description }">
          <span
            :class="{ 'display-none': !description }"
            class="sf-radio__description"
          >
            {{ description }}
          </span>
        </slot> -->
      </div>
  </div>
</template>
<script>
import { focus } from "../utilities/directives";
export default {
  name: "SfRadio",
  directives: {
    focus,
  },
  model: {
    prop: "selected",
    event: "change",
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: "",
    },
  },
  computed: {
    isChecked() {
      return this.value === this.selected;
    },
  },
  methods: {
    changeHandler() {
      this.$emit("change", this.value);
    },
    inputHandler() {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style scoped>
span.checked {
  display: none;
}
</style>
