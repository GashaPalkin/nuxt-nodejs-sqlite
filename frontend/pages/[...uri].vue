<script setup>
import { onMounted, inject } from 'vue'
const route = useRoute()
const isPreloader = ref(true)
const checkAuth = inject('checkAuth')
const categories = inject('categories')
const emailLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('USER_EMAIL') : null;

import { useAnimate } from '@vueuse/core'
const el = shallowRef()
const { smth } = useAnimate(
  el,
  [
    { clipPath: 'circle(20% at 0% 30%)' },
    { clipPath: 'circle(20% at 50% 80%)' },
    { clipPath: 'circle(20% at 100% 30%)' },
  ],
  {
    duration: 3000,
    iterations: 5,
    direction: 'alternate',
    easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
  },
)

const success = ref(false)

const file = ref(null)
const onChange = (e) => {
  file.value = e.target.files[0]
  console.log(file.value.name)
}

const formData = new FormData();
const addImageHandler = async () => {
  formData.append("image", file.value);
  const { data: responseData } = await useFetch(`${BASE_URL}/uploads`, {
    method: 'post',
    body: formData
  })
}

// берем последний элемент из массива uri
const id = route.params.uri.slice(-1)[0]
const { data: post } = await useFetch(`${BASE_URL}/api/post/${id}`)

const currentCategoryID = ref(post.value.category_id)
const getCurrentCategoryID = (id) => { currentCategoryID.value = id }

const postFormData = ref({
  title: post.value.post_title,
  content: post.value.post_content,
  image: post.value.post_image
})

const updatePostHandler = async () => {
  const { data: responseData } = await useFetch(`${BASE_URL}/api/post/${id}`, {
    method: 'put',
    body: {
      title: postFormData.value.title,
      content: postFormData.value.content,
      image: `/uploads/${file.value.name}`,
      category_id: currentCategoryID.value
    }
  })
  addImageHandler()
  success.value = true
  setTimeout(() => {
    reloadNuxtApp()
  }, 1500)
}

onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 0);
})
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container mt-5">
    <h1 ref="el" class="animated card-title text-center">Редактирование поста</h1>
    <p class="text-center">Выберите категорию поста</p>
    <form v-if="emailLocalStorage == post.user_email && checkAuth.isAuth.value" @submit.prevent="updatePostHandler">
      <div class="text-center">
        <span v-for="category in categories" :class="{ 'active_category': category.category_id == currentCategoryID }"
          class="badge bg-dark text-bg-dark me-2 py-2 px-3 mb-3" @click="getCurrentCategoryID(category.category_id)">
          {{ category.category_title }}
        </span>
      </div>
      <div class="form-outline">
        <input v-model="postFormData.title" type="text" id="field-name" name="name" class="form-control" />
      </div>
      <textarea v-model="postFormData.content" class="form-control form-control-lg" id="textArea" rows="10"></textarea>
      <div class="input-group mt-3">
        <input ref="file" v-on:change="onChange" type="file" name="image" class="form-control" id="inputGroupFile"
          aria-describedby="inputGroupFileAddon" aria-label="Upload">
      </div>
      <button type="submit" class="btn btn-dark px-4 py-1 my-3">
        Сохранить
      </button>
    </form>
    <div v-if="success" class="alert alert-success alert-dismissible fade show w-100 p-3 mb-0" role="alert">
      <h4 class="alert-heading">Пост обновлен</h4>
      <hr />
      <p class="text-muted">
        Вернуться на
        <NuxtLink to="/"><u>Главную</u></NuxtLink>
      </p>
    </div>
    <div class="card mb-3">
      <div class="row g-0 align-items-center">
        <div class="col-md-3">
          <img :src="post.post_image" class="img-fluid" alt="cat">
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h3 class="card-title">{{ post.post_title }}</h3>
            <p class="card-text"><small class="text-muted">by {{ post.user_name }} / {{ post.category_title }}</small></p>
            <p class="card-text">{{ post.post_content }}</p>
          </div>
        </div>
      </div>
    </div>
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