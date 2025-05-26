import { defineStore } from 'pinia'

interface Subscriber {
    name: string
    email: string
}

interface SubscriptionsState {
    subscribers: Subscriber[]
}

export const useSubscriptionStore = defineStore('subscription', {
    state: (): SubscriptionsState => ({
        subscribers: [],
    }),
    actions: {
        async submitSubscription(dto: Subscriber) {
            const nuxtApp = useNuxtApp()

            const api = nuxtApp.$api

            try {
                const response = await api.post('/subscription', dto)
                this.subscribers.push(dto)
                return response.data
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error)
            }
        },
    },
    getters: {},
})
