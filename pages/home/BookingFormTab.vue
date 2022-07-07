<template>
  <div class="booking-forms mt-5 mb-5">
        <h2 class="home-wrap-title">Pre Booking Form</h2>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div
          data-tf-widget="avJ1ASKQ"
          data-tf-iframe-props="title=Pre Booking Form"
          data-tf-medium="snippet"
          style="width: 100%; height: 400px"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    link:{
      type:String,
      default: null,
    }
  },
  head() {
    return {
      script: [
        {
          src: "//embed.typeform.com/next/embed.js",
          async: true,
        },
      ],
    };
  },
};
</script>
