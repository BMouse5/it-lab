<template>
  <div class="question-container">
    <div class="question-title">
        <span v-if="tour.id === 4">Собери Розу ветров</span>
        <span v-else>Снаряди капитана Чирникова</span>
        <h2>{{ question.text }}</h2>
    </div>
    <div class="question-image">
        <img :src="question.image" alt="">
    </div>
  </div>
</template>

<script setup>
defineProps({
    tour: Object,
    question: Object
})
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
.question-container {
    display: flex;
    align-items:stretch;
    width: 100%;
    gap: 2px;
    .question-title {
        background-color: $sea-white-color;
        width: 50%;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        h2 {
            font-size: 60px;
            text-align: center;
        }
    }
    .question-image {
        background-color: $white-color;
        width: 50%;
        border-radius: 20px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

</style>