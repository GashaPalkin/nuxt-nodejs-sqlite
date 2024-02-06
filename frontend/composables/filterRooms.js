import { ref } from 'vue'

export function useFilterRooms(roomsWithReserves) {
  const filteredRooms = ref([])
  const dateIn = ref(null)
  const dateOut = ref(null)
  const isDatePicked = ref(false)

  function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }

  function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }

  function setDates(dates) {
    if (dates !== null) {
      dateIn.value = dates[0]
      setCookie('DATE_IN', dates[0], { secure: true, 'max-age': 3600 })
      dateOut.value = dates[1]
      setCookie('DATE_OUT', dates[1], { secure: true, 'max-age': 3600 })
      isDatePicked.value = true
    }
  }

  function clearDates() {
    dateIn.value = null
    deleteCookie('DATE_IN')
    dateOut.value = null
    deleteCookie('DATE_OUT')
    filteredRooms.value = []
    isDatePicked.value = false
  }

  function filterRooms() {
    const overlaps = []
    const allFiltersRooms = []
    roomsWithReserves.forEach(room => {
      // проверка на наличие брони
      if (room.reserv_date_in && room.reserv_date_out) {
        // date from API
        const startDate1 = new Date(room.reserv_date_in)
        const endDate1 = new Date(room.reserv_date_out)
        // date from frontend
        const startDate2 = dateIn.value
        const endDate2 = dateOut.value
        overlaps.push(startDate1 < endDate2 && startDate2 < endDate1)
        // проверка на пересечения. если нет - то добавляем в массив        
        if (!overlaps.includes(true) && dateIn.value && dateOut.value) {
          allFiltersRooms.push(room)
        }
      }
      // если брони нет - то добавляем в массив
      else allFiltersRooms.push(room)
    })
    //  получаем только уникальные объекты по room_id
    const uniqueFiltersRooms = allFiltersRooms.reduce((accumulator, currentValue) => {
      if (accumulator.every(item => !(item.room_id === currentValue.room_id)))
        accumulator.push(currentValue);
      return accumulator;
    }, []);
    filteredRooms.value = uniqueFiltersRooms
  }

  return {
    filteredRooms,
    isDatePicked,
    setDates,
    clearDates,
    filterRooms
  }
}