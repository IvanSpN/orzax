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

interface AccordionItem {
    title: string
}

const props = defineProps<{
    items: AccordionItem[]
}>()

const openStates = ref<boolean[]>([])
const contentRefs = ref<HTMLElement[]>([])
const contentHeights = ref<number[]>([])

onBeforeUpdate(() => {
    contentRefs.value = []
})

onMounted(async () => {
    openStates.value = Array(props.items.length).fill(false)

    await nextTick()
    updateAllContentHeights()

    window.addEventListener('resize', updateAllContentHeights)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateAllContentHeights)
})

const updateAllContentHeights = () => {
    if (!contentRefs.value.length) return

    const tempHeights: number[] = []

    contentRefs.value.forEach(el => {
        const index = parseInt(el.dataset.index || '0')

        const originalDisplay = el.parentElement?.style.display || ''
        const originalVisibility = el.parentElement?.style.visibility || ''
        const originalHeight = el.parentElement?.style.height || ''

        if (el.parentElement) {
            el.parentElement.style.display = 'block'
            el.parentElement.style.visibility = 'hidden'
            el.parentElement.style.height = 'auto'
        }

        const fullHeight = el.offsetHeight
        tempHeights[index] = fullHeight

        if (el.parentElement) {
            el.parentElement.style.display = originalDisplay
            el.parentElement.style.visibility = originalVisibility
            el.parentElement.style.height = originalHeight
        }
    })

    contentHeights.value = tempHeights
}

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
