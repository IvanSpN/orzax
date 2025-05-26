<template>
    <div class="container mx-auto flex p-[40px] gap-12 max-w-[1400px]">
        <div class="gallery-container">
            <div class="zoom-wrapper" ref="zoomContainer" @mousemove="onMouseMove" @mouseleave="resetZoom">
                <Swiper
                    v-if="thumbsSwiper"
                    :modules="[Thumbs]"
                    :thumbs="{ swiper: thumbsSwiper }"
                    :space-between="10"
                    :slides-per-view="1"
                    class="main-swiper"
                    @slideChange="resetZoom"
                >
                    <SwiperSlide v-for="(image, index) in images" :key="'main-' + index">
                        <img :src="image" :style="zoomStyle" class="zoom-image" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <Swiper
                :modules="[Thumbs]"
                class="thumbs-swiper"
                :slides-per-view="4"
                space-between="10"
                @swiper="setThumbsSwiper"
                watch-slides-progress
            >
                <SwiperSlide v-for="(image, index) in images" :key="'thumb-' + index">
                    <img :src="image" />
                </SwiperSlide>
            </Swiper>
        </div>
        <div class="">
            <h6 class="font-bold text-[38px] mb-8">{{ product?.name }}</h6>
            <p class="mb-5">ОПИСАНИЕ</p>
            <div class="w-full flex justify-center mb-8">
                <div class="w-[100%] h-px bg-black"></div>
            </div>
            <p class="mb-8">
                {{ product?.description }}
            </p>
            <div class="flex gap-8">
                <img src="/public/assets/halal.webp" alt="" />
                <img src="/public/assets/halal.webp" alt="" />
                <img src="/public/assets/halal.webp" alt="" />
                <img src="/public/assets/halal.webp" alt="" />
                <img src="/public/assets/halal.webp" alt="" />
                <img src="/public/assets/halal.webp" alt="" />
                <img src="/public/assets/halal.webp" alt="" />
            </div>
            <Accordion :items="accordionItems" v-if="product?.advantages">
                <template #content-0>
                    <ul class="list-disc list-inside pl-[20px] mb-8">
                        <li v-for="(adv, index) in product?.advantages" :key="index">{{ adv }}</li>
                    </ul>
                </template>
                <template #content-1>
                    <p class="mb-8">
                        {{ product?.application?.description }}
                    </p>
                    <ul class="list-disc list-inside pl-[20px] mb-8">
                        <li v-for="(el, index) in product?.application?.nutraceutical" :key="index">{{ el }}</li>
                    </ul>
                    <p class="">Противопоказания:</p>
                    <p class="mb-8">
                        Индивидуальная непереносимость, в период беременности и лактации перед применением рекомендуется
                        проконсультироваться с врачом.
                    </p>
                </template>
                <template #content-2>
                    <p class="mb-8">{{ product?.contraindications }}</p>
                    <p class="mb-8">{{ product?.composition?.dose }}</p>

                    <p class="mb-8">Состав: {{ product?.composition?.quantity_in_pack }}</p>
                    <p class="mb-8">Наполнитель: {{ product?.composition?.ingredients }}</p>
                    <p class="mb-8">
                        Компонент покрытия: сополимер поливинилового спирта с привитым полиэтиленгликолем, тальк,
                        диоксид титана, моно- и диглицериды жирных кислот, поливиниловый спирт
                    </p>
                    <p class="mb-8">Загуститель: кроскармеллоза натрия</p>
                    <p class="mb-8">Средства против слеживания: стеарат магния и диоксид кремния</p>
                </template>
            </Accordion>
            <div class="flex gap-8 mb-4">
                <p>
                    <span class="line-through text-gray-400 text-[36px]">{{ product?.price?.originalPrice }}P</span>
                </p>
                <p>
                    <span class="underline font-bold text-[36px]">{{ product?.price?.currentPrice }}P</span>
                </p>
            </div>
            <div class="mb-8">
                <p class="text-yellow-400">
                    <span>{{ product?.availability }}</span> в наличии
                </p>
            </div>
            <div class="flex gap-6">
                <p class="p-4 bg-[#ffff00] rounded-lg"><span>1</span></p>
                <button class="bg-[#ffff00] p-4 rounded-lg flex-grow">В корзину</button>
            </div>
        </div>
    </div>
    <div class="bg-[#cecec2] w-full">
        <div class="flex mx-auto max-w-[1200px] p-8 gap-12">
            <div class="w-1/2">
                <h6 class="font-bold text-[32px]">Что такое Orzax Immune Defense?</h6>
                <p class="mb-8">
                    Комплекс “Иммунная защита” поддерживает иммунную систему и обладает противовоспалительными
                    свойствами. Его компоненты взаимно усиливают действие и уменьшают восстановительный период.
                </p>
                <p class="mb-8">
                    Докозогексаеновая кислота (ДГК) важна для работы мозга, зрения и клеточных мембран, а также для
                    развития мозга в период беременности и раннего детства.
                </p>
                <p class="mb-8">
                    Эйкозапентаеновая кислота (ЭПК) улучшает состав крови, снижает риск заболеваний нервной системы и
                    воспаления.Сырье для нутрицевтика получено из глубоководной рыбы (анчоусы, макрель, сардины) и
                    очищено методом молекулярной дистилляции, что позволяет получить продукт без токсических веществ и
                    увеличить содержание Омега-3 жирных кислот.
                </p>
                <p class="mb-8">Капсулы Fish Oil легко глотать и имеют легкий лимонный привкус.</p>
            </div>
            <div class="w-1/2">
                <img src="/public/assets/product/product_1.webp" alt="" class="rounded-lg max-w-full h-auto" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'

const images = [
    '/assets/product/product_1.webp',
    '/assets/product/product_2.webp',
    '/assets/product/product_3.webp',
    '/assets/product/product_4.webp',
    '/assets/product/product_5.webp',
]

const route = useRoute()

const productId = route.params.id

const { product, error, loading, fetchProductById } = useProduct()

fetchProductById(productId)
console.log('Это продукт', product)

const accordionItems = [{ title: 'ПРЕИМУЩЕСТВА' }, { title: 'КАК ПРИМЕНЯТЬ' }, { title: 'СОСТАВ' }]

const thumbsSwiper = ref(null)
const setThumbsSwiper = swiper => {
    thumbsSwiper.value = swiper
}

const zoomStyle = ref({})
const zoomContainer = ref(null)

const onMouseMove = e => {
    const rect = zoomContainer.value.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    zoomStyle.value = {
        transform: 'scale(2)',
        transformOrigin: `${x}% ${y}%`,
    }
}

const resetZoom = () => {
    zoomStyle.value = {
        transform: 'scale(1)',
        transformOrigin: 'center',
    }
}
</script>

<style scoped>
.gallery-container {
    width: 600px;
    margin: 0 auto;
}

.zoom-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    margin-bottom: 10px;
}
.zoom-wrapper::after {
    content: '🔍';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    padding: 4px 6px;
    border-radius: 4px;
    pointer-events: none;
}

.zoom-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, transform-origin 0.3s ease;
    pointer-events: none;
}

:deep(.thumbs-swiper img) {
    width: 100%;
    height: auto;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.2s;
}

:deep(.thumbs-swiper .swiper-slide-thumb-active img),
:deep(.thumbs-swiper img:hover) {
    opacity: 1;
    border: 2px solid #007bff;
}
</style>
