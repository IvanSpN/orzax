import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'https://5226c87a2829b122.mokky.dev',
 
  })

  return {
    provide: {
      api,
    },
  }
})
