import { defineStore } from 'pinia'
import { useApiFetch } from '@/utils/api'

export interface Product {
    id: number
    name: string
    categoryId: number
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
    selectedCategory: number | null
    isLoading: boolean
    error: string | null
}

export const useProductsStore = defineStore('products', {
    state: (): ProductsState => ({
        products: [],
        selectedCategory: null,
        isLoading: true,
        error: null,
    }),
    actions: {
        async fetchProducts() {
            console.log('Fetching products...')

            const response = await useApiFetch<Product[]>('/products')

            console.log('API Response:', response)

            this.products = response.data || []
            this.error = response.error
            this.isLoading = response.isLoading

            if (response.success) {
                console.log('Products loaded successfully:', response.data)
            } else {
                console.error('Failed to load products:', response.error)
            }
        },

        setCategory(category: number | null) {
            this.selectedCategory = category
        },

        clearError() {
            this.error = null
        }
    },
    getters: {
        filteredProducts(state) {
            if (!state.selectedCategory) return state.products
            return state.products.filter((product: Product) => product.categoryId === state.selectedCategory)
        },

        hasError(state) {
            return !!state.error
        },

        isEmpty(state) {
            return state.products.length === 0 && !state.isLoading
        },

        isSuccess(state) {
            return state.products.length > 0 && !state.error
        }
    },
})