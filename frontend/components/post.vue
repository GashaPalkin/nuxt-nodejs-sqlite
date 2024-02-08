<script setup>
import { onMounted, inject } from 'vue'
const props = defineProps(['post', 'id'])
const checkAuth = inject('checkAuth')
const emailLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('USER_EMAIL') : null;

const id = props.id
const deletePostHandler = async () => {
  const { data: responseData } = await useFetch(`${BASE_URL}/api/post/${id}`, {
    method: 'DELETE',
  })
  sessionStorage.removeItem('NEW_ADDED_POST')
  reloadNuxtApp()
}

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
          <div v-if="emailLocalStorage == post.user_email && checkAuth.isAuth.value" class="float-sm-end " role="group">
            <NuxtLink :to="`posts/${id}`">
              <button class="btn btn-success btn-sm me-2 px-3">
                Редактировать
              </button>
            </NuxtLink>
            <button class="btn btn-danger btn-sm px-3" data-bs-toggle="modal" :data-bs-target="`#modal-${post.post_id}`">
              Удалить
            </button>
            <!-- Modal -->
            <div class="modal fade" :id="`modal-${post.post_id}`" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5">Вы уверены что хотите удалить пост?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h1 class="modal-title fs-5">{{ post.post_title }}</h1>
                    <p class="card-text"><small class="text-muted">by {{ post.user_name }} / {{ post.category_title
                    }}</small></p>
                    <p class="card-text">{{ post.post_content }}</p>
                    <img :src="post.post_image" class="img-fluid" width="250px" alt="room">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                    <button type="button" class="btn btn-danger" @click="deletePostHandler">Удалить</button>
                  </div>
                </div>
              </div>
            </div>
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
