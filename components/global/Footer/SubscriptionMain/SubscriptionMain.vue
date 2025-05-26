<template>
    <form @submit.prevent="submitForm" :class="containerClasses">
        <h5 class="text-[26px] font-bold mb-[50px] py-2.5">Подпишись на рассылку новостей</h5>
        <div class="flex gap-3 flex-col">
            <div class="flex gap-3 items-stretch">
                <div class="flex flex-col relative">
                    <label class="bg-amber-50 text-black p-2.5 pl-[25px] rounded-[14px]">
                        <input v-model="form.name" type="text" placeholder="Имя" class="w-[262px] focus:outline-none" />
                    </label>
                    <span class="text-red-500 text-sm mt-1 ml-2 absolute top-10 left-0">
                        {{ errorsForm.name }}
                    </span>
                </div>
                <div class="flex flex-col relative">
                    <label class="bg-amber-50 text-black p-2.5 pl-[25px] rounded-[14px]">
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="Email"
                            class="w-[262px] focus:outline-none"
                        />
                    </label>
                    <span class="text-red-500 text-sm mt-1 ml-2 absolute top-10 left-0">
                        {{ errorsForm.email }}
                    </span>
                </div>
                <button type="submit" class="bg-[#7ED615] px-10 rounded-[14px] w-[235px] cursor-pointer">
                    Отправить
                </button>
            </div>
            <p class="disclaimer">
                Нажимая на кнопку «Отправить», я соглашаюсь с политикой обработки персональных данных
            </p>
        </div>
    </form>
    <Teleport to="body">
        <transition name="fade">
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">Спасибо!</h2>
                    <p class="text-gray-700 mb-4">Вы успешно подписались на рассылку.</p>
                    <button
                        @click="showModal = false"
                        class="bg-[#7ED615] text-white px-4 py-2 rounded-lg hover:bg-[#6ac412] transition"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup lang="ts">
interface Props {
    variant?: 'default' | 'shop'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
})

const showModal = ref(false)

const subscription = useSubscriptionStore()

const form = reactive({
    name: '',
    email: '',
})

const errorsForm = reactive({
    name: '',
    email: '',
})

const isSubmitting = ref(false)

watch(
    () => form.name,
    value => {
        if (isSubmitting.value) return
        if (!value.trim()) {
            errorsForm.name = 'Имя обязательно'
        } else if (value.length < 2) {
            errorsForm.name = 'Имя должно быть не короче 2 символов'
        } else {
            errorsForm.name = ''
        }
    }
)

watch(
    () => form.email,
    value => {
        if (isSubmitting.value) return
        if (!value.trim()) {
            errorsForm.email = 'Email обязателен'
        } else if (!isValidEmail(value)) {
            errorsForm.email = 'Введите корректный email'
        } else {
            errorsForm.email = ''
        }
    }
)

function isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
}

const submitForm = async () => {
    validateForm()

    const hasErrors = Object.values(errorsForm).some(error => error.length > 0)

    if (hasErrors) {
        console.log('Форма содержит ошибки. Отправка отменена.')
        return
    }

    try {
        const response = await subscription.submitSubscription(form)

        console.log('Успешно отправлено:', response)
        showModal.value = true

        setTimeout(() => {
            showModal.value = false
        }, 3000)

        isSubmitting.value = true

        form.name = ''
        form.email = ''

        errorsForm.name = ''
        errorsForm.email = ''

        await nextTick()

        isSubmitting.value = false
    } catch (error) {
        console.error('Ошибка при отправке:', error)
    }
}

function validateForm() {
    if (!form.name.trim()) {
        errorsForm.name = 'Имя обязательно'
    } else if (form.name.length < 2) {
        errorsForm.name = 'Имя должно быть не короче 2 символов'
    } else {
        errorsForm.name = ''
    }

    if (!form.email.trim()) {
        errorsForm.email = 'Email обязателен'
    } else if (!isValidEmail(form.email)) {
        errorsForm.email = 'Введите корректный email'
    } else {
        errorsForm.email = ''
    }
}

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
