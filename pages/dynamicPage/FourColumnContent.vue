<template>
<section class="feature-homeblog">
      <div class="container">
  <div class="feature-block" v-if="content" >
  
  <div class="feature-wrap" v-for="item in content" :key="item.title">
    <div class="mr10" >
      <feature-icon />
    </div>
    <div class="feature-info" v-if="item.title && item.description.text">
      <h4>{{item.title}}</h4>
      <p v-html="item.description.text"></p>
    </div>
  </div>
  

 
  </div>
  </div>
    </section>
</template>

<script>
// components/core/blocks/Footer/FeatureBlock.vue
// /home/addweb/Documents/Project1/vsf2-meccabook/components/core/blocks/Footer/FeatureIcon.vue
// /home/addweb/Documents/Project1/vsf2-meccabook/pages/dynamicPage/FourColumnContent.vue

import FeatureIcon from '../Footer/FeatureIcon.vue';
import BookIcon from '../Footer/BookIcon.vue'
import RibbonIcon from '../Footer/RibbonIcon.vue'
import PaymentIcon from '../Footer/PaymentIcon.vue'

export default ({
  
  components: {
      FeatureIcon,
      PaymentIcon,
      RibbonIcon,
      BookIcon,
  },
  props:{
    content:{
      type:Array,
      default:null
    }
  }
})
</script>
<style lang="scss" scoped>
// @import '~theme/css/variables/colors';
// @import '~theme/css/helpers/functions/color';
// $color-secondary: color(secondary);
</style>