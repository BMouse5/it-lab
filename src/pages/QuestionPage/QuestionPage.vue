<template>
    <div class="question-page" 
      v-if="tour && question"
      >
      <div class="container question-wrapp">
        <!--Условие для вставки обычного вопроса или вопроса с картинкой-->
        <template v-if="tour.id !== 6 && tour.id !== 8">
          <component 
          :is="tour.id === 4 || tour.id === 7 ? ImageQuestion : QuizTitle"
          :title="tour.title" 
          :text="tour.text"
          :tour="tour"
          :question="question">
            <template v-slot:tour>
              <h6>{{ tour.title }}</h6>
            </template>
            <template v-slot:questionNum>
              <span>Вопрос {{ question.id }}/{{ tour.questions.length }}</span>
            </template>
            <template v-slot:question>
              <h2>{{ question.text }}</h2>
            </template>
        </component>
       </template>
       <!--Вопросы с вводом ответа-->
       <template v-else-if="tour.id === 6">
        <QuizTitle>
          <template v-slot:tour>
              <h6>{{ tour.title }}</h6>
          </template>
          <template v-slot:questionNum>
              <span>Вопрос {{ question.id }}/{{ tour.questions.length }}</span>
          </template>
          <template v-slot:question>
            <h2>{{ question.text }}</h2>
          </template>
          <template v-slot:input>
            <Input 
            placeholderText="Введите ответ"
            v-model="inputAnswer"
            :showCheckmark="isCorrectAnswer && isAnswerChecked"
            :showCrossmark="!isCorrectAnswer && isAnswerChecked"
            :disabled="isAnswerChecked"
            @enter="buttonText === 'Проверить' && isAnswerChosen ? checkAnswers() : null"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
            ref="inputRef"
            ></Input>
          </template>
        </QuizTitle>
       </template>
       <!--Конструктор-->
       <template v-else-if="tour.id === 8">
          <ConstructorQuestion :tour="tour" :question="question" @next="handleConstructorQuestion"></ConstructorQuestion>
       </template>
       <template v-else>
        <QuizTitle>
          <template v-slot:tour>
              <h6>{{ tour.title }}</h6>
          </template>
          <template v-slot:questionNum>
              <span>Вопрос {{ question.id }}/{{ tour.questions.length }}</span>
          </template>
          <template v-slot:question>
            <h2>{{ question.text }}</h2>
          </template>
        </QuizTitle>
       </template>
       <!--Компонент выводящий варианты ответов-->
        <AnswerVariants 
          v-if="tour.id !== 6 && tour.id !== 8"
          :question="question" 
          :tour="tour" 
          :answer-status="answerStatus"
          @answer-selected="handleAnswerSelected" 
          @answer-chosen="handleAnswerChosen"
          @variant-selected="handleVariantSelected"
          />
        <!--Навигация по квизу-->
        <QuizAnswer>
          <template v-slot:end>
            <NavBtn>На главную</NavBtn>
          </template>
          <NavBtn
            v-if="tour.type != 'Choose' && tour.type != 'Input'"
           @click="nextQuestion" 
           :disabled="!isAnswerChosen"
           tabindex="0"
           ref="nextButton"
           :class="{ disabled: !isAnswerChosen }">
           Далее
          </NavBtn>
          <NavBtn 
          v-else
          @click="buttonText === 'Проверить' ? checkAnswers() : nextQuestion()"
          :disabled="buttonText === 'Проверить' && !isAnswerChosen"
          :class="{ disabled: buttonText === 'Проверить' && !isAnswerChosen }"
          ref="nexButton"
          >
            {{buttonText}}
          </NavBtn>
        </QuizAnswer>
        <Keyword
          v-show="showKeyboard"
          @key-press="handleKeyPress"
          
        />
      </div>
    </div>
    <DescriptionPopup
    v-if="tour.id === 6"
      :visible="showPopup" 
      :description="currentDescription" 
      @close="showPopup = false"
    />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuizTitle from '../QuizPage/components/QuizTitle.vue'
import QuizAnswer from '../QuizPage/components/QuizAnswer.vue'
import NavBtn from '../../components/UI/NavBtn.vue'
import AnswerVariants from '../../components/AnswerVariants.vue'
import data from '../../data/data'
import ImageQuestion from './components/ImageQuestion.vue'
import Input from '../../components/UI/Input.vue'
import DescriptionPopup from './components/DescriptionPopup.vue'
import Keyword from './components/Keyword.vue'
import ConstructorQuestion from './components/ConstructorQuestion.vue'
const route = useRoute()
const router = useRouter()
const tour = ref(null)
const question = ref(null)
const isAnswerSelected = ref(false)
const isAnswerChosen = ref(false)
const correctAnswers = ref(0)
const totalAnswers = ref(0)
const nextButton = ref(null)
const variantSelected = ref([])
const answerStatus = ref({})
const buttonText = ref("Проверить")
const inputAnswer = ref("");
const isAnswerChecked = ref(false);
const isCorrectAnswer = ref(false);
const showPopup = ref(false);
const currentDescription = ref({ title: "", text: "" });
const showKeyboard = ref(false);
const inputRef = ref(null);

const handleInputFocus = () => {
  showKeyboard.value = true;
};

const handleInputBlur = (e) => {
  const keyboardClicked = e.relatedTarget && e.relatedTarget.closest('.keyboard');
  
  if (!keyboardClicked) {
    showKeyboard.value = false;
  } else {
    // возвращаем фокус на клаву
    setTimeout(() => {
      inputRef.value?.focus();
    }, 0);
  }
};

const handleKeyPress = (key) => {
  if (key === 'Backspace') {
    inputAnswer.value = inputAnswer.value.slice(0, -1);
  } else if (key === 'Enter') {
    checkAnswers();
  } else {
    inputAnswer.value += key;
  }
  
  // фокус на инпут
  inputRef.value?.focus();
};
const handleAnswerSelected = (isCorrect) => {
  isAnswerSelected.value = true;
  if (isCorrect) {
    correctAnswers.value += 1;
  }
}
const handleAnswerChosen = (chosen) => {
  isAnswerChosen.value = chosen
}

// Функция для загрузки данных
const loadData = () => {
  answerStatus.value = {}
  const tourId = route.params.id
  const questionId = route.params.qid
  tour.value = data.getTourById(tourId)
  question.value = data.getQuestion(tourId, questionId)
  totalAnswers.value = tour.value?.questions?.length || 0
  isAnswerSelected.value = null
  isAnswerChosen.value = null
  buttonText.value = 'Проверить';
  inputAnswer.value = ''
}

let correctSelections = 0

const checkAnswers = () => {
  if (tour.value.id === 6) {
    // Проверяем только если еще не проверяли
    if (!isAnswerChecked.value) {
      if (!question.value?.answer) {
        console.error('Ответ для текущего вопроса не задан.');
        return;
      }
      // Сравниваем ответы
      isCorrectAnswer.value = inputAnswer.value.trim().toLowerCase() === question.value.answer.trim().toLowerCase();
      isAnswerChecked.value = true;
      
      if (isCorrectAnswer.value) {
        correctAnswers.value += 1;
      }
      if (!isCorrectAnswer.value) {
        currentDescription.value = question.value.description || { title: "", text: "" };
        showPopup.value = true; 
      }

      buttonText.value = "Далее";
    } else {
      // Если ответ уже проверен, переходим дальше
      nextQuestion();
    }
    return;
  }
  if (!question.value?.answer || !Array.isArray(question.value.answer)) {
    console.error('Вопрос или ответы не загружены.');
    return;
  }
  if (isCorrectAnswer.value) {
    nextQuestion();
  }
  // Создаем множества для правильных и выбранных ответов
  const correctSet = new Set(question.value.answer);
  const selectedSet = new Set(variantSelected.value);

  // Проверяем, выбраны ли все правильные ответы
  const allCorrect =
    selectedSet.size === correctSet.size &&
    [...selectedSet].every(answer => correctSet.has(answer));

  // Обновляем статус каждого выбранного ответа
  answerStatus.value = {};
  [...selectedSet].forEach(answer => {
    const isCorrect = correctSet.has(answer);
    answerStatus.value[answer] = isCorrect ? 'correct' : 'incorrect';
    if (isCorrect) {
      correctSelections++;
    }
  });

  // Отмечаем пропущенные правильные ответы
  [...correctSet].forEach(answer => {
    if (!selectedSet.has(answer)) {
      answerStatus.value[answer] = 'missed';
    }
  });
  // Если все ответы правильные, увеличиваем общий счет
  if (allCorrect) {
    correctAnswers.value += 1;
  }

  isAnswerSelected.value = true;
  buttonText.value = "Далее";
};

const handleVariantSelected = (variants) => {
  isAnswerChosen.value = true
  variantSelected.value = [...variants];
};

loadData()
// Отслеживаем изменения параметров маршрута
watch(() => [route.params.id, route.params.qid], () => {
  loadData()
})

watch(inputAnswer, (newValue) => {
  isAnswerChosen.value = newValue.trim().length > 0;
  
  // Если текст изменился после проверки, сбрасываем проверку
  if (isAnswerChecked.value) {
    isAnswerChecked.value = false;
    isCorrectAnswer.value = false;
    buttonText.value = 'Проверить';
  }
});

const nextQuestion = () => {
  const nextId = parseInt(route.params.qid) + 1;
  const tours = data.tours;

  if (nextId <= tour.value.questions.length) {
    router.push(`/quiz/${tour.value.id}/question/${nextId}`);
  } else {
    const currentIndex = tours.findIndex(t => t.id === tour.value.id);
    const nextTour = tours[currentIndex + 1];
    if (tour.value.id === 8) { // Для конструктора
      router.push({
        path: `/quiz/${tour.value.id}/result`,
        query: {
          correct: correctAnswers.value,
          total: totalAnswers.value,
          isConstructor: true
        }
      });
    } else if (tour.value.type === "Choose") {
      // Вычисляем общее количество правильных ответов
      const totalSelections = tour.value.questions.reduce(
        (total, question) => total + (question.answer?.length || 0),
        0
      );
      router.push({
        path: `/quiz/${tour.value.id}/result`,
        query: {
          correctSelections,
          totalSelections,
          isCustom: true,
        },
      });
    } else if (nextTour) {
      router.push({
        path: `/quiz/${tour.value.id}/result`,
        query: {
          correct: correctAnswers.value,
          total: tour.value.questions.length,
          nextTourId: nextTour.id,
        },
      });
    } else {
      router.push({
        path: `/quiz/${tour.value.id}/result`,
        query: {
          correct: correctAnswers.value,
          total: tour.value.questions.length,
        },
      });
    }
  }
};

const handleConstructorQuestion = (result) => {
  isAnswerChosen.value = true
  correctAnswers.value = result.correct;
  totalAnswers.value = result.total;
}

onMounted(() => {
  if (nextButton.value?.$el) {
    nextButton.value.$el.focus()
  }
})
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
.question-wrapp {
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
    a {
        width: 100%;
        button {
            width: 100%;
        }
    }
}

.disabled {
  opacity: 40%;
}
</style>