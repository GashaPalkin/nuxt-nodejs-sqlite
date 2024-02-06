<script setup>
import { onMounted, ref, computed, inject } from 'vue'
const isPreloader = ref(true)

import { useTestStore } from '~/store/testStore'
const { addValueToTestList, inputValue } = useTestStore()

const testList = inject('testList')
const posts = inject('posts')
const categories = inject('categories')

const currentCategoryID = ref(null)
const getCurrentCategoryID = (id) => { currentCategoryID.value = id }
const getPostsByCategory = (id) => posts.filter(post => post.category_id == id)
const postsByCategory = computed(() => {
  if (currentCategoryID.value) {
    return getPostsByCategory(currentCategoryID.value)
  } else return posts
})

onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 0);
})
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container mt-5">
    <div class="mb-3 d-flex">
      <input class="form-control w-25" v-model="inputValue" />
      <button class="btn btn-dark btn-sm ms-3" @click="addValueToTestList(inputValue)">Добавить</button>
    </div>
    <span class="badge bg-dark me-1 py-2 px-3 mb-3" v-for="item in testList">{{ item }}</span>
    <hr>
    <h4 class="ms-2">Categories from API Express:</h4>
    <span :class="{ 'active_category': currentCategoryID == null }" class="badge bg-dark text-bg-dark ms-2 py-3 px-4 mb-2"
      @click="currentCategoryID = null">
      Все
    </span>
    <span v-for="category in categories" :class="{ 'active_category': category.category_id == currentCategoryID }"
      class="badge bg-dark text-bg-dark ms-2 py-3 px-4 mb-2" @click="getCurrentCategoryID(category.category_id)">
      {{ category.category_title }}
    </span>
    <hr>
    <h2 class="mt-5 mb-3">Posts from API Express:</h2>
    <Post v-for="post in postsByCategory" :key="post.post_id" :post="post" :id="post.post_id" />
  </div>
</template>

<style scope>
.active_category {
  background-color: rgb(242, 242, 242) !important;
  border: rgb(210, 210, 210) solid 1px;
  color: black !important;
  box-shadow: 0px 0px 15px rgb(170, 170, 170);
}
</style>