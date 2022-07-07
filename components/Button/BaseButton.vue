<template>
 <div>
    <router-link v-if="linkButton" :class="parentStyleClass ? parentStyleClass : '' " :to="toDestination ? toDestination : '/'">
        <i v-if="withIcon" :class="iconClass"></i>
        <span class="btn-text">{{ titleText }}</span>
    </router-link>

    <button v-else type="submit" :class="parentStyleClass ? parentStyleClass : '' " class="fix-style">
        <i v-if="withIcon" :class="iconClass"></i>
        <span class="btn-text">{{ titleText }}</span>
    </button>
 </div>
</template>

<script>
export default {
    props: {
        linkButton: {
            type: Boolean,
            default: false
        },
        titleText: {
            type: String,
            default: "ClickMe"
        },
        withIcon: {
            type: Boolean,
            default: false
        },
        iconClass: {
            type: String,
            default: ""
        },
        parentStyleClass: {
            type: String,
            default: null
        },
        toDestination: {
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>

.fix-style {
    background: #2c354e;
    color: #fff;
    text-transform: uppercase;
    box-shadow: 0 2px 0 0 #f6b119;
    -webkit-appearance: none;
    transition: all 0.3s ease-in-out;
    width: auto;
    border-bottom: 2px solid #f6b119;
    @media all and (max-width: 991px) {
        border-bottom: unset;
    }
}
</style>