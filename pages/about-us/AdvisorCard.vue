<template>
  <div v-if="cards.length">
    <div
      v-for="(card, index) in cards" 
      :key="index"
      class="advisor-card"
    >
      <div class="advisor-img">
        <img :src="card.image.url" :alt="card.image.alt" />
      </div>
      <div class="details">
        <h6 class="advisor-name">{{card.title}}</h6>
        <p class="advisor-desc" v-html="card.description.text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      default: null
    }
  }
}
</script>