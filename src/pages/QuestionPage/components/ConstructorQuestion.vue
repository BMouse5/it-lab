<template>
    <div class="constructor-wrapp">
      <div class="constructor-title">
        <h6>{{ tour.title }}</h6>
        <h2>Расположите части письма так, чтобы получился логически связанный текст</h2>
      </div>
      <div class="constructor-body">
        <div class="body-wrapp">
          <div class="text-container">
            <div class="text-content">
              <!-- Радиокнопки для выбора позиции -->
              <div class="selector-wrapp" @click="showOptions">
                Выберите позицию
              <div class="position-selector" v-if="isShow">
                <div 
                  v-for="n in question.parts.length" 
                  :key="n" 
                  class="radio-option"
                  :class="{
                      correct: selectedPart && selectedPositions[question.parts.indexOf(selectedPart)] === n && selectedPart.position === n,
                      incorrect: selectedPart && selectedPositions[question.parts.indexOf(selectedPart)] === n && selectedPart.position !== n
                    }"
                >
                  <label 
                    @click.stop
                  >
                  <input 
                    type="radio" 
                    :value="n" 
                    v-model="selectedPositions[question.parts.indexOf(selectedPart)]"
                    :disabled="!selectedPart || lockedPositions[question.parts.indexOf(selectedPart)]"
                    @change="checkPosition"
                    @click.stop
                   
                    />
                    Позиция {{ n }}
                  </label>
                </div>
              </div>
              </div>
              <!-- Отображение текста выбранного отрывка -->
              <div class="constructor-text" v-if="selectedPart">
                {{ selectedPart.text }}
              </div>
              <div class="constructor-text placeholder" v-else>
                Выберите отрывок для просмотра
              </div>
            </div>
          </div>
        </div>
        
        <!-- Список кнопок с отрывками -->
        <div class="constructor-list">
          <NavBtn 
            v-for="(part, index) in question.parts" 
            :key="index"
            @click="selectPart(part)"
            :class="{ selected: selectedPart === part }"
          >
            Отрывок {{ index + 1 }}
          </NavBtn>
        </div>
      </div>
    </div>
</template>
  
  
<script setup>
import { ref, computed } from 'vue'
import NavBtn from '../../../components/UI/NavBtn.vue'

const selectedPart = ref(null)
const selectedPositions = ref({}) // Объект для хранения позиций всех отрывков
const isShow = ref(false)
const props = defineProps({
  tour: Object,
  question: Object
})

const emit = defineEmits(['next'])

const selectPart = (part) => {
  selectedPart.value = part
}

const lockedPositions = ref({});
const totalCorrect = ref(0);
const isAllPositionsSelected = computed(() => {
  return Object.keys(selectedPositions.value).length === props.question.parts.length;
});

const checkPosition = () => {
  if (selectedPart.value) {
    const partIndex = props.question.parts.indexOf(selectedPart.value);
    const isCorrect = selectedPart.value.position === selectedPositions.value[partIndex];

    if (!lockedPositions.value[partIndex]) {
      lockedPositions.value[partIndex] = true;
      if (isCorrect) {
        totalCorrect.value++;
      }

    }
    continueQuiz()
  }
};

const continueQuiz = () => {
    if(isAllPositionsSelected.value){
        emit('next', {
            correct: totalCorrect.value,
            total: props.question.parts.length
        })
    }
}

const showOptions = () => {
    if(isShow.value === true){
        isShow.value = false
    } else{
        isShow.value = true
    }
}
</script>
  
<style lang="scss" scoped>
@use '/src/root.scss' as *;
.constructor-wrapp {
  display: flex;
  flex-direction: column;
  gap: 2px;
    
  .constructor-title {
    background-color: $sea-white-color;
    border-radius: 20px;
    position: relative;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
      
    h2 {
      font-size: 60px;
      padding: 0 40px;
    }
      
    h6 {
      position: absolute;
      top: 15px;
      left: 15px;
      background-color: $white-color;
      border-radius: 100px;
      padding: 15px 36px;
    }
  }
    
  .constructor-body {
    background-color: $sea-white-color;
    padding: 40px;
    border-radius: 20px;
    display: flex;
    gap: 40px;
    .body-wrapp {
      background: $white-color;
      width: 100%;
      border-radius: 20px;
    }
    .text-container {
      flex: 1;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: row;
      min-height: 300px;
        
      .text-content {
        display: flex;
        gap: 20px;
        flex-grow: 1;
          
        .position-selector {
          max-width: 200px;
          width: 100%;
          background-color: $sea-white-color;
          padding: 10px;
          border-radius: 4px;
          position: absolute;
          top: 35px;
          select {
            width: 100%;
            padding: 10px 15px;
            font-size: 16px;
            border-radius: 8px;
            border: 1px solid #ccc;
            background-color: $sea-white-color;
            cursor: pointer;
              
            &:focus {
              outline: none;
            }
          }
        }
          
        .constructor-text {
          flex-grow: 1;
          font-size: 18px;
          overflow-y: auto;
          padding: 10px;
          height: 300px;
          width: 100%;
            
          &::-webkit-scrollbar {
            width: 8px;
          }
            
          &::-webkit-scrollbar-track {
            background: $sea-white-color;
            border-radius: 4px;
          }
            
          &::-webkit-scrollbar-thumb {
            background: $light-blue-color;
            border-radius: 4px;
          }
            
          &.placeholder {
            color: #999;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
        }
      }
    }
      
    .constructor-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 200px;
        
      button {
        width: 100%;
        height: 60px;
        text-align: center;
        padding: 20px;
        font-size: 20px;
        opacity: 60%;
        transition: all 0.3s ease;
        &.selected {
          color: $white-color;
          opacity: 100%;
        }
        &:hover {
          opacity: 100%
        }
      }
    }
  }
}
.radio-option {
  border: 1px solid transparent;
  &.correct {
    border: 1px solid $input-green-border;
    border-radius: 4px;
    label input[type="radio"] {
      &:checked {
        border-color: $input-green-border;
        &::after {
          background-color: $input-green-border;
        }
      }
  }
}

  &.incorrect {
    border: 1px solid $input-red-border;
    border-radius: 4px;
    label input[type="radio"] {
      &:checked {
        border-color: $input-red-border;
        &::after {
          background-color: $input-red-border;
        }
      }
    }
  }


  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;

    input[type="radio"] {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      margin: 0;
      position: relative;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 50%;
      transition: all 0.2s ease;
      outline: none;

      &:checked {
        border-color: $input-green-border;
        
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background-color: $input-green-border;
          border-radius: 50%;
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        border: 1px solid #d8d7d7
      }
    }
  }
}

.selector-wrapp {
    max-width: 200px;
    width: 100%;
    background-color: $sea-white-color;
    height: 30px;
    border-radius: 4px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}
</style>