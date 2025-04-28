<template>
    <transition name="keyboard-slide">
      <div class="keyboard">
        <div class="keyboard-row" v-for="(row, rowIndex) in keyboardLayout" :key="rowIndex">
          <button
            v-for="key in row"
            :key="key"
            @mousedown.prevent="handleKeyPress(key)"
            @touchstart.prevent="handleKeyPress(key)"
            :class="{
              'key': true,
              'space': key === ' ',
              'backspace': key === '✖'
            }"
          >
            {{ key }}
          </button>
        </div>
      </div>
    </transition>
</template>
  
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['key-press']);

// Текущая раскладка
const currentLayout = ref('RUS');

// Все доступные раскладки
const layouts = {
  RUS: [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '✖'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
    ['&123', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ENG'],
    [' ']
  ],
  ENG: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '✖'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['&123', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'RUS'],
    [' ']
  ],
  NUM: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '✖'],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', 'Enter'],
    ['ABC', '/', ':', ';', '"', "'", '<', '>', ',', '.', '?', 'NUM'],
    [' ']
  ]
};

// Текущая раскладка клавиатуры
const keyboardLayout = ref(layouts.RUS);

const handleKeyPress = (key) => {
  if (key === '✖') {
    emit('key-press', 'Backspace');
  } 
  // Переключение на цифровую раскладку
  else if (key === '&123' || key === 'NUM') {
    currentLayout.value = 'NUM';
    keyboardLayout.value = layouts.NUM;
  } 
  // Переключение на английскую раскладку
  else if (key === 'ENG') {
    currentLayout.value = 'ENG';
    keyboardLayout.value = layouts.ENG;
  } 
  // Переключение на русскую раскладку
  else if (key === 'RUS') {
    currentLayout.value = 'RUS';
    keyboardLayout.value = layouts.RUS;
  } 
  // Переключение на русскую раскладку из цифровой
  else if (key === 'ABC') {
    currentLayout.value = 'RUS';
    keyboardLayout.value = layouts.RUS;
  }
  else {
    emit('key-press', key);
  }
};
</script>
  
<style lang="scss" scoped>
@use '/src/root.scss' as *;
.keyboard {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1000px;
  padding: 10px;
  background-color: $white-color;
  border-radius: 8px 8px 0 0;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.keyboard-slide-enter-active,
.keyboard-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.keyboard-slide-enter-from,
.keyboard-slide-leave-to {
  transform: translateX(-50%) translateY(100%);
  opacity: 0;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.key {
  min-width: 40px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: $keyboard-color;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  &:active {
    transform: translateY(2px);
    box-shadow: none;
    background-color: #e0e0e0;
  }
}

.space {
  min-width: 550px;
}

.backspace, .enter {
  position: relative;
  min-width: 80px;
}

.backspace::after {
    content: "";
    position: absolute;
    top: 14px;
    left: 21px;
    right: 20px;
    bottom: 13px;
    border: 1px solid black;
    border-radius: 8px;
    pointer-events: none;
}
</style>