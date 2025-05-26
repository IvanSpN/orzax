import { defineStore } from 'pinia'

export interface Product {
    id: number
    name: string
    category: string
    description: string
    advantages: string[]
    application: {
        description: string
        nutraceutical: string[]
    }
    contraindications: string
    composition: {
        dose: string
        quantity_in_pack: number
        ingredients: string[]
    }
    price: {
        originalPrice: number
        currentPrice: number
    }
    availability: number
    imageUrl: string
    quantity: number
}

interface ProductsState {
    products: Product[]
    selectedCategory: string | null
}

export const useProductsStore = defineStore('products', {
    state: (): ProductsState => ({
        products: [],
        selectedCategory: null,
    }),
    actions: {
        async fetchProducts() {
            const nuxtApp = useNuxtApp()
            const api = nuxtApp.$api
            try {
                const response = await api.get('/products')
                this.products = response.data
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error)
            }
        },

        setCategory(category: string | null) {
            this.selectedCategory = category
        },
    },
    getters: {
        filteredProducts(state) {
            if (!state.selectedCategory) return state.products
            return state.products.filter((product: any) => product.category === state.selectedCategory)
        },
    },
})
