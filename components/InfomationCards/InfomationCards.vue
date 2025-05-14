<template>
    <section class="container parent mx-auto gap-4 h-[600px] max-w-[1200px]">
        <div class="div1 relative max-w-[380px] max-h-[290px] rounded-4xl">
            <img class=" rounded-4xl " src="/public/assets/baner_about_us.webp" width="380" height="290" alt=""/>
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
<style>
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
</style>
