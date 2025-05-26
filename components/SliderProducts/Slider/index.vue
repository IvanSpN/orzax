<template>
    <swiper
        :slides-per-view="5"
        :space-between="50"
        :modules="modules"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="swiperProduct"
    >
        <swiper-slide v-for="(product, index) in productsStore.products" :key="index">
            <div @click="goToProduct(product.id)" class="product-card cursor-pointer">
                <h3 class="product-name line-clamp-2 h-[60px]">{{ product.name }}</h3>
                <img :src="product.imageUrl" :alt="product.name" class="product-image" />
                <p class="product-price">${{ product.price.originalPrice }}</p>
                <p class="product-price">${{ product.price.currentPrice }}</p>
                <button class="flex items-center justify-center mx-auto">
                    Описание <icons-arrow-rigth class="align-middle translate-y-[1px]" />
                </button>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()
const productsStore = useProductsStore()

const modules = [Pagination, Navigation, Autoplay]

onMounted(() => {
    productsStore.fetchProducts()
})

watch(
    () => productsStore.products,
    newProducts => {}
)

const goToProduct = productId => {
    router.push(`/products/${productId}`)
}
</script>

<style scoped>
.swiperProduct {
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

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
    color: grey;
    font-size: 20px;
    font-weight: bold;
}
</style>
