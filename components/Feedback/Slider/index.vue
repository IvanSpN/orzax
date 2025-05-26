<template>
    <swiper
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
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/zoom'

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
const router = useRouter()

const productsStore = useProductsStore()

const activeIndex = ref(0)

const modules = [Pagination, Navigation]

onMounted(() => {
    productsStore.fetchProducts()
})

watch(
    () => productsStore.products,
    newProducts => {}
)

const goToProduct = productId => {
    router.push(`/product/${productId}`)
}
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
</style>
