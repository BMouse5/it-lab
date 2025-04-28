<template>
  <div class="quiz-title">
    <div class="title-wrapp">
      <!--Слот для отображения номера тура-->
      <slot name="tour"></slot>

      <!-- Заголовок тура -->
      <slot name="tourText"></slot>

      
      <slot name="tourTitle"></slot>

      <!--Слот для отображения номера вопроса-->
      <slot name="questionNum"></slot>

      <!--Слот для отображения вопроса-->
      <slot name="question"></slot>

      <!--Слот для вывода результата-->
      <slot name="result"></slot>

      <!--Слот для вывода инпута-->
      <slot name="input"></slot>

      <!--Слот для конструктора-->
      <slot name="constructoor"></slot>
    </div>
  </div>
  <!--Слот для вставки изображения-->
  <div class="image-title">
    <slot name="image"></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
.quiz-title {
    background-color: $sea-white-color;
    border-radius: 20px;
    height: 80vh;
    max-height: 850px;
    background-image: url('/img/background.png');
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title-wrapp{
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 60%;
        width: 100%;
        gap: 20px;
    }
    h2 {
        font-size: 100px;
    }
}
</style>