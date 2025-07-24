<template>
    <div v-if="isLoading" class="skeleton-slider">
        <div class="skeleton-container">
            <div v-for="n in 5" :key="n" class="skeleton-card">
                <div class="skeleton-title"></div>
                <div class="skeleton-image"></div>
                <div class="skeleton-price"></div>
                <div class="skeleton-price"></div>
                <div class="skeleton-button"></div>
            </div>
        </div>
    </div>
    <div v-else-if="hasError" class="error-state">
        <div class="error-content">
            <p class="error-text">Ошибка загрузки товаров: {{ error }}</p>
            <button @click="productsStore.fetchProducts()" class="retry-button">
                Повторить попытку
            </button>
        </div>
    </div>
    <div v-else-if="isEmpty" class="empty-state">
        <p class="empty-text">Товары не найдены</p>
    </div>
    <swiper
        v-else
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
import { storeToRefs } from 'pinia'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()
const productsStore = useProductsStore()
const { isLoading, error, hasError, isEmpty } = storeToRefs(productsStore)

const modules = [Pagination, Navigation, Autoplay]

onMounted(() => {
    productsStore.fetchProducts()
})

watch(
    () => productsStore.products
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

.skeleton-slider {
    padding: 20px;
}

.skeleton-container {
    display: flex;
    gap: 50px;
    overflow: hidden;
}

.skeleton-card {
    flex: 0 0 calc(20% - 40px);
    text-align: center;
    padding: 10px;
    width: 180px;
}

.skeleton-title {
    height: 60px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 10px;
}

.skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 8px;
    margin-bottom: 10px;
}

.skeleton-price {
    height: 20px;
    width: 60%;
    margin: 5px auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

.skeleton-button {
    height: 32px;
    width: 80%;
    margin: 10px auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.error-state {
    padding: 40px 20px;
    text-align: center;
    display: flex;
    justify-content: center;
}

.error-content {
    max-width: 400px;
    margin: 0 auto;
}

.error-text {
    color: #ef4444;
    font-size: 16px;
    margin-bottom: 20px;
}

.retry-button {
    background-color: #10b981;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.retry-button:hover {
    background-color: #059669;
}

.empty-state {
    padding: 40px 20px;
    text-align: center;
}

.empty-text {
    color: #6b7280;
    font-size: 16px;
}

@media (max-width: 1024px) {
    .skeleton-card {
        flex: 0 0 calc(25% - 37.5px);
    }
}

@media (max-width: 768px) {
    .skeleton-card {
        flex: 0 0 calc(50% - 25px);
    }

    .skeleton-container {
        gap: 25px;
    }
}

@media (max-width: 480px) {
    .skeleton-card {
        flex: 0 0 100%;
    }

    .skeleton-container {
        gap: 20px;
    }
}
</style>