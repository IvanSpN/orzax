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
                    selectedCategory === category ? 'bg-amber-700' : 'hover:bg-gray-100',
                ]"
                v-for="(category, index) in categories"
                :key="index"
                @click="selectCategory(category)"
            >
                {{ category }}
            </div>
        </div>

        <div :class="['flex flex-wrap justify-center gap-8', selectedCategory ? 'w-3/4' : 'w-full']">
            <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="flex gap-6 flex-col justify-between max-w-[350px] border border-gray-200 rounded-lg shadow-md bg-white p-0.5"
            >
                <NuxtLink :to="`/products/${product.id}`">
                    <div><img :src="product.imageUrl" alt="" width="400" /></div>
                    <h3 class="font-bold p-2 min-h-[3.5rem]">{{ product.name }}</h3>
                    <p class="font-bold p-2">{{ product.price.originalPrice }} ₽</p>
                </NuxtLink>
                <button class="border rounded p-2 m-2 cursor-pointer" @click="addToCart(product)">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()

const cartStore = useCartStore()

const productsStore = useProductsStore()

const { selectedCategory, filteredProducts } = storeToRefs(productsStore)

function addToCart(product: any) {
    cartStore.setAddProduct(product)
}

const categories = [
    'ЖКТ',
    'Сон / Антистресс',
    'Иммунитет',
    'Для красоты кожи, волос и ногтей',
    'Для женщин',
    'Для мужчин',
    'Для суставов',
    'Для сердца и сосудов',
    'Ежедневная поддержка',
    'Для мозга',
    'Для щитовидной железы',
    'Контроль веса',
]


onMounted(() => {
    productsStore.fetchProducts()
})


async function selectCategory(category: string | null) {
    store.setCategory(category)
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
