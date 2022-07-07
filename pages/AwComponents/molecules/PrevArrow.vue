<template>
	<div class="page-navigation">
		<slot name="prev" v-bind="{ isDisabled: !canGoPrev, go, prev: getPrev }">
			<div :class="{ 'display-none': !hasArrows }" class="page-prev">
				<component
					:is="componentIs"
					class="prev-btn"
					:link="hasRouter ? getLinkTo(getPrev) : null"
					:disabled="!hasRouter && !canGoPrev ? true : false"
					aria-label="Go to previous page"
					data-testid="pagination-button-prev"
					@click="hasRouter ? null : go(getPrev)"
				>
					<i class="icon-change"></i>
				</component>
			</div>
		</slot>
	</div>
</template>

<script>
import AwLink from "../atoms/AwLink.vue";
import AwButton from "../atoms/AwButton.vue";
import { pagination } from "../../../mixins/pagination.js";

export default {
	name: "SfPagination",
	components: {
		AwLink,
		AwButton,
	},
	mixins: [pagination],
	props: {
		total: {
			type: Number,
			default: 0,
		},
		visible: {
			type: Number,
			default: 5,
		},
		hasArrows: {
			type: Boolean,
			default: true,
		},
		current: {
			type: Number,
			default: 1,
		},
		pageParamName: {
			type: String,
			default: "page",
		},
	},
};
</script>

<style lang="scss" scoped>
.page-select {
	background: transparent;
	width: 5rem;
}
</style>
