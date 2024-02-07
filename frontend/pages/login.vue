<script setup>
import { onMounted, ref } from 'vue'
const isPreloader = ref(true)
import { useUsersStore } from '~/store/usersStore'
const { loginHandler, loginFormData } = useUsersStore()
// а здесь надо бы опять getMe сделать / наверное через emit в app.vue
onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 0);
})
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader> 
  <div class="form-wrapper gradient-3">
    <div class="card" style="border-radius: 15px">
      <div class="card-body p-5">
        <h3>Войти</h3>
        <form @submit.prevent="loginHandler">
          <div class="form-outline">
            <label for="field-email">Email</label>
            <input v-model="loginFormData.email" type="email" id="field-email" name="login"
              class="form-control form-control-lg" />
          </div>
          <div class="form-outline">
            <label for="field-password">Пароль</label>
            <input v-model="loginFormData.password" type="password" id="field-password" name="password"
              class="form-control form-control-lg" />
          </div>
          <button type="submit" class="btn gradient-btn my-3 px-4 py-2">
            Войти
          </button>
          <p class="text-center text-muted">
            Еще не зарегистрированы?
            <NuxtLink to="/register"><u>Регистрация</u></NuxtLink>            
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
