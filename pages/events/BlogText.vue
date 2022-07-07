<template>
  <div class="col-lg-6">
    <div class="blog-right">
      <h2 class="pageInfo-title about-title">
        {{ content.title }}
      </h2>
      <h5 class="er-title ev-sub">{{ formatCompat(detailComponents.date) }}</h5>
      <span
        v-if="
          detailComponents &&
          detailComponents.heading[0] &&
          detailComponents.heading[0].value
        "
        class="ev-small-tt"
      >
        {{ detailComponents.heading[0].value }}
      </span>
      <p
        v-if="detailComponents.description"
        class="desc"
        v-html="detailComponents.description.text"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null,
    },
    detailComponents: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatCompat(d3) {
      const nth = function (d) {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };
      var today = new Date(d3);
      var initial = (d3.toString()) .split(/\//);
      var t = [initial[1], initial[0], initial[2]].join("/");

      var today = new Date(t);
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = today.getMonth(); //January is 0!
      var ms = [
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
      var yyyy = today.getFullYear();

      today = ms[mm] + " " + dd + nth(dd)  +"," + yyyy;
      return today;
    },
  },
};
</script>
<style lang="scss" scoped>
h2.pageInfo-title.about-title {
  color: #2c354e;
}
p.desc {
  @media all and (max-width: 991px) {
    font-size: 18px;
  }
}
</style>
