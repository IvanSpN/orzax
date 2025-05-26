<template>
    <teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-60 flex" @keydown.esc="close" tabindex="0">
            <transition name="overlay-transition">
                <div class="absolute inset-0 bg-opacity-60 backdrop-blur-sm" @click="close" v-show="isOpen"></div>
            </transition>
            <transition name="drawer-slide">
                <div class="relative mr-auto w-80 bg-white shadow-lg p-4 z-10" v-show="isOpen">
                    <slot :close="close" />
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
})

const cartStore = useCartStore()

const emit = defineEmits(['close'])
const close = () => emit('close')

watch(
    () => cartStore.cartProducts,
    newProducts => {
        console.log('Корзина обновлена:', newProducts)
    },
    { deep: true, immediate: true }
)

watch(
    () => cartStore.totalCount,
    totalCount => {
        console.log('общее', totalCount)
    },
    { deep: true, immediate: true }
)
</script>

<style scoped>
.overlay-transition-enter-active,
.overlay-transition-leave-active {
    transition: opacity 1s ease-in-out;
}
.overlay-transition-enter-from,
.overlay-transition-leave-to {
    opacity: 0;
}
.overlay-transition-enter-to,
.overlay-transition-leave-from {
    opacity: 1;
}
.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: transform 0.3s ease;
}
.drawer-slide-enter-from {
    transform: translateX(-100%);
}
.drawer-slide-enter-to {
    transform: translateX(0);
}
.drawer-slide-leave-from {
    transform: translateX(0);
}
.drawer-slide-leave-to {
    transform: translateX(-100%);
}
</style>
