<template>
  <!-- <div class="marquee-fullwidth">
    <div class="marquee-track">
      <span v-for="(word, index) in words" :key="index">{{ word }}</span>
      <span v-for="(word, index) in words" :key="'copy-'+index">{{ word }}</span>
    </div>
  </div> -->


  <!-- <marquee scroll>
  <p><span style="color: red">Без сахара</span> Без ГМО Без лактозы Без глютена Соответсвие GMP ISO сертификат</p>
</marquee> -->

<!-- <div class="container ticker">
  <div class="ticker__in">
    <span class="ticker__item">Без сахара</span>
    <span class="ticker__item">Без ГМО</span>
    <span class="ticker__item">Без лактозы</span>
    <span class="ticker__item">Без глютена</span>
    <span class="ticker__item">Соответсвие GMP</span>
    <span class="ticker__item">ISO сертификат</span>

    <span class="ticker__item">Без сахара</span>
    <span class="ticker__item">Без ГМО</span>
    <span class="ticker__item">Без лактозы</span>
    <span class="ticker__item">Без глютена</span>
    <span class="ticker__item">Соответсвие GMP</span>
    <span class="ticker__item">ISO сертификат</span>
  </div>
</div> -->
<!-- <div class="container ticker">
  <div class="ticker__wrapper">
    <div class="ticker__in">
      <span class="ticker__item">Без сахара</span>
      <span class="ticker__item">Без ГМО</span>
      <span class="ticker__item">Без лактозы</span>
      <span class="ticker__item">Без глютена</span>
      <span class="ticker__item">Соответсвие GMP</span>
      <span class="ticker__item">ISO сертификат</span>
      <span class="ticker__item">Без сахара</span>
      <span class="ticker__item">Без ГМО</span>
      <span class="ticker__item">Без лактозы</span>
      <span class="ticker__item">Без глютена</span>
      <span class="ticker__item">Соответсвие GMP</span>
      <span class="ticker__item">ISO сертификат</span>
    </div>
    <div class="ticker__in">
      <span class="ticker__item">Без сахара</span>
      <span class="ticker__item">Без ГМО</span>
      <span class="ticker__item">Без лактозы</span>
      <span class="ticker__item">Без глютена</span>
      <span class="ticker__item">Соответсвие GMP</span>
      <span class="ticker__item">ISO сертификат</span>
      <span class="ticker__item">Без сахара</span>
      <span class="ticker__item">Без ГМО</span>
      <span class="ticker__item">Без лактозы</span>
      <span class="ticker__item">Без глютена</span>
      <span class="ticker__item">Соответсвие GMP</span>
      <span class="ticker__item">ISO сертификат</span>
    </div>
  </div>
</div> -->
<div class="container mx-auto m-10">
  <Vue3Marquee :clone="true" :duration="40" :pauseOnHover="true">
    <NuxtLink to="/about">
          <span
              v-for="(word, index) in helloArray"
              :key="index"
              :class="{'even': index % 2 === 1, 'marquee-word': true}"
          >
              {{ word }}
          </span>
          </NuxtLink>
      </Vue3Marquee>
      <!-- <div class="marquee-wrapper">
        <div class="marquee">
            <span>Без сахара&nbsp;&nbsp;&nbsp;</span>
            <span>Без ГМО&nbsp;&nbsp;&nbsp;</span>
            <span>Без лактозы&nbsp;&nbsp;&nbsp;</span>
            <span>Без глютена&nbsp;&nbsp;&nbsp;</span>
            <span>Соответсвие GMP&nbsp;&nbsp;&nbsp;</span>
            <span>ISO сертификат&nbsp;&nbsp;&nbsp;</span>
            <span>Без сахара&nbsp;&nbsp;&nbsp;</span>
            <span>Без ГМО&nbsp;&nbsp;&nbsp;</span>
            <span>Без лактозы&nbsp;&nbsp;&nbsp;</span>
            <span>Без глютена&nbsp;&nbsp;&nbsp;</span>
            <span>Соответсвие GMP&nbsp;&nbsp;&nbsp;</span>
            <span>ISO сертификат&nbsp;&nbsp;&nbsp;</span>
            <span>Без сахара&nbsp;&nbsp;&nbsp;</span>
            <span>Без ГМО&nbsp;&nbsp;&nbsp;</span>
            <span>Без лактозы&nbsp;&nbsp;&nbsp;</span>
            <span>Без глютена&nbsp;&nbsp;&nbsp;</span>
            <span>Соответсвие GMP&nbsp;&nbsp;&nbsp;</span>
            <span>ISO сертификат&nbsp;&nbsp;&nbsp;</span>
        </div>
    </div> -->
</div>
</template>

<script setup>
const helloArray = ['Без сахара', 'Без ГМО', 'Без лактозы', 'Без глютена', 'Соответсвие GMP', 'ISO сертификат']

</script>

<style>

.even {
  color: #75BC1F;
  font-size: 20px;
  padding: 0 100px;
}

.marquee-word {
font-size: 30px;
font-weight: bold;
}

/* marquee-wrapper {
            width: 100%;
            overflow: hidden;
            background: #f9f9f9;
            border: 1px solid #ccc;
            white-space: nowrap;
        }

        .marquee {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-left 30s linear infinite;
        }

        .marquee span {
            display: inline-block;
        }

        @keyframes scroll-left {
            0% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(-50%);
            }
        } */



</style>




