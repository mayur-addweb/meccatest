<template>
   <div class="product_badge" :class="badgeClass" v-if="showSaleBadge">
      {{badgeText}}
      <!-- {{price.regular}} - {{price.special}} -->
      <!-- {{latest}} -->
   </div>
</template>
<script>
   export default {
   name: 'Badge',
   props: ['price', 'product', 'latest', 'stockStatus', 'stockLeft', 'is_bestseller'],
   computed: {
   showSaleBadge: function () {
   return (this.onSale === true || this.newArrival === true || this.lessStock === true || this.bestSeller === true);
   },
   badgeText: function() {

   if(this.bestSeller === true){
      this.badgeClass = 'on_sale';
      return 'BestSeller'
   }

   if(this.lessStock === true) {
   this.badgeClass = 'less_stock';
   return 'Almost Sold';
   }


   if(this.newArrival === true) {
   this.badgeClass = 'new_arrival';
   return 'New';
   }


   if(this.onSale === true) {
   this.badgeClass = 'on_sale';
   return 'Sale';
   }


   }
   },
   mounted() {
   this.onSale = (this.price.special != null && this.price.special < this.price.regular);
    console.log(this.latest);
    let latest = [];
    if(typeof(this.latest) !== "undefined" && this.latest !== null) {
      latest = this.latest[0].data;
    }

   let that = this;

   let matched = [];

if(latest.length > 0) {
  for(let i=0; i<15; i++) {
    if(latest[i].product_id_base64 == that.product) {
      matched.push(that.product);
    }
  }
}



   if(matched.length > 0) {
   this.newArrival = true;
   }

   if(this.is_bestseller == 'true'){
      this.bestSeller = true;
   }

   if(this.stockLeft != null) {
   this.lessStock = true;
   }


   },
   data() {
   return {
   onSale: false,
   newArrival: false,
   lessStock: false,
   bestSeller: false,
   badgeClass: ''
   }
   }
   }
</script>
<style lang="scss">
   .product_badge {
   z-index: 1;
   top: 10px;
   right: auto;
   bottom: auto;
   left: 10px;
   position: absolute;
   font-size: 0.75rem;
   cursor: pointer;
   background: #2c354e;
   min-width: 51px;
   width: auto;
   height: 26px;
   padding: 5px 8px;
   color: #fff;
   border-radius: 2px;
   line-height: 1.2;
   display: flex;
   align-items: center;
   justify-content: center;
   }
   .new_arrival {
   background: #2c354e;
   }
   .on_sale,
   .less_stock {
   background: #b69f62;
   }
   .category-wrap.listcat-vw.vrt-category {
      .product_badge.on_sale {
         @media (min-width: 375px) and (max-width: 425px) {
            left: 15%;
         }
         @media (min-width: 426px) and (max-width: 574px) {
            left: 25%;
         }
         @media (min-width: 575px) and (max-width: 650px) {
            left: 30%;
         }
         @media (min-width: 651px) and (max-width: 767px) {
            left: 35%;
         }
      }
   }
   
</style>
