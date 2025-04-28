<template>
    <div v-if="visible" class="popup-overlay">
      <div class="popup-content">
        <img src="/img/exit.png" alt="">
        <h4>Весь прогресс будет утерян</h4>
        <span>Вы уверены что хотите выйти?</span>
        <div class="popup-btn">
            <NavBtn colorClass="btn-white-color" @click="closePopup">Нет</NavBtn>
            <NavBtn @click="exit">Да</NavBtn>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import NavBtn from './UI/NavBtn.vue'

defineProps({
    visible: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['exit', 'close'])

const closePopup = () => {
    emit('close')
}

const exit = () => {
    emit('exit')
}
</script>
  
<style scoped lang="scss">
@use '/src/root.scss' as *;
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
  
.popup-content {
    background: $white-color;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: left;
    max-width: 600px;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.popup-btn {
    display: flex;
    gap: 2px;
}
button {
    padding: 30px 20px;
    width: 100%;
}

h4 {
    text-align: center;
    font-size: 40px;
}

span {
    text-align: center;
    color: black;
    font-size: 24px;
}

img {
    object-fit: contain;
    margin: 0 auto;
}
</style>
  