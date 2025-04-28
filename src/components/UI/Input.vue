<template>
  <div class="input-wrapper">
    <input 
      type="text" 
      :placeholder="placeholderText"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keyup.enter="$emit('enter')"
      :class="{ 
        'correct-input': showCheckmark, 
        'incorrect-input': showCrossmark 
      }"
    >
    <span v-if="showCheckmark" class="checkmark">✔</span>
    <span v-if="showCrossmark" class="crossmark">✖</span>
  </div>
</template>

<script setup>
defineProps({
    placeholderText: {
        type: String,
        default: ""
    },
    modelValue: {
        type: String,
        default: ""
    },
    inputClass: {
        type: [String, Object],
        default: ""
    },
    showCheckmark: {
        type: Boolean,
        default: false
    },
    showCrossmark: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean
    }
})

defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;

.input-wrapper {
  position: relative;
  width: 100%;
  
  input {
    width: 100%;
    padding-right: 30px;
    transition: border-color 0.3s ease;
    
    &.correct-input {
      border-color: $input-green-border;
    }
    
    &.incorrect-input {
      border-color: $input-red-border;
    }
  }
  
  .checkmark {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 50%;
    padding: 3px;
    transform: translateY(-50%);
    color: $input-green-border;
    font-size: 14px;
    text-align: center;
    border: 2px solid $input-green-border;
    border-radius: 50%;
  }
  
  .crossmark {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 50%;
    padding: 3px;
    transform: translateY(-50%);
    color: $input-red-border;
    font-size: 14px;
    text-align: center;
    border: 2px solid $input-red-border;
    border-radius: 50%;
  }
}
</style>