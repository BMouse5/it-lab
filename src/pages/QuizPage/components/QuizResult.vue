<template>
  <div class="result-wrapp container">
    <QuizTitle>
      <template v-slot:result>
        <!-- Кастомный вывод для 5-го b 7-го тура -->
        <div v-if="isCustomTour">
          <div v-if="result >= 90" class="great result">
            <img src="/img/great.png" alt="Отличный результат" class="result-image" />
            <h3 class="result-title">Вы справились отлично!</h3>
            <p class="result-text">Вы ответили правильно на {{ correctSelections }}/{{ totalSelections }}</p>
          </div>
          <div v-if="result >= 50" class="good result">
            <img src="/img/good.png" alt="Отличный результат" class="result-image" />
            <h3 class="result-title">Хороший результат</h3>
            <p class="result-text">Вы ответили правильно на {{ correctSelections }}/{{ totalSelections }}</p>
          </div>
          <div v-else class="bad result">
            <img src="/img/bad.png" alt="Отличный результат" class="result-image" />
            <h3 class="result-title">Не сдавайся!</h3>
            <p class="result-text">Вы ответили правильно на {{ correctSelections }}/{{ totalSelections }}</p>
          </div>
        </div>
        
        <!-- Обычный вывод -->
        <div v-else-if="percentage >= 90" class="great result">
          <img src="/img/great.png" alt="Отличный результат" class="result-image" />
          <h3 class="result-title">Вы справились отлично!</h3>
          <p class="result-text">Вы ответили правильно на {{ correct }}/{{ total }}</p>
        </div>
        <div v-else-if="percentage >= 50" class="good result">
          <img src="/img/good.png" alt="Хороший результат" class="result-image" />
          <h3 class="result-title">Хороший результат</h3>
          <p class="result-text">Вы ответили правильно на {{ correct }}/{{ total }}</p>
        </div>
        <div v-else class="bad result">
          <img src="/img/bad.png" alt="Плохой результат" class="result-image" />
          <h3 class="result-title">Не сдавайся!</h3>
          <p class="result-text">Вы ответили правильно на {{ correct }}/{{ total }}</p>
        </div>
      </template>
    </QuizTitle>
    <QuizAnswer>
      <template v-slot:end>
        <NavBtn>На главную</NavBtn>
      </template>
      <NavBtn @click="continueQuiz" v-if="currentTourId != 8">Продолжить квиз</NavBtn>
    </QuizAnswer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBtn from '../../../components/UI/NavBtn.vue'
import QuizAnswer from './QuizAnswer.vue'
import QuizTitle from './QuizTitle.vue'

const route = useRoute()
const router = useRouter()

//текущий тур
const currentTourId = computed(() => parseInt(route.params.id));

//переменная для отображения конкретного шаблона результат
const isCustomTour = route.query.isCustom === "true";

//переменные для множественного выбора ответов
const correctSelections = parseInt(route.query.correctSelections) || 0
const totalSelections = parseInt(route.query.totalSelections) || 1

//переменные для вопросов с единичным ответом
const correct = parseInt(route.query.correct) || 0
const total = parseInt(route.query.total) || 1

const nextTourId = parseInt(route.query.nextTourId) || null

//высчитывание оценки
const percentage = computed(() => Math.round((correct / total) * 100))
const result = computed(() => Math.round((correctSelections / totalSelections) * 100))

const continueQuiz = () => {
  if (currentTourId.value === 5) {
    router.push({path: '/example-equip', query: { currentTourId: currentTourId.value } });
  } else if (currentTourId.value === 3) {
    router.push({path: '/description', query: {currentTourId: currentTourId.value}});
  } else if (currentTourId.value === 7) {
    router.push('/quiz/8');
  } else if (nextTourId) {
    router.push(`/quiz/${nextTourId}`);
  } else {
    router.push('/');
  }
};


</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;

.result-wrapp {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;

  .custom-result {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  .result-image {
    max-width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
    margin: 0 auto;
  }

  .result-title {
    font-size: clamp(32px, 8vw, 80px);
    margin: 0;
    line-height: 1.2;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .result-text {
    font-size: clamp(16px, 4vw, 24px);
    font-weight: bold;
    color: $light-blue-color;
    margin: 0;
    text-transform: uppercase;
    word-break: break-word;
  }
}
</style>
