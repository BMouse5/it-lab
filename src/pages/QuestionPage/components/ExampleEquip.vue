<template>
    <div class="example-wrapp container">
      <div class="example-title">
        <h2>Примеры оснастки и снаряжения</h2>
      </div>
      <div class="example-cards">
        <div class="card-wrap" v-for="item in items" :key="item.title">
          <img :src="item.image" :alt="item.title">
          <h4>{{ item.title }}</h4>
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
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuizAnswer from '../../QuizPage/components/QuizAnswer.vue'
import NavBtn from '../../../components/UI/NavBtn.vue'
import data from '../../../data/data'
const items = ref([
  {image: "/img/examples/1.png", title: "Градшток"},
  {image: "/img/examples/2.png", title: "Квадрант"},
  {image: "/img/examples/3.png", title: "Секстант"},
  {image: "/img/examples/4.png", title: "Солнечные часы"},
  {image: "/img/examples/5.png", title: "Лаг"},
  {image: "/img/examples/6.png", title: "Кабестан"},
])
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
.example-wrapp {
    display: flex;
    flex-direction: column;
    gap: 2px;
  .example-title {
    padding: 60px 0px;
    background-color: $sea-white-color;
    border-radius: 20px;
    
    h2 {
      font-size: 60px;
      text-align: center;
    }
  }
  
  .example-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
  }
  
  .card-wrap {
    display: flex;
    background-color: $light-blue-color;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    gap: 20px;
    
    img {
      width: 100%;
      max-width: 300px;
      height: auto;
      object-fit: cover;
      border-radius: 10px;
    }
    
    h4 {
      font-size: 18px;
      text-align: center;
      color: $white-color;
      align-self: end;
    }
  }
} 
</style>