import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const { data: getAllCategories } = useFetch(`${BASE_URL}/api/categories`)
  const categories = getAllCategories.value
  return { categories }
})