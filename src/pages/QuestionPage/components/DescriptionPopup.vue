<template>
    <div v-if="visible" class="popup-overlay">
      <div class="popup-content">
        <h2>{{ description.title }}</h2>
        <p>{{ description.text }}</p>
        <NavBtn @click="closePopup">Закрыть</NavBtn>
      </div>
    </div>
  </template>
  
<script setup>
import NavBtn from '../../../components/UI/NavBtn.vue';
defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  description: {
    type: Object,
    default: () => ({ title: "", text: "" })
  }
});
  
const emit = defineEmits(["close"]);
  
const closePopup = () => {
  emit("close");
};
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
  
button {
    padding: 30px 20px;
    width: 100%;
}

h2 {
    text-align: left;
}
</style>
  