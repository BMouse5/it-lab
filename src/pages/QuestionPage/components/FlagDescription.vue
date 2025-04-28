<template>
  <div class="description-wrapp container">
    <div class="description-cont">
      <div class="description-img">
        <img src="/img/flag.png" alt="">
      </div>
      <div class="description-text">
        <h2>Андреевский флаг</h2>
        <h4>Андреевский флаг является главным корабельным кормовым флагом Российского Флота. Он представляет собой белое полотнище, пересеченное по диагонали двумя синими полосами, которые образуют наклонный крест, который называется Андреевским. Этот крест и дал имя флагу.</h4>
      </div>  
    </div>    
    <QuizAnswer>
        <template v-slot:end>
            <NavBtn>На главную</NavBtn>
        </template>
      <NavBtn @click="nextTour">Далее</NavBtn>
    </QuizAnswer>
  </div>
</template>

<script setup>
import QuizAnswer from '../../QuizPage/components/QuizAnswer.vue'
import NavBtn from '../../../components/UI/NavBtn.vue'
import { useRoute, useRouter } from 'vue-router'
import data from '../../../data/data'
const route = useRoute()
const router = useRouter()
const currentTourId = parseInt(route.query.currentTourId);

const nextTour = () => {
  const nextId = currentTourId + 1;
  const tours = data.tours;
  const nextTour = tours.find(tour => tour.id === nextId);

  if (nextTour) {
    router.push(`/quiz/${nextId}`);
  } else {
    router.push('/');
  }
}

</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
.description-wrapp {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.description-cont {
    display: flex;
    gap: 2px;
    .description-img {
        background: linear-gradient(180deg, #81C8F2 0%, #5C59FD 100%);
        width: 50%;
        border-radius: 20px;
        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    .description-text {
        background-color: $light-blue-color;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 50%;
        border-radius: 20px;
        color: $white-color;
        h4 {
            text-align: center;
            font-weight: 500;
        }
    }
}
</style>