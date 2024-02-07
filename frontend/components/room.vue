<script setup>
import { onMounted } from 'vue'
const props = defineProps(['room', 'dates', 'isDatePicked'])
const show = ref(false)
onMounted(() => {
  // console.log(props.room);
})
</script>

<template>
  <div class="room d-flex mb-4">
    <img :src="room.room_poster" class="img-fluid" alt="room">
    <div class="room-poster">
      <span v-if="room.room_all_inclusive" class="position-absolute top-0 start-0 badge bg-success px-4 py-2">
        Все включено
      </span>
      <span v-if="room.room_breakfast" class="position-absolute top-0 start-0 badge bg-success px-4 py-2">
        Завтрак включен
      </span>
    </div>
    <div class="room-body">
      <div class="center-section">
        <div v-if="show == true" class="alert alert-danger d-flex align-items-center fade show p-2" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
              <path
                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </symbol>
          </svg>
          <svg class="flex-shrink-0 me-1" width="22" height="22" role="img" aria-label="Danger:">
            <use xlink:href="#exclamation-triangle-fill" />
          </svg>
          <div>
            Необходимо выбрать даты
          </div>
        </div>
        <h3 class="card-title">{{ room.room_title }}</h3>
        <p class="card-text">{{ room.room_description }}</p>
        <button type="button" class="btn btn-dark btn-sm px-2" data-bs-toggle="modal"
          :data-bs-target="`#modal-${room.room_id}`">
          Подробнее
        </button>
        <!-- Modal -->
        <div class="modal fade" :id="`modal-${room.room_id}`" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5">{{ room.room_title }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p class="card-text">{{ room.room_description }}</p>
                <img :src="room.room_poster" class="img-fluid" alt="room">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-section">
        <div>
          <p class="card-text">
            <svg xmlns="http://www.w3.org/2000/svg" class="mb-2 me-1" viewBox="0 0 24 24" width="22" height="22"
              fill="grey">
              <g id="_01_align_center">
                <path
                  d="M24,24H12.018A12,12,0,1,1,24,11.246l0,.063ZM12.018,2a10,10,0,1,0,0,20H22V11.341A10.018,10.018,0,0,0,12.018,2Z" />
                <rect x="7" y="7" width="6" height="2" />
                <rect x="7" y="11" width="10" height="2" />
                <rect x="7" y="15" width="10" height="2" />
              </g>
            </svg>
            Комментарии (2)
          </p>
          <span v-if="room.room_best_offer" class="badge bg-danger px-3 py-2">
            ЛУЧШЕЕ ПРЕДЛОЖЕНИЕ
          </span>
        </div>
        <div>
          <p class="card-text price">{{ room.room_price }}
            <svg xmlns="http://www.w3.org/2000/svg" class="mb-1" viewBox="0 0 24 24" width="15" height="15">
              <path
                d="M14.5,15c4.136,0,7.5-3.364,7.5-7.5S18.636,0,14.5,0H5V12H2v3h3v2H2v3h3v4h3v-4h8v-3H8v-2h6.5ZM8,3h6.5c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5h-6.5V3Z" />
            </svg>/сутки
          </p>
          <button v-if="!isDatePicked" @click="show = !show" class="btn gradient-btn btn-sm px-3">
            Забронировать
          </button>
          <div v-if="isDatePicked">
            <NuxtLink v-if="isDatePicked" :to="`reserving/${room.room_id}`">
              <button class="btn gradient-btn btn-sm px-3">Забронировать</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
h3 {
  font-weight: bold;
}

.room-poster {
  position: absolute;
}

.room-poster .badge {
  border-radius: 0;
}

.room {
  flex-direction: row;
  justify-content: space-between;
  border: 0;
  background-color: #ffffff;
  color: #222222;
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.20);
  border-radius: 0.8em;
}

.room img {
  max-width: 40%;
}

.room-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.center-section {
  max-width: 70%;
  padding: 15px;
  border-right: 1px solid #d7d7d7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
}

.center-section .btn {
  max-width: 150px;
}

.right-section {
  max-width: 30%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  text-align: right;
  font-size: 13px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* MEDIA */
@media (width <=1200px) {
  .room img {
    max-width: 30%;
  }

  .center-section {
    max-width: 60%;
  }

  .right-section {
    max-width: 40%;
  }
}

@media (width <=900px) {
  .room {
    flex-direction: column;
  }

  .room img {
    max-width: 100%;
  }

  .room-body {
    flex-direction: column;
  }

  .center-section {
    max-width: 100%;
  }

  .right-section {
    max-width: 100%;
  }

}
</style>
