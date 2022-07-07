<template>
  <div>
  <ul
    class="boxes-list text-center text-md-left d-flex justify-content-between flex-wrap"
  >
    <li class="box box-btn single-price-bg">
      <span class="quality d-block">Price</span>
      <span class="single-price d-block">{{ Singleprice }}</span>
    </li>
  </ul>
  </div>

</template>

<script>
export default {
  props:  {
    productsku: {
      type: String,
      default: null
    },
    Singleprice: {
      type: String,
      default: null
    }
  },
}
</script>