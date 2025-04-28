<template>
  <div class="constructor container">
    <QuizTitle>
      <template v-slot:tour>
        <h6>{{ tour.title }}</h6>
      </template>
      <template v-slot:questionNum>
        <span>Собери письмо А. Чирикова к Д. Я. Лаптеву</span>
      </template>
      <template v-slot:question>
        <h2>Капитан Алексей Чириков отправил письмо своему другу, Дмитрию Яковлевичу Лаптеву, рассказывая о событиях, произошедших в конце июля 1741 года. Письмо было случайно обнаружено в одном из дел бывшей комиссии о коммерции и опубликовано в Русском Вестнике за май 1888 года.</h2>
      </template>
    </QuizTitle>
    <QuizAnswer>
        <template v-slot:end>
          <NavBtn>На главную</NavBtn>
        </template>
        <NavBtn @click="continueQuiz">Собрать пазл</NavBtn>
    </QuizAnswer>
  </div>
</template>

<script setup>
import QuizTitle from './QuizTitle.vue'
import QuizAnswer from './QuizAnswer.vue'
import NavBtn from '../../../components/UI/NavBtn.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import data from '../../../data/data'
import router from '../../../router'

const route = useRoute()
const tourId = route.params.id
const tour = ref(data.getTourById(tourId))

const continueQuiz = () => {
  router.replace(`/quiz/${tourId}/question/1`)
}
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
.constructor {
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;
    h6 {
        position: absolute;
        top: 70px;
        left: 70px;
        background-color: $white-color;
        border-radius: 100px;
        padding: 15px 36px;
    }
}
</style>