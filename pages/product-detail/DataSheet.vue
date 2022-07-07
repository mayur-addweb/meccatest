<template>
  <div>
    <div v-if="getProductDetail && getProductDetail.sku" class="list-rw">
      <span class="list-head">Sku </span>
      <span v-if="getProductDetail && getProductDetail.sku" class="list-desc">{{ getProductDetail.sku }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.isbn" class="list-rw">
      <span class="list-head">EAN 13 / ISBN </span>
      <span v-if="getProductDetail && getProductDetail.isbn" class="list-desc">{{ getProductDetail.isbn }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.publisher" class="list-rw">
      <span class="list-head">Publisher</span>
      <span v-if="getProductDetail && getProductDetail.publisher" class="list-desc">{{ getProductDetail.publisher }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.manufacturer" class="list-rw">
      <span class="list-head">Manufacturer </span>
      <span v-if="getProductDetail && getProductDetail.manufacturer" class="list-desc">{{ getProductDetail.manufacturer }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.binding" class="list-rw">
      <span class="list-head">Binding </span>
      <span v-if="getProductDetail && getProductDetail.binding" class="list-desc">{{ getProductDetail.binding }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.author_3nd" class="list-rw">
      <span class="list-head">Author</span>
      <span v-if="getProductDetail && getProductDetail.author_3nd" class="list-desc">{{ getProductDetail.author_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.artist_2nd" class="list-rw">
      <span class="list-head">Artist </span>
      <span v-if="getProductDetail && getProductDetail.artist_2nd" class="list-desc">{{ getProductDetail.artist_2nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.translator_3nd" class="list-rw">
      <span class="list-head">Translator </span>
      <span v-if="getProductDetail && getProductDetail.translator_3nd" class="list-desc">{{ getProductDetail.translator_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.commentator_3nd" class="list-rw">
      <span class="list-head">Commentator </span>
      <span v-if="getProductDetail && getProductDetail.commentator_3nd" class="list-desc">{{ getProductDetail.commentator_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.editor" class="list-rw">
      <span class="list-head">Editor </span>
      <span v-if="getProductDetail && getProductDetail.editor" class="list-desc">{{ getProductDetail.editor }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.foreword_2nd" class="list-rw">
      <span class="list-head">Foreword </span>
      <span v-if="getProductDetail && getProductDetail.foreword_2nd" class="list-desc">{{ getProductDetail.foreword_2nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.illustrator_2nd" class="list-rw">
      <span class="list-head">Illustrator </span>
      <span v-if="getProductDetail && getProductDetail.illustrator_2nd" class="list-desc">{{ getProductDetail.illustrator_2nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.pages" class="list-rw">
      <span class="list-head">Pages</span>
      <span v-if="getProductDetail && getProductDetail.pages" class="list-desc">{{ getProductDetail.pages }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.year_published" class="list-rw">
      <span class="list-head">Year Published</span>
      <span v-if="getProductDetail && getProductDetail.year_published" class="list-desc">{{ getProductDetail.year_published }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.length" class="list-rw">
      <span class="list-head">Length</span>
      <span v-if="getProductDetail && getProductDetail.length" class="list-desc">{{ getProductDetail.length }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.width" class="list-rw">
      <span class="list-head">Width</span>
      <span v-if="getProductDetail && getProductDetail.width" class="list-desc">{{ getProductDetail.width }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.height" class="list-rw">
      <span class="list-head">Height</span>
      <span v-if="getProductDetail && getProductDetail.height" class="list-desc">{{ getProductDetail.height }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.weight" class="list-rw">
      <span class="list-head">Weight</span>
      <span v-if="getProductDetail && getProductDetail.weight" class="list-desc">{{ getProductDetail.weight }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.country_of_manufacture && (getProductDetail.country_of_manufacture !== '')" class="list-rw">
      <span class="list-head">Country of manufacture</span>
      <span v-if="getProductDetail && getProductDetail.country_of_manufacture && getProductDetail.country_of_manufacture !== '' " class="list-desc">{{ getProductDetail.country_of_manufacture }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.media_type" class="list-rw">
      <span class="list-head">Media type</span>
      <span v-if="getProductDetail && getProductDetail.media_type" class="list-desc">{{ getProductDetail.media_type }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.format" class="list-rw">
      <span class="list-head">Format</span>
      <span v-if="getProductDetail && getProductDetail.format" class="list-desc">{{ getProductDetail.format }}</span>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props:  {
    productsku: {
      type: String,
      default: null
    }
    },
   computed: {
    ...mapGetters("drupalcms", ["getProductDetail"]),
  }
    
}
</script>
