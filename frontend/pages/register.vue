<script setup>
import { onMounted, ref } from 'vue'
const isPreloader = ref(true)
import { useUsersStore } from '~/store/usersStore'
const { registerHandler, registerFormData } = useUsersStore()

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
        <h3>Регистрация</h3>
        <form @submit.prevent="registerHandler">
          <div class="form-outline">
            <label class="form-label" for="field-name">Ваше Имя</label>
            <input v-model="registerFormData.name" type="text" id="field-name" name="name" class="form-control" />
          </div>
          <div class="form-outline">
            <label class="form-label" for="field-email">Ваш Email</label>
            <input v-model="registerFormData.email" type="email" id="field-email" name="email" class="form-control" />
          </div>
          <div class="form-outline">
            <label class="form-label" for="field-password">Пароль</label>
            <input v-model="registerFormData.password" type="password" id="field-password" name="password"
              class="form-control" />
          </div>         
          <p class="text-center text-muted mt-2">
            Уже зарегистрированы?
            <NuxtLink to="/login"><u>Логин</u></NuxtLink>            
          </p>
          <button type="submit" class="btn gradient-btn px-4 py-2">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scope>
.form-label {
  margin-bottom: 0;
}

.form-outline {
  margin-bottom: 10px;
}
</style>