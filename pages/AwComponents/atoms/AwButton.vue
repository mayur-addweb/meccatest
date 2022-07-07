<template functional>
  <component
    :is="props.link ? injections.components.AwLink : 'a'"
    :class="[
      data.class,
      data.staticClass,
      '',
      {
        'is-disabled--button': $options.buttonActive(
          props.link,
          props.disabled
        ),
        'is-disabled--link': $options.linkActive(props.link, props.disabled),
      },
    ]"
    :style="[data.style, data.staticStyle]"
    :aria-disabled="props.disabled"
    :link="props.link"
    v-bind="data.attrs"
    v-on="!props.disabled ? listeners : {}"
  >
    <slot />
  </component>
</template>
<script>
import { focus } from "../utilities/directives";
import AwLink from "./AwLink.vue";
export default {
  name: "AwButton",
  inject: {
    components: {
      default: { AwLink },
    },
  },
  directives: {
    focus,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    link: {
      type: [String, Object],
      default: null,
    },
  },
  linkActive(link, disabled) {
    return link && disabled;
  },
  buttonActive(link, disabled) {
    return !link && disabled;
  },
};
</script>

