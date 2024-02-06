<script setup>
const props = defineProps(['checkAuth', 'logoutHandler'])
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-gradient">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand">Nuxt NodeJS API</NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link active">Посты</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/booking" class="nav-link">Бронирование номеров</NuxtLink>
          </li>
        </ul>
        <NuxtLink to="/register">
          <button v-if="!checkAuth.isAuth.value" class="btn btn-outline-light btn-sm ms-2">Регистрация</button>
        </NuxtLink>
        <NuxtLink to="/login">
          <button v-if="!checkAuth.isAuth.value" class="btn btn-light btn-sm ms-2">Войти</button>
        </NuxtLink>
        <NuxtLink to="/add-post">
          <button v-if="checkAuth.isAuth.value" class="btn btn-outline-light btn-sm ms-2">Добавить пост
          </button>
        </NuxtLink>      
        <button v-if="checkAuth.isAuth.value" @click="logoutHandler" class="btn btn-light btn-sm ms-2">Выйти</button>
      </div>
    </div>
  </nav>
</template>


<style scope>
.navbar a {
  color: white !important;
  font-weight: bolder;
  transition-duration: .2s;
}

.navbar a:hover {
  color: rgb(223, 223, 223) !important;
}

.navbar-gradient {
  background: -moz-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: -webkit-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: -o-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: -ms-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: linear-gradient(270deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0cb4ce', endColorstr='#6442ff', GradientType=1);
}
</style>
