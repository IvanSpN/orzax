<template>
    <footer :class="footerClasses">
        <FooterSubscriptionMain :variant="variant" />
        <div class="w-full flex justify-center mb-8">
            <div class="w-[93%] h-px bg-white"></div>
        </div>
        <div class="container mx-auto p-4 flex gap-[100px]">
            <div class="max-w-[400px] flex flex-col gap-12">
                <div>
                    <img src="/assets/img/footer_logo.webp" alt="" width="145" height="45" />
                </div>
                <div>
                    <p :class="textClasses">
                        Более 30 лет мы исследуем, применяем инновации и разрабатываем широкий спектр продуктов с
                        натуральными ингредиентами. Линейка обеспечивает комплексную поддержку здоровья, обеспечивая
                        нормальную работу всех систем организма, улучшая сон, настроение и повышая уровень энергии.
                    </p>
                </div>
                <div class="flex gap-10">
                    <div><IconsVk /></div>
                    <div><IconsTg /></div>
                    <div><IconsPg /></div>
                    <div><IconsYouTube /></div>
                </div>
            </div>
            <div class="max-w-[800px] p-6 flex flex-col gap-7">
                <div class="flex gap-[80px]">
                    <ul :class="`${textClasses} flex flex-col`">
                        <li>Каталог</li>
                        <li>Наборы Orzax</li>
                        <li>Консультация <br />нутрициолога</li>
                    </ul>
                    <ul :class="`${textClasses} flex flex-col`">
                        <li>Опт</li>
                        <li>Наши партнеры</li>
                        <li>Бонусная программа</li>
                    </ul>
                    <ul :class="`${textClasses} flex flex-col`">
                        <li>О нас</li>
                        <li>Вопрос-Ответ</li>
                        <li>Контакты</li>
                    </ul>
                </div>
                <div class="flex gap-[90px] mb-[70px]">
                    <ul :class="`${textClasses} flex flex-col`">
                        <li>Политика Использования Файлов Cookie</li>
                        <li>Политика Обработки Персональных Данных</li>
                    </ul>
                    <ul :class="`${textClasses} flex flex-col`">
                        <li>Политика Возврата</li>
                        <li>Оферта</li>
                    </ul>
                </div>
                <div>
                    <ul :class="`${textClasses} flex flex-col`">
                        <li>ИП Бабаев Севдар Захидович</li>
                        <li>ИНН 784805867837 / ОГРНИП 323784700057207</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="w-full flex justify-center mb-8">
            <div class="w-[93%] h-px bg-white"></div>
        </div>
        <div :class="`${textClasses} mx-auto w-fit pb-8`">
            <p>© 2024 Orzax Все права защищены</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
interface Props {
    variant?: 'default' | 'shop'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default'
})

const footerClasses = computed(() => {
    switch (props.variant) {
        case 'shop':
            return 'bg-white-900' 
        case 'default':
        default:
            return 'bg-[#27272A]'
    }
})

const textClasses = computed(() => {
    switch (props.variant) {
        case 'shop':
            return 'text-black'
        case 'default':
        default:
            return 'text-white'
    }
})
</script>