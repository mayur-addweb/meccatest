<template>
  <div class="sf-sidebar" :class="[staticClass, className]">
    <transition :name="transitionName">
      <aside
        v-if="visible"
        ref="asideContent"
        v-focus-trap
        v-click-outside="checkPersistence"
        class="sf-sidebar__aside cart-preview"
      >
        <div
          :class="{ 'display-none': !title || (!title && !hasTop) }"
          class="sf-sidebar__top"
        >
          <slot name="content-top" />
        </div>
        <div class="cart-item">
          <slot />
        </div>
        <div :class="{ 'display-none': !hasBottom }" class="sf-sidebar__bottom btn-wrp">
          <slot name="content-bottom" />
        </div>
      </aside>
    </transition>
  </div>
</template>
<script>
import { focusTrap } from "../utilities/directives/";
import { clickOutside } from "../utilities/directives/";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { isClient } from "../utilities/helpers";
export default {
  name: "SfSidebar",
  directives: { focusTrap, clickOutside },
  components: {
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    headingLevel: {
      type: Number,
      default: 3,
    },
    button: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      position: "left",
      staticClass: null,
      className: null,
    };
  },
  computed: {
    visibleOverlay() {
      return this.visible && this.overlay;
    },
    transitionName() {
      return "sf-slide-" + this.position;
    },
    hasTop() {
      return this.$slots.hasOwnProperty("content-top");
    },
    hasBottom() {
      return this.$slots.hasOwnProperty("content-bottom");
    },
  },
  watch: {
    visible: {
      handler(value) {
        if (!isClient) return;
        if (value) {
          this.$nextTick(() => {
            const sidebarContent = document.getElementsByClassName(
              "cart-item"
            )[0];
            disableBodyScroll(sidebarContent);
          });
          document.addEventListener("keydown", this.keydownHandler);
        } else {
          clearAllBodyScrollLocks();
          document.removeEventListener("keydown", this.keydownHandler);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.classHandler();
  },
  updated() {
    this.classHandler();
  },
  beforeDestroy() {
    clearAllBodyScrollLocks();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    checkPersistence() {
      if (!this.persistent) this.close();
    },
    keydownHandler(e) {
      if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
        this.close();
      }
    },
    classHandler() {
      let update = false;
      if (this.staticClass !== this.$vnode.data.staticClass) {
        this.staticClass = this.$vnode.data.staticClass;
        update = true;
      }
      if (this.className !== this.$vnode.data.class) {
        this.className = this.$vnode.data.class;
        update = true;
      }
      if (update) {
        this.position =
          [this.staticClass, this.className].toString().search("--right") > -1
            ? "right"
            : "left";
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.cart-preview {
  background: #F1EDE3;
  padding: 30px 20px;
  top: 0px;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: auto;
  position: absolute;
  width: 100%;
  max-width: 100%;
  height: calc(100% - 79px);
  max-height: 100%;
  z-index: 999999;
  @media all and (min-width: 768px) {
    padding: 30px 20px;
    height: 100%;
   }

@media all and (min-width: 992px) {
    max-width: 500px;
    height: 100%; 
 }
}
.cart-item {
  overflow: auto;
}
.btn-wrp {
  padding: 40px 0 0 0;
  @media all and (min-width: 768px) {
    margin-right: 20px;
  }
}  
</style>