import { defineStore } from 'pinia'

export interface Product {
    id: number
    name: string
    imageUrl: string
    price: {
        originalPrice: number
        currentPrice: number
    }
}

interface CartProduct extends Product {
    quantity: number
}

interface CartState {
    cartProducts: CartProduct[]
    totalPrice: number
    totalCount: number
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        cartProducts: [],
        totalPrice: 0,
        totalCount: 0,
    }),

    actions: {
        setAddProduct(product: Product) {
            const existingProduct = this.cartProducts.find(p => p.id === product.id)
            if (existingProduct) {
                existingProduct.quantity++
            } else {
                this.cartProducts.push({ ...product, quantity: 1 })
            }
            this.updateTotals()
        },

        updateTotals() {
            this.totalCount = this.cartProducts.reduce((acc, p) => acc + p.quantity, 0)
            this.totalPrice = this.cartProducts.reduce((acc, p) => acc + p.quantity * p.price.currentPrice, 0)
        },
    },

    getters: {},
})
