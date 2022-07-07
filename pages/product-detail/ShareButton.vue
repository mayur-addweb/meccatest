<template>
  <div class="share-wrap">
    <template v-if="$device.isMobileOrTablet">
      <a class="share" @click="shareMe()">
        <i class="icon-share"></i>
        <span class="text">Share with friends</span>
      </a>
    </template>
    <template v-else>
      <a class="a2a_dd" href="https://www.addtoany.com/share">
        <i class="icon-share"></i>
        <span class="text">Share with friends</span>
      </a>
    </template>
  </div>
</template>
<script>
export default {
  methods: {
    shareMe() {
      if (navigator.share) {
        navigator.share({
          title: 'MeccaBook',
          text: 'Check out this book on MeccaBook',
          url: window.location,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
    },
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://static.addtoany.com/menu/page.js"
      );
    document.head.appendChild(recaptchaScript);
  }
}
</script>
