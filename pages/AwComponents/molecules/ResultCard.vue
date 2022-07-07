
<template>
		<div class="category-wrap listcat-vw vrt-category">
		<!-- <img :src="d_product.image_url" alt class="result-card__image" /> -->
		<div class="category-img mob-lt-hide var-hor-category-img">
			<div class="img-wrp vs-hr-imgwrap" @click="redirectToDetailPage(d_product)">
				<p v-if="d_product">{{d_product.image_url}}</p>
			<img :src="d_product.image_url" alt class="" />
			
			</div>
			<div class="cat-card-links">
				<button @click="redirectToDetailPage(d_product)"
					class="
						btn
						d-flex
						view-btn
						align-items-center
						justify-content-center
					"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.5 16.2987C12.6421 16.2987 16 12.9408 16 8.79871C16 4.65657 12.6421 1.29871 8.5 1.29871C4.35786 1.29871 1 4.65657 1 8.79871C1 12.9408 4.35786 16.2987 8.5 16.2987Z"
							stroke="#ffffff"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18.9998 19.2988L13.7998 14.0988"
							stroke="#ffffff"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span class="btn-txt text-uppercase">view</span>
				</button>
				
				
				<button
					class="
						btn
						wishlist-btn
						d-flex
						align-items-center
						justify-content-center
					"
				>
					<svg
						width="16"
						height="20"
						viewBox="0 0 16 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M15 19.2987L8 14.2987L1 19.2987V3.29871C1 2.19414 1.89543 1.29871 3 1.29871H13C14.1046 1.29871 15 2.19414 15 3.29871V19.2987Z"
							stroke="#ffffff"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span class="btn-txt text-uppercase">wishlist</span>		
				</button>
			</div>
		</div>
		<div class="category-details" @click="redirectToDetailPage(d_product)">
			<div class="category-left">
				<div class="category-name">{{ d_product.name }}</div>
				<div class="category-info">
					{{ d_product.author_3nd }}
				</div>
				<div class="price-wrap">
					{{ d_product.price.USD.default_formated }}
					
        </div>
		<!-- <p>{{isInWishlist({ d_product })}}</p> -->
			<div class="rating">
				<rating :rating="d_product.rating_summary==''? 0: d_product.rating_summary"></rating>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useUiState } from "~/composables";
import { useRouter } from "@nuxtjs/composition-api";
import { useUser, useWishlist } from "@vue-storefront/magento";
import rating from "~/components/Products/Rating.vue";
export default {
	name: "ResultCard",
	props: {
		product: Object,
	},
	components: {
		rating,
	},
	data() {
		return {
			d_product: this.product,
		};
	},
	setup() {
		const { getSlugLink } = useUiState();
		const router = useRouter();
		const redirectToDetailPage = (product) => {
			const link = getSlugLink(product, true);
			router.push({ path: link });
		};
		const { isInWishlist } = useWishlist();

		const { isAuthenticated } = useUser();
		const uiState = useUiState();

		const { addItem } = useWishlist();

		const { toggleLoginModal } = useUiState();


		return {
			...uiState,
			redirectToDetailPage,
			isAuthenticated,
			addItem,
			toggleLoginModal,
			isInWishlist
		}
	},
};
</script>

<style lang="scss" scoped>
.result-card {
	&__title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-wrap: break-word;
		margin-block-start: 0;
	}
	&__price {
		font-weight: 500;
		font-size: 1.125rem;
		color: rgb(29, 31, 34);
	}
}

.var-hor-category-img {
    height: 263px !important;
    // height: 100%;
    max-width: 100%;
    display: flex !important;
    align-items: center;
    justify-content: center;
   @media all and (max-width: 575px) {
     height: 182px !important;
     max-width: 184px;
    }
}

.vs-hr-imgwrap {
  object-fit: cover;
    img {
        max-width: 232px;
        max-height: 232px;
        height: 100%;
        width: 100%;
        object-fit: contain;
    @media all and (max-width: 767px) {
        height: 145px !important;
        max-width: 145px;
    }
    }
}
</style>