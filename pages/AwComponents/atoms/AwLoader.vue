<template functional>
  <div
    :ref="data.ref"
    :class="[data.class, data.staticClass, 'sf-loader']"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <transition name="sf-fade" mode="out-in">
      <slot v-if="!props.loading"></slot>
      <div v-else class="sf-loader__overlay">
        <slot name="loader">
          <img
            src="/meccabook/animation-loader.gif"
            alt=""
            class="loader-img"
          />
        </slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "SfLoader",
  props: {
    loading: {
      default: true,
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.sf-loader__spinner {
  color: #2C354E !important;
}
.loader-img {
  height: 80px;
  width: 80px;
 @media (max-width: 767px) {
      height: 50px;
      width: 50px;
      object-fit: contain;
      margin: 50px 0;
  }
}
</style>