<template>
  <div class="preview-wrap">
    <div id="watchVideo" class="watch-content text-center text-md-left">
      <a href="#" @click="toggleAlchemia">
        <i class="icon-search"></i>
        <span class="text">See preview</span>
      </a>
    </div>
    <section :class="alchemiaVisible ? 'alchemia-show' : 'alchemia-hide'">
      <div class="popup-overlay active d-none d-md-block">
        <div class="signin-popup shipping-popup watchvideo-popup">
          <button @click="toggleAlchemia" href="#!" class="close-icn">
            <img src="/meccabook/close-icn.svg" alt="logo" title="logo" />
          </button>
          <img src="/meccabook/product-slide-img.png" alt="image" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { ref } from "@nuxtjs/composition-api";
export default defineComponent({
  setup() {
    const alchemiaVisible = ref(false);
    const toggleAlchemia = () => {
      alchemiaVisible.value = !alchemiaVisible.value;
    };
    return {
      toggleAlchemia,
      alchemiaVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.alchemia-show {
  display: block;
}

.alchemia-hide {
  display: none;
}
</style>
