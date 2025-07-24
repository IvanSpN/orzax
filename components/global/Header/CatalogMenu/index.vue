<template>
    <div
        class="absolute top-full left-0 bg-[#f5f4f4] shadow-lg p-4 z-50 rounded-lg min-w-[300px] pl-10"
        @mouseenter="cancelHide"
        @mouseleave="scheduleHide"
    >
        <div v-if="errorCategories" class="text-red-500 text-sm mt-2">
            Ошибка при загрузке категорий: {{ errorCategories }}
        </div>
        <ul class="space-y-5">
            <li
                v-for="category in categories"
                class="hover:underline cursor-pointer"
                :key="category.id"
                @click="handleCategoryClick(category)"
            >
                {{ category.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import type { Categories } from '@/stores/categories'

const router = useRouter()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const { errorCategories } = storeToRefs(categoriesStore)

const props = defineProps<{
    categories: Categories[]
}>()

const emit = defineEmits(['hide'])

let hideTimeout: ReturnType<typeof setTimeout>

function scheduleHide() {
    hideTimeout = setTimeout(() => {
        emit('hide')
    }, 1000)
}

function cancelHide() {
    clearTimeout(hideTimeout)
}

function handleCategoryClick(category: Categories) {
    productsStore.setCategory(category.id)
    router.push({
        path: '/shop',
        query: { category: category.slug },
    })
    emit('hide')
}
</script>
