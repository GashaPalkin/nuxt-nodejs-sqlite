<script setup>
import { onMounted } from 'vue'
const route = useRoute()
const isPreloader = ref(true)

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

import { useDateFormat } from '@vueuse/core'
const formatter = ref('DD-MM-YY')
const formatterForReserve = ref('YYYY-MM-DD 12:00:00')

const successReservation = ref(false)

// берем последний элемент из массива uri
const id = route.params.uri.slice(-1)[0]

const { data: room } = await useFetch(`${BASE_URL}/api/room/${id}`)
const dateIn = ref(null)
const dateOut = ref(null)
const diff = ref(null)
const diffDays = ref(null)
const dateInFormatted = ref(null)
const dateOutFormatted = ref(null)
const totalPrice = ref(null)

const addReservationRoom = async () => {
  const addReserv = await useFetch(`${BASE_URL}/api/reserving/${room.room_id}`, {
    method: 'post',
    body: {    
      date_in: useDateFormat(dateIn, formatterForReserve),
      date_out: useDateFormat(dateOut, formatterForReserve),    
      room_id: room.value.room_id
    }
  })
  successReservation.value = true
  console.log(addReserv.data.value)
}

onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false
  }, 0)
  // делаю в onMounted потому что нет доступа к getCookie в setup
  dateIn.value = new Date(getCookie('DATE_IN'))
  dateOut.value = new Date(getCookie('DATE_OUT'))
  diff.value = Math.abs(dateOut.value.getTime() - dateIn.value.getTime())
  diffDays.value = Math.ceil(diff.value / (1000 * 3600 * 24))
  dateInFormatted.value = useDateFormat(getCookie('DATE_IN'), formatter)
  dateOutFormatted.value = useDateFormat(getCookie('DATE_OUT'), formatter)
  totalPrice.value = diffDays.value * room.value.room_price
})

</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container my-4">
    <div v-if="successReservation" class="alert alert-success alert-dismissible fade show w-100 p-3 mb-0" role="alert">
      <h4 class="alert-heading">Вы успешно забронировали комнату!</h4>
      <hr />
      <p class="text-muted">
        Вернуться на
        <NuxtLink to="/"><u>Главную</u></NuxtLink>
      </p>
    </div>
    <div class="card p-4">
      <h1 class="mb-4"> {{ room.room_title }}</h1>
      <div class="row align-items-center">
        <div class="col-md-7">
          <table class="table">
            <tbody>
              <tr>
                <td><b>Цена</b></td>
                <td>{{ room.room_price }} рублей / сутки</td>
              </tr>
              <tr>
                <td><b>Дата заезда / Дата выезда</b></td>
                <td> с {{ dateInFormatted }} по {{ dateOutFormatted }}</td>
              </tr>
              <tr>
                <td><b>Количество дней</b></td>
                <td> {{ diffDays }}</td>
              </tr>
              <tr>
                <td><b>Стоимость</b></td>
                <td><b>{{ totalPrice }} рублей</b></td>
              </tr>
            </tbody>
          </table>
          <button class="btn gradient-btn btn-sm px-3" @click="addReservationRoom">Забронировать</button>
        </div>
        <div class="col-md-5">
          <img :src="room.room_poster" class="img-fluid" alt="room">
        </div>
      </div>
    </div>
  </div>
</template>