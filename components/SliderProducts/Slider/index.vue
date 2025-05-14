<template>
  <swiper
    :slides-per-view="5"
    :space-between="50"
    :modules="modules"
    :pagination="{ clickable: true }"
    :navigation="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    class="swiperProduct"
  >
    <swiper-slide v-for="(product, index) in productsStore.products" :key="index">
      <div class="product-card">
        <h3 class="product-name line-clamp-2 h-[60px]">{{ product.name }}</h3>
        <img :src="product.imageUrl" :alt="product.name" class="product-image"/>
        <p class="product-price">${{ product.price.originalPrice }}</p>
        <p class="product-price">${{ product.price.currentPrice }}</p>
        <button class="flex items-center justify-center mx-auto" @click="goToProduct(product.id)" >Описание <icons-arrow-rigth class="align-middle translate-y-[1px]"/></button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import { onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const router = useRouter();
const productsStore = useProductsStore();

const modules = [Pagination, Navigation];

onMounted(() => {
  productsStore.fetchProducts();
  console.log('Продукты из стора:', productsStore.products);
});

watch(() => productsStore.products, (newProducts) => {
  console.log('Продукты обновились:', newProducts);
});

const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log('slide change');
};
</script>

<style scoped>

.swiperProduct{
  padding: 20px;
}

.mySwiper {
  width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 40px;
}

.product-card {
  text-align: center;
  padding: 10px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.product-price {
  font-size: 16px;
  color: green;
  margin-top: 5px;
}


.swiper-pagination {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

:deep(.swiper-pagination-bullet) {
    background: rgb(198, 195, 195);

}

/* .swiper-pagination-bullet {
  background: rgb(195, 32, 32);
  opacity: 0.7;
  width: 8px;
  height: 8px;
  margin: 0 4px;
} */

/* .swiper-pagination-bullet-active {
  background: black;
  opacity: 1;
} */

/* .swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 80%;
  width: 40px;
  height: 40px;
  margin-top: -20px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
} */




/* .swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.8);
} */

/* .swiper-button-next {
  right: 10px;
}

.swiper-button-prev {
  left: 10px;
} */

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  color: grey;
  font-size: 20px;
  font-weight: bold;
}


/* swiper swiperProduct swiper-initialized swiper-horizontal swiperProduct */

</style>