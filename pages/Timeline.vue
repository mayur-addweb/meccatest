<template>
<div class="container">
  <div class="timeline-block">
    <div class="container-block">
      <hr />
      <div
        class="horizontally-scrolled-items"
        v-if="timeline"
      >
        <template>
          <div
            class="item flag"
            v-for="(item, idx) in timeline"
            :key="idx"
          >
            <i></i>
            <img :src="item.image.url" :alt="item.image.alt" class="circle" />
            <div class="text-info">
              <h2>{{ item.title }}</h2>
              <p v-html="removeTags(item.description.text)"></p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    timeline: {
      type: [Object, Array],
      default: null
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