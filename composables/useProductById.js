export const useProduct = () => {
  const { $api } = useNuxtApp()
  const product = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchProductById = async (id) => {
    loading.value = true
    try {
      const res = await $api.get(`/products/${id}`)
      product.value = res.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    product,
    error,
    loading,
    fetchProductById,
  }
}