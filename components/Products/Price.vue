<template>
  <div class="product_price">
      <span :class="[onSale ? 'strike' : '']">
        {{
          $n(
            price.regular,
            "currency"
          )
        }}
      </span>

      <span class="special_price" v-if="price.special != null">
        {{
          $n(
            price.special,
            "currency"
          )
        }}
      </span>
      <p class="">
        <span class="regular_price">{{price.regular}}</span> <span class="special_price">/ {{price.special}}</span>
      </p>
      <!-- {{price.regular}} - {{price.special}} -->
  </div>
</template>

<script>
export default {
  name: 'Price',
  props: ['price'],
  computed: {
    onSale: function () {
      return (this.price.special != null && this.price.special < this.price.regular)
    },
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.strike {
  text-decoration: line-through
}
.special_price {
  font-size: 1.35rem;
  margin-left: 5px;
}
</style>
