<script setup>
import { onMounted, ref } from 'vue'
const isPreloader = ref(true)
const categories = inject('categories')
const users = inject('users')

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
const currentCategoryID = ref(1)
const currenUserID = ref(null)
const getCurrentCategoryID = (id) => { currentCategoryID.value = id }

const postFormData = ref({
  title: '',
  content: '',
  image: ''
})

const file = ref(null)
const onChange = (e) => {
  file.value = e.target.files[0]
}

const formData = new FormData();
const addImageHandler = async () => {
  formData.append("image", file.value);
  const { data: responseData } = await useFetch(`${BASE_URL}/uploads`, {
    method: 'post',
    body: formData
  })
}

const newAddedPost = ref(null)

const addPostHandler = async () => {
  const { data: responseData } = await useFetch(`${BASE_URL}/api/post`, {
    method: 'post',
    body: {
      title: postFormData.value.title,
      content: postFormData.value.content,
      image: `/uploads/${file.value.name}`,
      category_id: currentCategoryID.value,
      user_id: currenUserID.value
    }
  })
  addImageHandler()
  // чтобы показать данные из созданного поста
  const lastPostID = responseData.value.id
  const { data: post } = await useFetch(`${BASE_URL}/api/post/${lastPostID}`)
  newAddedPost.value = post.value

  sessionStorage.setItem('NEW_ADDED_POST', JSON.stringify(post.value))
  success.value = true
  setTimeout(() => {
    reloadNuxtApp()
  }, 3000)
}

onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 0);
  const emailLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('USER_EMAIL') : null
  const getCurrentUser = users.filter(user => user.user_email === emailLocalStorage)
  currenUserID.value = getCurrentUser[0].user_id 
  newAddedPost.value = JSON.parse(sessionStorage.getItem('NEW_ADDED_POST'))
})
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container mt-5 p-4">
    <h1 ref="el" class="animated card-title text-center">Добавление поста</h1>
    <p class="text-center">Выберите категорию поста</p>
    <form enctype="multipart/form-data" @submit.prevent="addPostHandler">
      <div class="text-center">
        <span v-for="category in categories" :class="{ 'active_category': category.category_id == currentCategoryID }"
          class="badge bg-dark text-bg-dark me-2 py-2 px-3 mb-3" @click="getCurrentCategoryID(category.category_id)">
          {{ category.category_title }}
        </span>
      </div>
      <div v-if="success" class="alert alert-success alert-dismissible fade show w-100 p-3 mb-0" role="alert">
        <h4 class="alert-heading">Пост добавлен</h4>
        <hr />
        <p class="text-muted">
          Перезагрузка страницы...
        </p>
      </div>      
      <div v-if="newAddedPost" class="card mb-3">
        <div class="row g-0 align-items-center">
          <p class="p-3"><b>Последний Ваш созданный пост</b></p>
          <div class="col-md-3">
            <img :src="newAddedPost.post_image" class="img-fluid" alt="cat">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h3 class="card-title">{{ newAddedPost.post_title }}</h3>
              <p class="card-text"><small class="text-muted">by {{ newAddedPost.user_name }} / {{
                newAddedPost.category_title }}</small></p>
              <p class="card-text">{{ newAddedPost.post_content }}</p>             
            </div>
          </div>
        </div>
      </div>
      <div class="form-outline">
        <input v-model="postFormData.title" type="text" id="field-name" name="title" placeholder="Заголовок"
          class="form-control" />
      </div>
      <textarea v-model="postFormData.content" class="form-control form-control-lg mt-2" id="textArea" placeholder="Текст"
        rows="10">
      </textarea>
      <div class="input-group mt-3">
        <input ref="file" v-on:change="onChange" type="file" name="image" class="form-control" id="inputGroupFile"
          aria-describedby="inputGroupFileAddon" aria-label="Upload">
      </div>
      <button type="submit" class="btn btn-dark px-3 py-1 my-3">
        Сохранить
      </button>
    </form>
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