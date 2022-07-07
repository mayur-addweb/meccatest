export const paginate = {
  data () {
    return {
      rotationFactor: 4,
      limitIndex: 3,
      showMoreButtonIsVisible: true
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
    incrementlimitIndex () {
      if (this.limitIndex >= this[this.contentFieldName].length - 1) {
        return
      }

      this.limitIndex += this.rotationFactor
    },
    decrementlimitIndex () {
      if (this.limitIndex <= this.rotationFactor) {
        return
      }

      this.limitIndex -= this.rotationFactor
    }
  },
  watch: {
    limitIndex (newVal) {
      if (newVal >= this[this.contentFieldName].length - 1) {
        this.showMoreButtonIsVisible = false
      }

      if (newVal <= this.rotationFactor) {
        this.showMoreButtonIsVisible = true
      }
    }
  }
}
