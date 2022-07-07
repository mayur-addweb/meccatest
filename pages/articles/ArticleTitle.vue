<template>
    <h2 class="art-title pageInfo-title">{{title==="Article" ? "Articles" : title}}</h2>
</template>

<script>
export default {
    props: {
        title: {
            type: [String],
            default: null
        }
    }
}
</script>
