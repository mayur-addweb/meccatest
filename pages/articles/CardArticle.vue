<template>
  <div class="card-wrao-info art-midd-card">
    <div class="row">
      <div class="col-md-6">
        <router-link
          :to="'/article-detail/' + card.node_id"
          class="move-pro-detail"
        ></router-link>
        <div class="art-card-view">
          <img :src="card.image.url" :alt="card.image.alt" />
        </div>
      </div>
      <div class="col-md-6 align-self-center">
        <router-link
          :to="'/article-detail/' + card.node_id"
          class="move-pro-detail"
        ></router-link>
        <div class="details art-details">
          <div class="date-address d-none d-md-block">
            <span class="date"> {{ formatCompat(card.date) }} </span>
            <span class="address" v-for="(item, i) in card.tags" :key="i">{{
              card.tags[i + 1] ? item + "," : item
            }}</span>
          </div>
          <h3 class="subtitle">
            {{ card.title[0].value }}
          </h3>
          <p class="desc" v-html="card.description.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: [Array, Object],
      default: null,
    },
  },
  methods: {
    formatCompat(d3) {
      const initial = d3.toString().replace(/-/g, "/").split(/\//);
      const t = [initial[1], initial[0], initial[2]].join("/");
      const d = new Date(t);
      const ms = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return (
        ms[d.getMonth()] +
        " " +
        String(d.getDate()).padStart(2, "0") +
        ", " +
        d.getFullYear()
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.art-midd-card {
  .details.art-details {
    @media all and (min-width: 768px) {
        margin-top: 23px;
      }
    .desc {
      @media all and (min-width: 1200px) {
        margin-bottom: 0;
      }
    }
  }
}
.date-address .date {
  padding-right: 15px;
}
.date-address .address {
  padding-left: 0;
}
.art-midd-card {
  img {
    @media all and (max-width: 767px) {
      width: 100%;
      height: 188px;
      object-fit: cover;
    }
  }
}
</style>
