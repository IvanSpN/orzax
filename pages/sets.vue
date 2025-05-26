<template>
    <div clas>
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
                <NuxtLink to="">
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
        <div>
            <p class="mx-auto w-[120px]">КАКИЕ ТО НАБОРЫ</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const productsStore = useProductsStore()

const store = useProductsStore()

const { selectedCategory, filteredProducts } = storeToRefs(productsStore)

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
