<script setup>
import { onMounted, inject, shallowRef, ref } from 'vue'
const isPreloader = ref(true)
const rooms = inject('rooms')
const roomsWithReserves = inject('roomsWithReserves')

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

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

const dates = ref(null)
import { useFilterRooms } from '~/composables/filterRooms.js'
const {
  filteredRooms,
  isDatePicked,
  setDates,
  clearDates,
  filterRooms } = useFilterRooms(roomsWithReserves)

onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 0);
})
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container mt-5">
    <h1 ref="el" class="animated card-title text-center">Бронирование номеров</h1>
    <p class="text-center">Выберите желаемый период пребывания</p>
    <VueDatePicker class="w-25 mb-4 mx-auto" range v-model="dates" :format="'dd/MM/yy'" locale="ru" cancelText="Отменить"
      selectText="Выбрать" :min-date="new Date()" @internal-model-change="setDates" @closed="filterRooms"
      @cleared="clearDates" />
    <div v-if="filteredRooms.length > 0">
      <Room v-for="room in filteredRooms" :key="room.room_id" :room="room" :dates="dates" :isDatePicked="isDatePicked" />
    </div>
    <div v-else>
      <Room v-for="room in rooms" :key="room.room_id" :room="room" :dates="dates" :isDatePicked="isDatePicked" />
    </div>
  </div>
</template>

<style scope> h1 {
   font-weight: bold;
 }

 .dp__input {
   text-align: center;
 }
</style>