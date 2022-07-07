<template>
  <div class="artcard card-wrao-info">
    <router-link :to="'/events/'+card.id" class="move-pro-detail"></router-link>
    <div class="art-card-view">
      <img
        :src="card.image.url"
        :alt="card.image.alt"
      />
    </div>
    <div class="details art-details">
      <h4 class="event-title" v-if="card.title">{{card.title}}</h4>
      <span class="sub-title d-block" v-if="card.sub_title" v-html="removeTags(card.sub_title)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
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
}
</script>


<style lang="scss" scoped>
.artcard.card-wrao-info .art-card-view img {
  @media (min-width: 768px) {
    max-width: 295px;
    height: 295px;  
    width: 100%;
  }
}


.artcard.card-wrao-info .art-card-view {
  @media (max-width: 991px) {
    width: unset !important;
  }
}
</style>