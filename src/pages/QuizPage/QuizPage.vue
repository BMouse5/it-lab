<template>
    <div class="quiz-page">        
      <div class="container quiz-wrapp" v-if="tour">
        <QuizTitle>
          <template v-slot:tourText>
            <span>{{ tour.title }}</span>
          </template>
          <template v-slot:tourTitle>
            <h2>{{ tour.text }}</h2>
          </template>
          <template v-slot:result v-if="isFinished">
            <QuizResult :correctAnswers="correctAnswers" :totalQuestions="totalQuestions"></QuizResult>
          </template>
        </QuizTitle>
        <QuizAnswer v-if="!isFinished">
          <template v-slot:end>
            <NavBtn>На главную</NavBtn>
          </template>
          <NavBtn @click="startQuiz">Начать</NavBtn>
        </QuizAnswer>
        <QuizAnswer v-else>
          <template v-slot:end>
            <NavBtn @click="endQuiz">На главную</NavBtn>
          </template>
          <NavBtn @click="startQuiz">Начать</NavBtn>
        </QuizAnswer>
      </div>
      <div v-else>Нет данных</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import QuizTitle from './components/QuizTitle.vue'
  import QuizAnswer from './components/QuizAnswer.vue'
  import QuizResult from './components/QuizResult.vue'
  import NavBtn from '../../components/UI/NavBtn.vue'
  import data from '../../data/data'
  
  const route = useRoute();
  const router = useRouter();
  const tour = ref(null);
  const isFinished = ref(false); // Флаг завершения тура
  const correctAnswers = computed(() => parseInt(route.query.correct) || 0)
  const totalQuestions = computed(() => parseInt(route.query.total) || 0)
  onMounted(() => {
  const id = route.params.id
  tour.value = data.getTourById(id)
  isFinished.value = route.query.correct !== undefined

})

const startQuiz = () => {
  if(tour.value.id === 8) {
    router.push(`/constructor/${tour.value.id}`)
    return
  }
  if (route.query.nextTourId) {
    router.push(`/quiz/${route.query.nextTourId}/question/1`)
  } else {
    router.push(`/quiz/${tour.value.id}/question/1`)
  }
}
  
</script>
  
<style lang="scss" scoped>
@use '/src/root.scss' as *;
  
.quiz-page {
  background-color: $dark-blue-color;
  position: relative;
  .quiz-wrapp {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  a {
    width: 100%;
  }
  button {
    width: 100%;
  }
}
</style>
  