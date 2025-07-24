<template>
            <div v-if="isLoading" class="skeleton-slider">
                <div class="skeleton-container">
                    <div v-for="n in 3" :key="n" class="skeleton-card">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-image"></div>
                        <div class="skeleton-price"></div>
                        <div class="skeleton-price"></div>
                        <div class="skeleton-button"></div>
                    </div>
                </div>
            </div>
            <div v-else-if="hasError" class="error-state">
                <div class="error-content">
                    <p class="error-text">Ошибка загрузки товаров: {{ error }}</p>
                    <button @click="productsStore.fetchProducts()" class="retry-button">Повторить попытку</button>
                </div>
            </div>
            <div v-else-if="isEmpty" class="empty-state">
                <p class="empty-text">Товары не найдены</p>
            </div>
    <section
    v-else
    class="container parent mx-auto gap-4 h-[600px] max-w-[1200px]">
        <div class="div1 relative max-w-[380px]  rounded-4xl overflow-hidden">
            <img class=" rounded-4xl h-full object-cover transition-transform duration-300 hover:scale-105" src="/public/assets/baner_about_us.webp" width="380" height="290" alt=""/>
            <div class="font-bold text-3xl absolute top-[30px] left-[20px] ">
                <h3 class="font-bold text-3xl">О нас</h3>
                <p class="font-bold text-[16px]">Объеденяем пути к здоровью</p>
            </div>
        </div>
        <div class="div2 relative max-w-[380px] max-h-[290px]">
            <img class="rounded-4xl " src="/public/assets/b_opt.webp" width="380" height="290" alt="" />
            <p class="font-bold text-3xl absolute top-[30px] left-[20px]">Опт</p>
        </div>
        <div class="div3 relative max-w-[380px] max-h-[290px]">
            <img class="rounded-4xl " src="/public/assets/b_advice.webp" width="380" height="290" alt="" />
            <p class="font-bold text-3xl absolute top-[30px] left-[20px]">Консультация нутрициолога</p>
        </div>
        <div class="div4 relative max-w-[380px] max-h-[290px]">
            <img class="rounded-4xl " src="/public/assets/b_boks.webp" width="380" height="290" alt="" />
            <p class="font-bold text-3xl absolute top-[30px] left-[20px]">Наборы</p>
        </div>
        <div class="div5 relative max-w-[380px] max-h-[290px]">
            <img  class="rounded-4xl " src="/public/assets/b_bonus.jpeg" width="380" height="290" alt="" />
            <p class="font-bold text-3xl absolute top-[30px] left-[20px]">Бонусная программа</p>
        </div>
    </section>
</template>
<script setup>

const productsStore = useProductsStore()
const {  isLoading, error, hasError, isEmpty } = storeToRefs(productsStore)

</script>

<style scoped>
.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.div1 {
    grid-area: 1 / 1 / 3 / 2;

}
.div2 {
    grid-area: 1 / 2 / 2 / 3;

}
.div3 {
    grid-area: 1 / 3 / 2;

}
.div4 {
    grid-area: 2 / 2 / 3 / 3;

}
.div5 {
    grid-area: 2 / 3 / 3;

}

.skeleton-slider {
    padding: 20px;
}

.skeleton-container {
    display: flex;
    gap: 50px;
    overflow: hidden;
    justify-content: center;
}

.skeleton-card {
    flex: 0 0 calc(20% - 40px);
    text-align: center;
    padding: 10px;
    width: 180px;
}

.skeleton-title {
    height: 60px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 10px;
}

.skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 8px;
    margin-bottom: 10px;
}

.skeleton-price {
    height: 20px;
    width: 60%;
    margin: 5px auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

.skeleton-button {
    height: 32px;
    width: 80%;
    margin: 10px auto;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Error state styles */
.error-state {
    padding: 40px 20px;
    text-align: center;
}

.error-content {
    max-width: 400px;
    margin: 0 auto;
}

.error-text {
    color: #ef4444;
    font-size: 16px;
    margin-bottom: 20px;
}

.retry-button {
    background-color: #10b981;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.retry-button:hover {
    background-color: #059669;
}

.empty-state {
    padding: 40px 20px;
    text-align: center;
}

.empty-text {
    color: #6b7280;
    font-size: 16px;
}

@media (max-width: 1024px) {
    .skeleton-card {
        flex: 0 0 calc(25% - 37.5px);
    }
}

@media (max-width: 768px) {
    .skeleton-card {
        flex: 0 0 calc(50% - 25px);
    }

    .skeleton-container {
        gap: 25px;
    }
}

@media (max-width: 480px) {
    .skeleton-card {
        flex: 0 0 100%;
    }

    .skeleton-container {
        gap: 20px;
    }
}
</style>
