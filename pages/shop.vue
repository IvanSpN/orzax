<template>
    <div v-if="!selectedCategory" class="w-full bg-[#F4F4F4]">
        <div class="container flex justify-between mx-auto w-full text-[28px]">
            <NuxtLink to="/shop">
                <div
                    class="cursor-pointer"
                    :class="{
                        'text-green-600 border-b-4 border-green-600': route.path === '/shop',
                        'text-gray-400': route.path !== '/shop',
                    }"
                >
                    <p class="p-8 font-bold">Каталог продукции</p>
                </div>
            </NuxtLink>
            <NuxtLink to="/sets">
                <div
                    class="cursor-pointer"
                    :class="{
                        'text-green-600 border-b-4 border-green-600': route.path === '/sets',
                        'text-gray-400': route.path !== '/sets',
                    }"
                >
                    <p class="p-8 font-bold">Наборы Orzax</p>
                </div>
            </NuxtLink>
        </div>
    </div>

    <div class="container max-w-[1200px] mx-auto px-10 flex gap-8 mt-8">
        <div v-if="selectedCategory" class="w-1/4 flex flex-col gap-2">
            <div
                :class="[
                    'cursor-pointer p-2 border border-gray-300 rounded',
                    selectedCategory === category.id ? 'bg-amber-700' : 'hover:bg-gray-100',
                ]"
                v-for="(category) in categories"
                :key="category.id"
                @click="selectCategory(category)"
            >
                {{ category.name }}
            </div>
        </div>
        <div v-if="isLoading" :class="['flex justify-center items-center min-h-[400px]', selectedCategory ? 'w-3/4' : 'w-full']">
            <div class="flex flex-col items-center gap-4">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p class="text-gray-600 text-lg">Загружаем товары...</p>
            </div>
        </div>
        <div v-else-if="hasError" :class="['flex justify-center items-center min-h-[400px]', selectedCategory ? 'w-3/4' : 'w-full']">
            <div class="flex flex-col items-center gap-4 text-center">
                <div class="text-red-500 text-6xl">⚠️</div>
                <p class="text-red-600 text-lg font-semibold">Ошибка загрузки товаров</p>
                <p class="text-gray-600">{{ error }}</p>
                <button
                    @click="productsStore.fetchProducts()"
                    class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    Повторить попытку
                </button>
            </div>
        </div>
        <div v-else-if="isEmpty" :class="['flex justify-center items-center min-h-[400px]', selectedCategory ? 'w-3/4' : 'w-full']">
            <div class="flex flex-col items-center gap-4 text-center">
                <div class="text-gray-400 text-6xl">📦</div>
                <p class="text-gray-600 text-lg">Товары не загрузились</p>
            </div>
        </div>
        <div v-else :class="['flex flex-wrap justify-center gap-8', selectedCategory ? 'w-3/4' : 'w-full']">
            <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="flex gap-6 flex-col justify-between max-w-[350px] border border-gray-200 rounded-lg shadow-md bg-white p-0.5 transition-transform hover:scale-105"
            >
                <NuxtLink :to="`/products/${product.id}`">
                    <div class="overflow-hidden rounded-t-lg">
                        <img :src="product.imageUrl" alt="" width="400" class="w-full h-auto" />
                    </div>
                    <h3 class="font-bold p-2 min-h-[3.5rem]">{{ product.name }}</h3>
                    <p class="font-bold p-2">{{ product.price.originalPrice }} ₽</p>
                </NuxtLink>
                <button
                    class="border rounded p-2 m-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    @click="addToCart(product)"
                >
                    В корзину
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useProductsStore, type Product } from '@/stores/products'
import {useCategoriesStore, type Categories}  from '@/stores/categories'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

const cartStore = useCartStore()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const { selectedCategory, filteredProducts, isLoading, error, hasError, isEmpty } = storeToRefs(productsStore)

const { categories } = storeToRefs(categoriesStore)

function addToCart(product: Product) {
    cartStore.setAddProduct(product)
}

onMounted(() => {
    productsStore.fetchProducts()
    categoriesStore.fetchCategories()
})

function selectCategory(category: Categories) {
    productsStore.setCategory(category.id)
    router.push({
        path: '/shop',
        query: { category: category.slug }
    })

}

watch(
    () => route.fullPath,
    newPath => {
        if (newPath === '/shop') {
            productsStore.setCategory(null)
        }
    },
    { immediate: true }
)
</script>

