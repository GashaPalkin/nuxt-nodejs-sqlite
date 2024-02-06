import { ref } from 'vue'

// ver 1 Composition Pinia Store Syntax
import { defineStore } from 'pinia'

export const useTestStore = defineStore('testStore', () => {
  const inputValue = ref('')
  const testList = ref(['this is', 'test store', 'you can', 'add smth'])

  function addValueToTestList(value) {
    testList.value.push(value)
  }
  return { addValueToTestList, testList, inputValue }
})

// ver 2 Alternative Pinia Store Syntax
// import { defineStore } from 'pinia'
// export const useFiltersStore = defineStore({
//   id: 'filter-store',
//   state: () => {
//     return {
//       filtersList: ['this is', 'test store', 'you can', 'add smth'],
//     }
//   },
//   actions: {
//     addValueToFilterList(value: string) {
//       this.filtersList.push(value)
//     },
//   },
//   getters: {
//     getFiltersList: state => state.filtersList,
//   },
// })
