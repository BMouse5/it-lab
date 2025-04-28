<template>
  <div class="answer-variants">
    <div v-if="props.tour.type === 'Choose'" class="text-options">
      <AnswerBtn
        v-for="(variant, index) in question.variants"
        :key="index"
        @click="selectVariant(variant)"
        :class="getAnswerStatus(variant)"
      >
      <template v-slot:text>{{ variant }}</template>
        <template v-slot:number>
          <span>{{ index + 1 }}</span>
        </template>
      </AnswerBtn>
    </div>
    <!-- Проверяем, являются ли варианты текстовыми или с изображениями -->
    <div v-else-if="areTextVariants" class="text-options">
      <AnswerBtn
        v-for="(variant, index) in question.variants"
        :key="index" 
        @click="selectAnswer(variant)"
        :color-class="getButtonColor(variant)"
        :is-selected="selectedAnswer === variant"
      >
        <template v-slot:text>{{ variant }}</template>
        <template v-slot:number>
          <span>{{ index + 1 }}</span>
        </template>
      </AnswerBtn>
    </div>
    <div v-else class="image-options">
      <div 
        v-for="(variant, index) in question.variants"
        :key="index"
        class="image-option"
        :class="{
          'correct': selectedAnswer && variant.image === question.answer,
          'incorrect': selectedAnswer && selectedAnswer === variant && variant.image !== question.answer
        }"
        @click="selectAnswer(variant)"
      >
        <img 
          v-if="variant.image" 
          :src="variant.image" 
          :alt="variant.text || 'Вариант ответа'"
        >
        <span v-if="variant.text">{{ variant.text }}</span>
        <div class="checkbox" 
          :class="{
            correct: selectedAnswer && variant.image === question.answer,
            incorrect: selectedAnswer && selectedAnswer === variant && variant.image !== question.answer
          }"
        >
          <span v-if="selectedAnswer && variant.image === question.answer">&#10003;</span>
          <span v-else-if="selectedAnswer && selectedAnswer === variant">&times;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import AnswerBtn from './UI/AnswerBtn.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  tour: {
    type: Object,
    required: true,
  },
  answerStatus: Object
});
const emit = defineEmits(['answer-selected', 'answer-chosen', 'variant-selected']);
const selectedAnswer = ref(null);
const variantSelected = ref([])

// Универсальная проверка типа вариантов
const areTextVariants = computed(() => {
  return props.question.variants.every(variant => typeof variant === 'string');
});

watch(() => props.question, () => {
  selectedAnswer.value = null;
  variantSelected.value = []
  emit('answer-selected', false);
  emit('answer-chosen', false);
}, { deep: true });



const selectAnswer = (variant) => {
  if (selectedAnswer.value) return;
  selectedAnswer.value = variant;
  // Проверяем корректность ответа
  const isCorrect = areTextVariants.value
    ? variant === props.question.answer.trim() // Для текстовых ответов
    : variant.image === props.question.answer.trim(); // Для изображений

  emit('answer-selected', isCorrect);
  emit('answer-chosen', true);
};

const selectVariant = (variant) => {
  if (!variantSelected.value.includes(variant)) {
    variantSelected.value = [...variantSelected.value, variant];
    emit('variant-selected', variantSelected.value)
  }
}

const getButtonColor = (variant) => {
  if (!selectedAnswer.value) return 'btn-white-color';
  if (variant === props.question.answer) return 'btn-green-color';
  if (variant === selectedAnswer.value && variant !== props.question.answer) return 'btn-red-color';
  return 'btn-white-color';
};

const getAnswerStatus = (variant) => {
  if (props.answerStatus && props.answerStatus[variant]) {
    return props.answerStatus[variant];
  }
  
  if (props.tour.type === 'Choose' && variantSelected.value.includes(variant)) {
    return 'choose-selected';
  }

  return 'default';
};


</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;

.answer-variants {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2px;

  .text-options {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;

    & > * {
      flex: 0 0 calc(25% - 2px);
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 15px 10px;
      word-break: break-word;
      position: relative;
    }

    span {
      color: $text-dark-blue;
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }

  .image-options {
    display: grid;
    grid-template-columns: repeat(4, 4fr);
    gap: 2px;
    width: 100%;
    margin-top: 2px;

    .image-option {
      border: 3px solid transparent;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: $white-color;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow: hidden;
      &:hover {
        transform: scale(1.03);
      }

      &.correct {
        border-color: $btn-green-color;
        box-shadow: 0 0 10px rgba($btn-green-color, 0.5);
      }

      &.incorrect {
        border-color: $btn-red-color;
        box-shadow: 0 0 10px rgba($btn-red-color, 0.5);
      }

      img {
        max-width: 100%;
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      span {
        font-weight: bold;
        color: $white-color;
        font-size: 14px;
      }

      .checkbox {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        background: $white-color;
        border: 1.5px solid rgb(186, 186, 186);
        border-radius: 4px;
        &.correct {
          background-color: $btn-green-color;
          border: none;
          color: $white-color;
        }

        &.incorrect {
          background-color: $btn-red-color;
          border:none;
          color: $white-color;
        }
      }
    }
  }
}

.correct {
  background-color: $btn-green-color; 
  color: $white-color;
}

.incorrect {
  background-color: $btn-red-color;
  color: $white-color;
}

.missed {
  background-color: $btn-green-color;
  opacity: 80%;
  color: $white-color;
}

.choose-selected {
  background-color: $sea-white-color;
}
</style>
