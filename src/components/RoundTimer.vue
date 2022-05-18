<template>
   <div class="timer">
      <button class="btn" @click="cancel"><span>Отмена</span></button>
      <div class="timer__item">{{ minutes }} : {{ seconds }}</div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted, onUnmounted} from 'vue';
   import store from '@/store';
   import router from '@/router';

   export default defineComponent({
      setup() {
         const num = ref(computed(() => store.state.settings.rangesValue.duration).value);
         const minutes = ref(num.value < 10 ? '0' + num.value : num.value);
         const seconds = ref('00');

         let intervalId: number | undefined;

         const timer = () => {
            const deadlineTime = +new Date(new Date().getTime() + num.value * 60 * 1000 + 1000);
            intervalId = setInterval(() => {
               const moment = new Date().getTime();
               const restOfTime = deadlineTime - moment;
               minutes.value = Math.floor((restOfTime % (1000 * 60 * 60)) / (1000 * 60));
               seconds.value = Math.floor((restOfTime % (1000 * 60)) / 1000) + '';
               minutes.value = minutes.value < 10 ? '0' + minutes.value : minutes.value;
               seconds.value = +seconds.value < 10 ? '0' + seconds.value : seconds.value;
               if (restOfTime <= 0) {
                  clearInterval(intervalId);
                  router.push('/');
               }
            }, 1000);
         };

         const cancel = () => {
            router.push('/');
            store.commit('resetInputsValues');
         };

         onMounted(() => {
            timer();
         });

         onUnmounted(() => {
            clearInterval(intervalId);
         });

         return {
            minutes,
            seconds,
            cancel,
         };
      },
   });
</script>

<style scoped>
   .timer {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      margin-bottom: 50px;
   }
   .btn {
      text-align: center;
   }
   button {
      padding: 10px 0;
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 2px;
      display: inline-block;
      width: 120px;
      box-shadow: 3px 3px 6px #777;
      cursor: pointer;
   }
   .timer__item {
      padding: 10px 0;
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 2px;
      box-shadow: 3px 3px 6px #777;
      width: 120px;
      text-align: center;
      border: 3px solid #00bfff;
   }
</style>
