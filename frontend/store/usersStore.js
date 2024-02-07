import { ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL } from '~/utils/constants'

export const useUsersStore = defineStore('usersStore', () => {
  const { data: getAllUsers } = useFetch(`${BASE_URL}/api/users`)
  const users = getAllUsers.value
  const tokenLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : null; 
  const isAuth = ref(false)

  const getMeHandler = () => {
    const emailLocalStorage = typeof window !== 'undefined' ? localStorage.getItem('USER_EMAIL') : null;  
    const user = { "email": emailLocalStorage }
    useFetch(`${BASE_URL}/api/auth/me`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tokenLocalStorage}` },
      body: user
    })
      .then((res) => res.data.value.isAuth ? isAuth.value = true : null)
  }

  const loginFormData = ref({
    email: '',
    password: '',
  })

  const loginHandler = async () => {
    const { data: responseData } = await useFetch(`${BASE_URL}/api/auth/login`, {
      method: 'post',
      body: {
        email: loginFormData.value.email,
        password: loginFormData.value.password,
      },
    })
    if (responseData.value) {
      localStorage.setItem('TOKEN', responseData.value.token)
      localStorage.setItem('USER_EMAIL', responseData.value.data.email)
    } else {
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('USER_EMAIL')
    }    
    return reloadNuxtApp()
  }

  const registerFormData = ref({
    name: '',
    email: '',
    password: '',
  })

  const registerHandler = async () => {
    const { data: responseData } = await useFetch(`${BASE_URL}/api/auth/register`, {
      method: 'post',
      body: {
        name: registerFormData.value.name,
        email: registerFormData.value.email,
        password: registerFormData.value.password,
      }
    })
    if (responseData.value.message == "success") {
      localStorage.setItem('TOKEN', responseData.value.token)
      localStorage.setItem('USER_EMAIL', responseData.value.data.email)
    } else {
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('USER_EMAIL')
    }   
    return reloadNuxtApp()
  }

  const logoutHandler = () => {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USER_EMAIL')
    isAuth.value = false
    getMeHandler()
    return navigateTo("/");
  }

  return { users, isAuth, loginFormData, registerFormData, getMeHandler, loginHandler, registerHandler, logoutHandler }

})