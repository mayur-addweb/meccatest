<template>
    <section class="Pre-Booking-Form">
      <div class="container" v-if="content && content[0] && content[0].form_url[0].value && content[0].form_url[0] && content[0].form_url[0].value">
        <booking-form-tab :link="content[0].form_url[0].value"></booking-form-tab>
      </div>
    </section>
</template>

<script>
import BookingFormTab from "../home/BookingFormTab.vue";
export default{
  components:{
    BookingFormTab,
  },
    props:{
        content:{
            type: [Array, Object],
            default: null,
        }       
    },
}
</script>