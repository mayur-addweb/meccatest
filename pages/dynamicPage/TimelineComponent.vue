<template>
  <div class="timeline-block" v-if="content">
    <div class="container">
      <hr />
      <div
        class="horizontally-scrolled-items"
      >
        <template>
          <div
            class="item flag"
            v-for="(item, idx) in content"
            :key="idx"
          >
            <i></i>
            <img :src="item.image.url" :alt="item.image.alt" class="circle" />
            <div class="text-info">
              <h2 v-if="item.title">{{ item.title }}</h2>
              <p v-if="item.description && item.description.text">{{ removeTags(item.description.text) }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [Array, Object],
      default: null,
    }
  },
  methods: {
    removeTags(str) {
      if (str === null || str === "") return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
};
</script>