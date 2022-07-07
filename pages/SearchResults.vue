<template>
	<div class="container">
		<div class="top-block active-grid">
			<div class="row d-flex justify-content-center text-align-center">
		<ResultCard
		  class="col-md-3"
			v-for="product in products"
			:key="product.objectID"
			:product="product"
		/>
			</div>
		</div>	
	</div>
</template>

<script>
import ResultCard from "./AwComponents/molecules/ResultCard.vue";
import { useUiState } from "~/composables";
import { ref, defineComponent, watch } from "@vue/composition-api";
export default defineComponent({
	components: {
		ResultCard,
	},
	setup() {
		const { getSearchResults } = useUiState();
		let products = ref([]);
		products.value = getSearchResults.value;
		watch(
			() => getSearchResults.value,
			() => {
				products.value = getSearchResults.value;
			}
		);
    console.log('products', products.value);
		return {
			products,
		};
	},
});
</script>

<style lang="scss" scoped>
.results {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1.25rem;
	max-width: 1440px;
	margin-inline: auto;
	&__card {
		max-width: 216px;
		grid-column: span 1;
		margin-block-end: 2.5rem;
		cursor: pointer;
	}
}
</style>