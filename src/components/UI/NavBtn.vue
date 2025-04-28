<template>
  <button :class="colorClass" keyup.enter="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  colorClass: {
    type: String,
    default: 'btn-light-blue'
  }
})
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
button {
  border: none;
  border-radius: 20px;
  padding: 50px 76px;
  font-size: 24px;
  color: $text-white-color;
  text-transform: uppercase;
  font-weight: 600;
}

.btn-light-blue {
  background-color: $btn-light-blue;
}

.btn-dark-blue {
  background-color: $btn-dark-blue;
}

.btn-white-color {
  background-color: $white-color;
  border: 1px solid $btn-light-blue;
  color: $light-blue-color;
}

.btn-blue-opacity {
  background-color: $btn-light-blue;
  opacity: 40%;
}
</style>