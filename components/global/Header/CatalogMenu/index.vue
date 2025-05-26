<template>
    <div
        class="absolute top-full left-0 bg-[#f5f4f4] shadow-lg p-4 z-50 rounded-lg min-w-[300px] pl-10"
        @mouseenter="cancelHide"
        @mouseleave="scheduleHide"
    >
        <ul class="space-y-5">
            <li v-for="(category, index) in categories" class="hover:underline cursor-pointer" :key="index" @click="handleCategoryClick(category)">
                {{ category }}
            </li>
        </ul>
    </div>
</template>

<script setup>

const router = useRouter()

const productsStore = useProductsStore()

const emit = defineEmits(['hide'])


let hideTimeout

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

function scheduleHide() {
    hideTimeout = setTimeout(() => {
        emit('hide')
    }, 1000)
}

function cancelHide() {
    clearTimeout(hideTimeout)
}

function handleCategoryClick(category) {
    productsStore.setCategory(category)
    router.push({
        path: '/shop',
        query: { category: encodeURIComponent(category) }
    })
    emit('hide')
}
</script>
