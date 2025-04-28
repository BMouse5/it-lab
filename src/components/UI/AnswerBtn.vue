<template>
  <button     
    :class="[
      'answer-btn',
      colorClass,
      { 'selected': isSelected }
    ]"
    @click="$emit('click')">
    <slot name="number"></slot>
    <slot name="text"></slot>
  </button>
</template>

<script setup>
defineProps({
  colorClass: {
    type: String,
    default: 'btn-white-color'
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
button {
    border: none;
    border-radius: 20px;
    font-size: 24px;
    text-transform: uppercase;
    padding: 50px 100px;
    font-weight: 600;
    position: relative;
    &.selected {
      transform: scale(0.98);
      box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
    }
}

.btn-green-color {
    background-color: $btn-green-color;
    color: $text-white-color;
}

.btn-red-color {
    background-color: $btn-red-color;
    color: $text-white-color;
}

.btn-white-color {
    color: $text-dark-blue;
    background-color: $btn-white-color;
}
</style>