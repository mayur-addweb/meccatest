<template functional>
  <SfButton
    class="option-btn"
    :aria-pressed="props.selected.toString()"
    :data-testid="props.color"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <slot>
      <template v-if="props.configPrice.price">
        <ul
          class="
            boxes-list
            text-center text-md-left
            d-flex
            justify-content-between
            flex-wrap
          "
        >
          <li class="box box-btn" :class="[{ active: props.selected }]">
            <span class="quality d-block">{{ props.color }}</span>
            <span class="price d-block">$ {{ props.configPrice.price }}</span>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul
          class="
            boxes-list
            text-center text-md-left
            d-flex
            justify-content-between
            flex-wrap
          "
        >
          <li class="box box-btn">
            <span class="quality d-block">Loading...</span>
          </li>
        </ul>
      </template>
    </slot>
  </SfButton>
</template>
<script>
import SfButton from "@storefront-ui/vue";
export default {
  name: "SfColor",
  inject: {
    components: {
      default: {
        SfButton,
      },
    },
  },
  props: {
    productsku: {
      type: String,
      default: "",
    },
    configPrice: {
      type: [String, Array, Object],
      default: "",
    },
    idx: {
      type: Number,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
    hasBadge: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.option-btn {
  padding: 0px !important;
  background: none;
  width: auto !important;
  margin-right: 10px;
  padding: 13px 20px;
  text-align: center;
}
</style>
