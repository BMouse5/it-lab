<template>
<div class="body-wrapp">
  <div class="left">
    <div class="left-content">
        <h2>Квиз для старшеклассников «Умная морская душа»</h2>
        <router-link to="/quiz/1"><Btn>Начать</Btn></router-link>
    </div>
  </div>
  <div class="right">
    <div class="top">
        <img src="/img/ship.svg" alt="">
    </div>
    <div class="bottom">
        <div class="bottom-left">
            <div class="bottom-wrapp">
                <div class="img-box">
                    <img src="/img/compas.svg" alt="">
                </div>
                <div class="text-box">
                    <h4>8 захватывающих этапов</h4>
                </div>
            </div>
        </div>
        <div class="bottom-right">
            <div class="bottom-wrapp">
                <div class="img-box">
                    <img src="/img/helm.svg" alt="">
                </div>
                <div class="text-box">
                    <h4>Отправься в увлекательное путешествие по загадочным глубинам знаний</h4>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script setup>
import Btn from './UI/Btn.vue';
</script>

<style scoped lang="scss">
@use '/src/root.scss' as *;
.body-wrapp {
  display: grid;
  grid-template-columns: 3fr 4fr;
  gap: 2px;
  height: 600px;

    .left {
        background: linear-gradient(180deg, #81C8F2 0%, #5C59FD 100%);
        border-radius: 20px;
        display: flex;
        align-items: center;
        .left-content {
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: center;
            h2 {
                font-size: 60px;
                font-weight: 600;
                color: $text-white-color;
                text-align: center;
            }
            button {
                display: block;
            }
        }
    }

    .right {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 2px;
        .top {
            background-color: $light-blue-color;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
            max-width: 100%;
            max-height: 100%;
            height: auto;
            width: auto;
            object-fit: contain;
           
            }
        }

        .bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2px;
        
        .bottom-left,
        .bottom-right {
        background-color: $light-blue-color;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        }

        .bottom-wrapp {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        gap: 20px;
        }

        .img-box {
        height: 60%;
        display: flex;
        align-items: end;

            img {
                max-height: 100%;
                max-width: 100%;
            }
        }

        .text-box {
        max-width: 90%;
        height: 40%;
        display: flex;
        align-items: start;
            h4 {
                color: $text-white-color;
                margin: 0;
            }
        }
        }
    }
}
</style>