<script setup>
import { onMounted, inject } from 'vue'
const props = defineProps(['post', 'id'])
const checkAuth = inject('checkAuth')
const emailLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('USER_EMAIL') : null;
onMounted(() => {
  // console.log(emailLocalStorage);
})
</script>

<template>
  <div class="post card mb-3">
    <div class="row g-0 align-items-center">
      <div class="col-md-3">
        <img :src="post.post_image" class="img-fluid" alt="cat">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h3 class="card-title">{{ post.post_title }}</h3>
          <p class="card-text"><small class="text-muted">by {{ post.user_name }} / {{ post.category_title }}</small></p>
          <p class="card-text">{{ post.post_content }}</p>
          <NuxtLink :to="`posts/${id}`">
            <button class="btn btn-dark btn-sm mb-1 me-2">Подробнее</button>
          </NuxtLink>
          <div v-if="emailLocalStorage == post.user_email && checkAuth.isAuth.value" class="btn-group mb-1 float-sm-end "
            role="group">
            <NuxtLink :to="`posts/${id}`">
              <button class="btn btn-outline-dark btn-sm px-3">
                Редактировать
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
.post {
  border: 0;
  background-color: #ffffff;
  color: #222222;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.30);
  border-radius: 0.4em;
}
</style>
