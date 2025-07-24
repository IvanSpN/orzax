import { defineStore } from 'pinia'
import { useApiFetch } from '@/utils/api'

export interface Categories {
    id: number
    slug: string
    name: string
    description: string
}

interface CategoriesState {
    categories: Categories[]
    isLoadingCategories: boolean
    errorCategories: string | null
}

export const useCategoriesStore = defineStore('categories', {
    state: (): CategoriesState => ({
        categories: [],
        isLoadingCategories: true,
        errorCategories: null,
    }),
    actions: {
        async fetchCategories() {
            console.log('🔄 fetchCategories вызван')
            const response = await useApiFetch<Categories[]>('/categories')

            console.log('API Response:', response)

            this.categories = response.data || []
            this.errorCategories = response.error
            this.isLoadingCategories = response.isLoading

            if (response.success) {
                console.log('categories loaded successfully:', response.data)
            } else {
                console.error('Failed to load categories:', response.error)
            }
        },

        clearError() {
            this.errorCategories = null
        },
    },
    getters: {
        hasError(state) {
            return !!state.errorCategories
        },

        isEmpty(state) {
            return state.categories.length === 0 && !state.isLoadingCategories
        },

        isSuccess(state) {
            return state.categories.length > 0 && !state.errorCategories
        },
    },
})
