<script setup>
import { onMounted, provide } from 'vue'
import { useUsersStore } from '~/store/usersStore'
import { storeToRefs } from 'pinia'

import { useTestStore } from '~/store/testStore'
import { usePostsStore } from '~/store/postsStore'
import { useCategoriesStore } from '~/store/categoriesStore'
import { useRoomsStore } from '~/store/roomsStore'

//  берем все данные из БД
const { testList } = useTestStore()
const { posts } = usePostsStore()
const { categories } = useCategoriesStore()
const { rooms, roomsWithReserves } = useRoomsStore()

//  проверка на авторизацию
const isAuth = useUsersStore()
const { users, getMeHandler, logoutHandler } = useUsersStore()
const checkAuth = storeToRefs(isAuth)

// передаем все данные компонентам
provide('testList', testList)
provide('users', users)
provide('posts', posts)
provide('categories', categories)
provide('rooms', rooms)
provide('roomsWithReserves', roomsWithReserves)
provide('checkAuth', checkAuth)

onMounted(() => {
  setTimeout(() => {
    getMeHandler()
  }, 0)
})
</script>
<template>
  <Header :checkAuth="checkAuth" :logoutHandler="logoutHandler" />
  <NuxtPage />
</template>

<style>
@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap);

body {
  font-size: 15px;
  line-height: 1.60;
  font-family: Montserrat, sans-serif;
  background-color: #ebebeb;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient-1 {
  background: #84fab0;
  height: 100vh;
  background: -webkit-linear-gradient(to right,
      rgba(132, 250, 176, 0.5),
      rgba(143, 211, 244, 0.5));
  background: linear-gradient(to right,
      rgba(132, 250, 176, 0.5),
      rgba(143, 211, 244, 0.5));
}

.gradient-2 {
  background: #84fab0;
  height: 100vh;
  background: -webkit-linear-gradient(to right,
      rgba(132, 250, 176, 1),
      rgba(143, 211, 244, 1));
  background: linear-gradient(to right,
      rgba(132, 250, 176, 1),
      rgba(143, 211, 244, 1));
}

.gradient-3 {
  height: 100vh;
  background: -moz-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: -webkit-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: -o-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: -ms-linear-gradient(180deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  background: linear-gradient(270deg, #6442ff 0%, #1a60ff 47%, #0cb4ce 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0cb4ce', endColorstr='#6442ff', GradientType=1);
}

.gradient-btn {
  background: rgb(69, 151, 192);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0;
  background: -webkit-linear-gradient(to right,
      rgb(67, 199, 225),
      rgb(69, 151, 192));
  background: linear-gradient(to right,
      rgb(67, 199, 225),
      rgb(69, 151, 192));
}

.gradient-btn:hover {
  background: rgb(69, 151, 192);
  color: white;
  background: -webkit-linear-gradient(to right,
      rgb(68, 215, 244),
      rgb(18, 113, 160));
  background: linear-gradient(to right,
      rgb(68, 215, 244),
      rgb(18, 113, 160));
}

.cursor-pointer {
  cursor: pointer;
}
</style>
