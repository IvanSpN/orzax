<template>
    <div class="container w-full mx-auto">
        <div v-for="(item, index) in items" :key="index" class="accordion-item border-b border-green-600">
            <div class="flex justify-between items-center py-4 cursor-pointer" @click="toggle(index)">
                <span class="text-lg font-medium">{{ item.title }}</span>
                <span
                    class="text-2xl font-bold transition-transform duration-300"
                    :class="{ 'transform rotate-45': openStates[index] }"
                >
                    +
                </span>
            </div>

            <div
                class="content-wrapper overflow-hidden transition-all duration-300 ease-in-out"
                :style="{ height: openStates[index] ? contentHeights[index] + 'px' : '0px' }"
            >
                <div ref="contentRefs" :data-index="index" class="content-inner py-2">
                    <slot :name="'content-' + index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUpdate, onUnmounted, watch } from 'vue'

interface AccordionItem {
    title: string
}

const props = defineProps<{
    items: AccordionItem[]
}>()

// Состояния открытия для каждого элемента
const openStates = ref<boolean[]>([])
// Рефы для доступа к контентным блокам
const contentRefs = ref<HTMLElement[]>([])
// Высоты контентных блоков
const contentHeights = ref<number[]>([])

// Обработка рефов перед обновлением
onBeforeUpdate(() => {
    contentRefs.value = []
})

onMounted(async () => {
    // Инициализация закрытых состояний
    openStates.value = Array(props.items.length).fill(false)

    // Ждем следующий тик для правильного измерения
    await nextTick()
    // Предварительно вычисляем все высоты
    updateAllContentHeights()

    // Следим за изменением размера окна
    window.addEventListener('resize', updateAllContentHeights)
})

// Очистка слушателя при уничтожении компонента
onUnmounted(() => {
    window.removeEventListener('resize', updateAllContentHeights)
})

// Обновление всех высот контента
const updateAllContentHeights = () => {
    if (!contentRefs.value.length) return

    // Временно делаем все элементы видимыми для измерения
    const tempHeights: number[] = []

    contentRefs.value.forEach(el => {
        // Получаем индекс элемента
        const index = parseInt(el.dataset.index || '0')

        // Сохраняем текущие стили
        const originalDisplay = el.parentElement?.style.display || ''
        const originalVisibility = el.parentElement?.style.visibility || ''
        const originalHeight = el.parentElement?.style.height || ''

        // Делаем элемент видимым для измерения, но скрытым визуально
        if (el.parentElement) {
            el.parentElement.style.display = 'block'
            el.parentElement.style.visibility = 'hidden'
            el.parentElement.style.height = 'auto'
        }

        // Измеряем полную высоту
        const fullHeight = el.offsetHeight
        tempHeights[index] = fullHeight

        // Возвращаем исходные стили
        if (el.parentElement) {
            el.parentElement.style.display = originalDisplay
            el.parentElement.style.visibility = originalVisibility
            el.parentElement.style.height = originalHeight
        }
    })

    // Обновляем высоты
    contentHeights.value = tempHeights
}

// Переключение состояния аккордеона
const toggle = (index: number) => {
    openStates.value[index] = !openStates.value[index]
}
</script>

<style scoped>
.accordion-item:last-child {
    border-bottom: none;
}

.content-wrapper {
    will-change: height;
}

.content-inner {
    opacity: 1;
}
</style>
