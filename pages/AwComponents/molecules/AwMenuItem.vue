<template>
  <component
    :is="componentIs"
    class="sf-menu-item"
    v-bind="bind"
    :data-testid="label"
    v-on="$listeners"
  >
    <slot name="icon" />
    <slot name="label" v-bind="{ label }">
      <span class="ac-nm">{{ label }}</span>
    </slot>
  </component>
</template>
<script>
import AwButton from '../atoms/AwButton.vue'
import AwLink from '../atoms/AwLink.vue'
export default {
  name: "AwMenuItem",
  components: {
     AwLink,
     AwButton,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: [String, Array],
      default: "chevron_right",
    },
    count: {
      type: [String, Number],
      default: "",
    },
    link: {
      type: [String, Object],
      default: null,
    },
  },
  computed: {
    bind() {
      const bind = {};
      if (this.link) {
        bind.link = this.link;
      } else {
        bind.class = "sf-button--pure";
      }
      return bind;
    },
    componentIs() {
      return this.link ? "AwLink" : "AwButton";
    },
  },
};
</script>
