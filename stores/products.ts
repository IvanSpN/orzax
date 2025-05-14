import { defineStore } from "pinia"

export const useProductsStore = defineStore('products', {
  state: () => ({
products: [] as any,
  }),
actions: {
  async fetchProducts() {
    const nuxtApp = useNuxtApp()
    const api = nuxtApp.$api  // ✅ теперь TypeScript понимает тип
    try {
      const response = await api.get('/products')
      this.products = response.data
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error)
    }
  },
},
  getters: {
  },
})