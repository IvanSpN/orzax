<template>
    <div class="container mx-auto m-10">
        <Vue3Marquee :clone="true" :duration="40" :pauseOnHover="true">
            <NuxtLink to="/about">
                <span
                    v-for="(word, index) in helloArray"
                    :key="index"
                    :class="{ even: index % 2 === 1, 'marquee-word': true }"
                >
                    {{ word }}
                </span>
            </NuxtLink>
        </Vue3Marquee>
    </div>
</template>

<script setup>
const helloArray = ['Без сахара', 'Без ГМО', 'Без лактозы', 'Без глютена', 'Соответсвие GMP', 'ISO сертификат']
</script>

<style>
.even {
    color: #75bc1f;
    font-size: 20px;
    padding: 0 100px;
}

.marquee-word {
    font-size: 30px;
    font-weight: bold;
}
</style>
