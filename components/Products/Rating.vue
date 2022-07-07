<template>
  <div class="ratings-wrap">
    <div class="Stars" :style="ratingTag" :aria-label="ratingText">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: ['rating'],
  computed: {
    ratingTag: function () {
      return '--rating: '+this.rating+';';
    },
    ratingText: function () {
      return 'Rating of this product is '+this.rating+' out of 5.';
    },
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
:root {
  --star-size: 20px;
  --star-color: #333;
  --star-background: #fc0;
}

.ratings-wrap {
  width: 100% !important;
}

.Stars {
  --percent: calc(var(--rating) / 5 * 100%);

  display: inline-block;
  font-size: var(--star-size);
  font-family: Times; // make sure ★ appears correctly
  line-height: 1;

  &::before {
    content: '★★★★★';
    letter-spacing: 3px;
    background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

</style>
