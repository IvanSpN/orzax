<template>
    <div v-if="isLoading" class="skeleton-slider">
        <div class="skeleton-container">
            <div v-for="n in 3" :key="n" class="skeleton-card">
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
        :slides-per-view="3"
        :space-between="50"
        :modules="modules"
        :pagination="{ clickable: true }"
        :navigation="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :zoom="true"
        :loop="true"
        :centered-slides="true"
        class="swiperFeedback"
    >
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[0]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(0)"
                />
                <video v-if="videoStarted[0]" class="object-cover" :src="videoSrc1" controls autoplay />
                <img
                    v-if="!videoStarted[0]"
                    alt="Image 1"
                    width="250"
                    height="450"
                    src="/public/assets/slider_feedback_1.webp"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(0)"
                />
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[1]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(1)"
                />
                <video v-if="videoStarted[1]" class="object-cover" :src="videoSrc2" autoplay controls />
                <img
                    alt="Image 2"
                    src="/public/assets/slider_feedback_2.webp"
                    v-if="!videoStarted[1]"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(1)"
                />
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[2]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(2)"
                />
                <video v-if="videoStarted[2]" class="object-cover" :src="videoSrc3" autoplay controls />
                <img
                    src="/public/assets/slider_feedback_3.webp"
                    alt="Image 3"
                    v-if="!videoStarted[2]"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(2)"
                />
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[3]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(3)"
                />
                <video v-if="videoStarted[3]" class="object-cover" :src="videoSrc4" autoplay controls />

                <img
                    src="/public/assets/slider_feedback_4.webp"
                    alt="Image 4"
                    v-if="!videoStarted[3]"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(3)"
                />
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[4]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(4)"
                />
                <video v-if="videoStarted[4]" class="object-cover" :src="videoSrc5" autoplay controls />

                <img
                    src="/public/assets/slider_feedback_5.webp"
                    alt="Image 5"
                    v-if="!videoStarted[4]"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(4)"
                />
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[5]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(5)"
                />
                <video v-if="videoStarted[5]" class="object-cover" :src="videoSrc6" autoplay controls />

                <img
                    src="/public/assets/slider_feedback_6.webp"
                    alt="Image 6"
                    v-if="!videoStarted[5]"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(5)"
                />
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="slide-content relative">
                <IconsPlay
                    v-if="!videoStarted[6]"
                    class="absolute inset-0 m-auto z-10 w-16 h-16 text-white cursor-pointer hover:scale-110 transition"
                    @click="startVideo(6)"
                />
                <video v-if="videoStarted[6]" class="object-cover" :src="videoSrc7" autoplay controls />

                <img
                    src="/public/assets/slider_feedback_7.webp"
                    alt="Image 7"
                    v-if="!videoStarted[6]"
                    class="object-cover cursor-pointer absolute rounded-2xl"
                    @click="startVideo(6)"
                />
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup>
import { useProductsStore } from '@/stores/products'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/zoom'

const productsStore = useProductsStore()

const modules = [Pagination, Navigation]

const videoStarted = ref([false, false, false, false, false, false, false])
const videoSrc1 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF6.mp4'
const videoSrc2 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF7.mp4'
const videoSrc3 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF4.mp4'
const videoSrc4 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF3-1.mp4'
const videoSrc5 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF2.mp4'
const videoSrc6 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF2.mp4'
const videoSrc7 = 'https://ru.orzax.com/wp-content/uploads/2024/09/FeedF15.mp4'

const startVideo = index => {
    videoStarted.value[index] = true
}

onMounted(() => {
    productsStore.fetchProducts()
})

watch(
    () => productsStore.products
)

const { isLoading, error, hasError, isEmpty } = storeToRefs(productsStore)

</script>

<style scoped>
.swiperFeedback {
    width: 100%;
    height: 700px;
    position: relative;
    padding-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiperProtect {
    width: 100%;
    height: 400px;
}

.slide-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
}

.slide-content img {
    max-width: 100%;
    border-radius: 10px;
}
.slide-content video {
    width: 249px;
    height: 447px;
    border-radius: 10px;
}

.swiper-slide {
    width: 450px;
    height: 250px;
    transform: scale(1);
    transition: transform 0.3s ease;
    z-index: 1;
    border-radius: 12px;
}

.swiper-slide-active {
    width: 600px;
    height: 500px;
    transform: scale(1.4);
    transition: transform 0.3s ease;
    z-index: 3;
    border-radius: 12px;
}

.swiper-pagination {
    position: absolute;
    bottom: 0 !important;
    display: flex;
    justify-content: center;
    width: 100%;
}

.swiper-pagination-bullet {
    background: rgb(195, 32, 32);
    opacity: 0.7;
    width: 8px;
    height: 8px;
    margin: 0 4px;
}

.swiper-pagination-bullet-active {
    background: black;
    opacity: 1;
}

.swiper-button-next,
.swiper-button-prev {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.swiper-button-next {
    right: 10px;
}

.swiper-button-prev {
    left: 10px;
}

.swiper-button-next::after,
.swiper-button-prev::after {
    font-family: 'swiper-icons';
    font-size: 20px;
    font-weight: bold;
}

.swiper-button-next::after {
    content: 'next';
}

.swiper-button-prev::after {
    content: 'prev';
}

:deep(.swiper-wrapper) {
    align-items: center;
}
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
    color: black;
    font-size: 20px;
    font-weight: bold;
}
:deep(.swiper-pagination-bullet) {
    background: black;
}

/* Skeleton styles */
.skeleton-slider {
    padding: 20px;
}

.skeleton-container {
    display: flex;
    gap: 50px;
    overflow: hidden;
    justify-content: center;
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

/* Error state styles */
.error-state {
    padding: 40px 20px;
    text-align: center;
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

/* Empty state styles */
.empty-state {
    padding: 40px 20px;
    text-align: center;
}

.empty-text {
    color: #6b7280;
    font-size: 16px;
}

/* Responsive skeleton */
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
