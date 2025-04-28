<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
button {
    padding: 20px 100px;
    font-size: 24px;
    text-transform: uppercase;
    border-radius: 9px;
    font-weight: 600;
    border: none;
    background-color: $btn-white-color;
    transition: all 0.3s ease;

    &:hover {
        background-color: $btn-white-focus;
    }
}
</style>