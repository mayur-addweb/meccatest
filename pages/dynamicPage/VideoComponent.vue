<template>
    <section
      class="video-wrap-sec"
      v-if="
        content &&
        content[0]
      "
    >
      <div class="container">
        <h2 class="home-wrap-title" v-if="content[0].title && content[0].title[0] && content[0].title[0].value">
          {{
            content[0].title[0].value
          }}
        </h2>
        <h6 class="home-wrap-subtitle" v-if="content[0].subheading && content[0].subheading[0] && content[0].subheading[0].value">
          {{
            content[0].subheading[0]
              .value
          }}
        </h6>
        <video-blog
          :videoLink="
            content[0].video[0].value
          "
         v-if="content[0].video && content[0].video[0] && content[0].video[0].value"></video-blog>
      </div>
    </section>
</template>
<script>
import VideoBlog from "../home/VideoBlog.vue";
export default{
  components:{
    VideoBlog,
  },
    props:{
        content:{
            type: [Array, Object],
            default: null,
        }       
    },
}
</script>