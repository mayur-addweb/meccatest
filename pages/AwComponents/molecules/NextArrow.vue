<template>
	<div class="page-navigation">
		<slot name="next" v-bind="{ isDisabled: !canGoNext, go, next: getNext }">
			<div :class="{ 'display-none': !hasArrows }" class="page-next">
				<component
					:is="componentIs"
					class="next-btn"
					:link="hasRouter ? getLinkTo(getNext) : null"
					:disabled="!hasRouter && !canGoNext ? true : false"
					aria-label="Go to previous next"
					data-testid="pagination-button-next"
					@click="hasRouter ? null : go(getNext)"
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
