<template>
    <Header @toggle-cart="toggleCartDrawer" />
    <div class="">
        <slot />
    </div>
    <Footer :variant="footerVariant" />
    <Cart :isOpen="isCartOpen" @close="toggleCartDrawer">
        <template #default="{ close }">
            <div class="flex flex-col h-full">
                <div class="flex justify-between mb-8">
                    <h4>Корзина</h4>
                    <button @click="close" class="bg-gray-400 px-2 border border-black rounded cursor-pointer">
                        ×
                    </button>
                </div>
                <div class="w-full flex justify-center mb-6">
                    <div class="w-[93%] h-[1.5px] bg-gray-400"></div>
                </div>
                <div v-for="(product, index) in cartStore.cartProducts" :key="index" class="mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-20 h-20 flex-shrink-0">
                            <img :src="product.imageUrl" alt="" class="w-full h-full object-cover rounded" />
                        </div>
                        <div class="flex-1">
                            <p class="font-semibold">{{ product.name }}</p>
                            <p>{{ product.price.currentPrice }} ₽ × {{ product.quantity }}</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="h-[1.5px] bg-gray-400 w-[93%] mx-auto"></div>
                    </div>
                </div>
                <div class="mt-auto flex flex-col gap-2 max-w-full">
                    <p class="p-3 font-bold">
                        Подытог: <span class="text-blue-700">{{ cartStore.totalPrice }}</span>
                        <span class="text-blue-700">₽</span>
                    </p>
                    <button class="p-3 bg-gray-500 rounded">ПОСМОТРЕТЬ КОРЗИНУ</button>
                    <button class="p-3 bg-blue-600 text-white rounded">ОФРОМИТЬ ЗАКАЗ</button>
                </div>
            </div>
        </template>
    </Cart>
</template>

<script setup>
const route = useRoute()

const cartStore = useCartStore()

const isCartOpen = ref(false)

const toggleCartDrawer = () => {
    isCartOpen.value = !isCartOpen.value
}

const footerVariant = computed(() => {
    const shopPages = ['/shop', '/sets']

    const isShopPage = shopPages.some(page => route.path === page || route.path.startsWith(page + '/'))

    return isShopPage ? 'shop' : 'default'
})
</script>
