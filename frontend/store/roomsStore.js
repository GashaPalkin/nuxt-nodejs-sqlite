import { defineStore } from 'pinia'

export const useRoomsStore = defineStore('roomsStore', () => {
  const { data: getAllRooms } = useFetch(`${BASE_URL}/api/rooms`)
  const rooms = getAllRooms.value

  const { data: getRoomsWithReserves } = useFetch(`${BASE_URL}/api/rooms-reserves`)
  const roomsWithReserves = getRoomsWithReserves.value

  return { rooms, roomsWithReserves }
})