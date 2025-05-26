<template>
    <HeaderCarusel />
    <header class=" p-2 sticky top-[0px] w-full bg-white  h-[80px] z-50 ">
        <div class="container flex gap-5 justify-between items-center mx-auto top-0">
            <div>
                <NuxtLink to="/">
                    <img src="/assets/img/Orzax_Logo.webp" alt="logo" width="200" height="60" />
                </NuxtLink>
            </div>
            <ul class="flex gap-4 relative" ref="menuWrapperRef">
                <li class="cursor-pointer p-1">О нас</li>
                <li class="cursor-pointer p-1" @mouseenter="showMenu" @mouseleave="scheduleHide">
                    <NuxtLink to="/shop" @click="hideMenu">Каталог</NuxtLink>
                </li>

                <Transition
                    enter-active-class="transition-opacity duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-300"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <HeaderCatalogMenu v-if="isMenuVisible" @hide="hideMenu" @mouseenter="cancelHide" />
                </Transition>
                <li class="cursor-pointer p-1">Опт</li>
                <li class="cursor-pointer p-1">Бонусная Программа</li>
                <li class="cursor-pointer p-1">Наши Партнеры</li>
                <li class="cursor-pointer p-1">Вопрос-Ответ</li>
                <li class="cursor-pointer p-1">Контакты</li>
            </ul>
            <ul class="flex gap-4">
                <li class="cursor-pointer p-1">
                    <IconsProfile />
                </li>
                <li class="cursor-pointer p-1">
                    <IconsMagnifyingGlass />
                </li>
                <li>
                    <button class="cursor-pointer p-1" @click="$emit('toggle-cart')">
                        <IconsCart />
                    </button>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
const isMenuVisible = ref(false)
const menuWrapperRef = ref(null)
const productsStore = useProductsStore()


let hideTimeout

function showMenu() {
    isMenuVisible.value = true
    clearTimeout(hideTimeout)
}

function hideMenu() {
    isMenuVisible.value = false
}

function scheduleHide() {
    hideTimeout = setTimeout(() => {
        isMenuVisible.value = false
    }, 1000)
}

function cancelHide() {
    clearTimeout(hideTimeout)
}


useClickOutside(menuWrapperRef, hideMenu)

</script>
