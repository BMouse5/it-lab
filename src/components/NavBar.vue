<template>
  <div class="nav">
    <div class="logo-one">
        <img src="/img/Logo_2.svg" alt="">
    </div>
    <div class="logo-two">
        <img src="/img/Logo_1.svg" alt="">
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;

.nav {
    background-color: $light-blue-color;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>