<template>
  <div>
    <div
      v-if="title"
      class="sf-heading"
    >
      <h3 class="sf-heading__title h3">
        {{ title }}
      </h3>
    </div>
    <HTMLContent
      :content="content"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api';
import HTMLContent from '~/components/HTMLContent';

export default defineComponent({
  name: 'ContentBlock',
  components: { HTMLContent },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.sf-heading__title.h3 {
    font-family: "leksa",serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #2c354e;
    letter-spacing: -0.7px;
    margin-bottom: 21px;
 }
</style>