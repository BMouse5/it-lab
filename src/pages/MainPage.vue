<template>
    <div class="main-page">>
        <div class="container">
            <div class="main-wrapp">
                <NavBar></NavBar>
                <MainBody></MainBody>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import MainBody from '../components/MainBody.vue'
</script>

<style lang="scss" scoped>
@use '/src/root.scss' as *;
.main-page {
    background-color: $dark-blue-color;
    
    .main-wrapp {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
}

</style>