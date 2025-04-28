<template>
  <div class="quiz-answer">
    <div @click="handleEndClick">
      <slot name="end"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
    <ExitPopup :visible="visible" @close="closePopup" @exit="exitQuiz" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ExitPopup from '../../../components/ExitPopup.vue'

const visible = ref(false);
const router = useRouter()
const route = useRoute()
const tourId = route.params.id

const handleEndClick = () => {
  if(tourId == 8){
    router.push('/')
  }else {
    visible.value = true
  }
}

const closePopup = () => {
  visible.value = false
}

const exitQuiz = () => {
  visible.value = false
  router.push('/')
}


</script>
<style scoped lang="scss">
.quiz-answer {
    display: flex;
    gap: 2px;   
    :deep(button) {
      width: 100%;
    }
    div {
      width: 100%;
    }
}

.quiz-answer > * {
  flex-grow: 1;
}
.quiz-answer > div:empty {
  display: none;
}
</style>
