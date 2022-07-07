export const pagination = {
    data() {
        return {
            pageNum: 1,
        };
    },
    computed: {
        hasRouter() {
            return this.$route;
        },
        componentIs() {
            return this.hasRouter ? "AwLink" : "AwButton";
        },
        currentPage() {
            return this.hasRouter ? (this.$route.query[this.pageParamName] ? parseInt(this.$route.query[this.pageParamName], 10) : 1) : this.current;
        },
        getPrev() {
            return this.currentPage === this.firstVisiblePageNumber ? this.currentPage : this.currentPage - 1;
        },
        canGoPrev() {
            return this.currentPage !== this.firstVisiblePageNumber;
        },
        getNext() {
            return this.currentPage === this.lastVisiblePageNumber ? this.currentPage : this.currentPage + 1;
        },
        canGoNext() {
            return this.currentPage !== this.lastVisiblePageNumber;
        },
        showFirst() {
            return this.firstVisiblePageNumber > 1;
        },
        showLast() {
            return this.lastVisiblePageNumber < this.total;
        },
        listOfPageNumbers() {
            return Array.from(Array(this.total), (_, i) => i + 1);
        },
        limitedPageNumbers() {
            if (this.total <= this.visible) {
                return this.listOfPageNumbers;
            }
            if (this.currentPage < this.visible - Math.floor(this.visible / 2) + 1) {
                return this.listOfPageNumbers.slice(0, this.visible);
            }
            if (this.total - this.currentPage < this.visible - Math.ceil(this.visible / 2) + 1) {
                return this.listOfPageNumbers.slice(this.total - this.visible);
            }
            return this.listOfPageNumbers.slice(this.currentPage - Math.ceil(this.visible / 2), this.currentPage + Math.floor(this.visible / 2));
        },
        firstVisiblePageNumber() {
            return this.limitedPageNumbers[0];
        },
        lastVisiblePageNumber() {
            return this.limitedPageNumbers[this.limitedPageNumbers.length - 1];
        },
    },
    methods: {
        go(page) {
            this.$emit("click", page);
        },
        getLinkTo(page) {
            const pageNumber = page.toString();
            if (this.hasRouter) {
                return {
                    ...this.$route,
                    query: {...this.$route.query, [this.pageParamName]: page },
                };
            } else {
                return pageNumber;
            }
        },
    },
    mounted() {
        if (this.$route.query.page) {
            this.pageNum = this.$route.query.page;
        }
    },
    watch: {
        pageNum: function(newVal) {
            let link = `${this.$route.path}?page=${newVal}`;

            if (this.$route.query.itemsPerPage) {
                link += `&itemsPerPage=${this.$route.query.itemsPerPage}`;
            }

            this.$router.push({ path: link });
        },
    },
};