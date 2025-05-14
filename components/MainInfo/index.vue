<!-- <template>
    <section
        class="h-screen bg-cover bg-center flex items-center justify-center mx-auto mb-8"
        style="background-image: url('/assets/orzax_main_banner.webp')"
    >
    <div class="container">
        <h1 class="text-white text-5xl my-5">Пищевые добавки Orzax</h1>
        <h2 class="text-white text-2xl my-16">Созданы Природой и Усовершенствованы Наукой Для Максимальной Поддержки Организма</h2>
        <button class="bg-amber-50 p-2 rounded-md py-2 px-5">ОТКРЫТЬ КАТАЛОГ</button>
    </div>
    </section>
</template>
 -->
<template>
    <section
        class="h-screen bg-cover bg-center flex items-center  mb-8"
        style="background-image: url('/assets/orzax_main_banner.webp')"
    >
        <transition name="fade-up">
            <div v-if="show" class="container max-w-[600px] ml-[180px]">
                <h1 class="text-white text-5xl my-5">Пищевые добавки Orzax</h1>
                <h2 class="text-white text-2xl my-16">
                    Созданы Природой и Усовершенствованы Наукой Для Максимальной Поддержки Организма
                </h2>
                <button class="bg-amber-50 p-2 rounded-md py-2 px-5">ОТКРЫТЬ </button>
            </div>
        </transition>
    </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
    setTimeout(() => {
        show.value = true
    }, 100)
})
</script>

<style scoped>
.fade-up-enter-active {
    transition: all 0.8s ease;
}
.fade-up-enter-from {
    opacity: 0;
    transform: translateY(40px);
}
.fade-up-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>
