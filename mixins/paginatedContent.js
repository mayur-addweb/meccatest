export const paginate = {
  data () {
    return {
      ArticleRotationFactor:8,
      rotationFactor: 4,
      limitIndex: 3,
      limitIndexArticle: 7,
      showMoreButtonIsVisible: true,
      showMoreButtonIsVisibleArticle:true
    }
  },
  methods: {
    paginatedContent () {
      const paginatedContent = this[this.contentFieldName].filter((item, index) => {
        if (index <= this.limitIndex) {
          return item
          
        }
       
      })
      return paginatedContent
    },

    paginatedContentArticle () {
      const paginatedContentarticle = this[this.contentFieldName].filter((item, index) => {
        if (index <= this.limitIndexArticle) {
          return item
        }
      })

      return paginatedContentarticle
    },


    incrementlimitIndex () {
      if (this.limitIndex >= this[this.contentFieldName].length - 1) {
        return
      }

      this.limitIndex =  this.limitIndex +this.rotationFactor
      if (this.limitIndexArticle >= this[this.contentFieldName].length - 1) {
       
        return
      }
      this.limitIndexArticle += this.ArticleRotationFactor 
    },
    decrementlimitIndex () {
      if (this.limitIndex <= this.rotationFactor) {
        return
      }
      this.limitIndex -= this.rotationFactor
      if (this.limitIndexArticle<= this.ArticleRotationFactor) {
        return
      }
     this.limitIndexArticle -= this.ArticleRotationFactor
    },  
  },
  watch: {
    limitIndex (newVal) {
      if (newVal >= this[this.contentFieldName].length - 1) {
        this.showMoreButtonIsVisible = false
      }

      if (newVal <= this.rotationFactor) {
        this.showMoreButtonIsVisible = true
      }
    },
    limitIndexArticle (newVal){
      if (newVal >=this[this.contentFieldName].length - 1) {
        this.showMoreButtonIsVisibleArticle = false
      }

      if (newVal <= this.ArticleRotationFactor) {
        this.showMoreButtonIsVisibleArticle = true
      }

    }
  }
}
