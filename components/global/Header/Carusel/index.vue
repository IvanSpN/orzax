<template>
    <div class="bg-[#73BC20] text-white overflow-hidden h-[30px]">
        <transition-group name="slide" tag="div" class="relative w-fit mx-auto p-1">
            <p :key="currentPhrase" class="absolute whitespace-nowrap">
                {{ currentPhrase }}
            </p>
        </transition-group>
    </div>
</template>

<script setup>

const phrases = [
    'Доставка по всей России',
    'Бесплатная доставка от 5000 ₽',
    'Эксклюзивный официальный дистрибьютер ORZAX в России',
]

const currentIndex = ref(0)
const currentPhrase = ref(phrases[0])

onMounted(() => {
    setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % phrases.length
        currentPhrase.value = phrases[currentIndex.value]
    }, 3000)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}
.slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}
.slide-enter-to {
    transform: translateX(0%);
    opacity: 1;
}
.slide-leave-from {
    transform: translateX(0%);
    opacity: 1;
}
.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>
