<template>
    <div :class="containerClasses">
        <h5 class="text-[26px] font-bold mb-[50px] py-2.5">Подпишись на рассылку новостей</h5>
        <div class="flex gap-3 flex-col">
            <div class="flex gap-3">
                <label class="bg-amber-50 text-black p-2.5 pl-[25px] rounded-[14px]">
                    <input type="text" placeholder="Имя" class="w-[262px] focus:outline-none"/>
                </label>
                <label class="bg-amber-50 text-black p-2.5 pl-[25px] rounded-[14px]">
                    <input type="email" placeholder="Email" class="w-[262px] focus:outline-none"/>
                </label>
                <button type="submit" class="bg-[#7ED615] px-10 rounded-[14px] w-[235px]">Отправить</button>
            </div>
            <p class="disclaimer">Нажимая на кнопку «Отправить», я соглашаюсь с политикой обработки персональных данных</p>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    variant?: 'default' | 'shop'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
})

const containerClasses = computed(() => {
    const baseClasses = 'flex flex-col justify-center items-center text-white py-2.5 mx-auto pb-12'

    switch (props.variant) {
        case 'shop':
            return `${baseClasses} bg-green-900`
        case 'default':
        default:
            return `${baseClasses} bg-[#27272A]`
    }
})
</script>