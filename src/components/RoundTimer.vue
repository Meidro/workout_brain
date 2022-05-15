<template>
   <div>{{ minutes }} : {{ seconds }}</div>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted, onUnmounted} from 'vue';
   import store from '@/store';
   import router from '@/router';

   export default defineComponent({
      setup() {
         const num = ref(computed(() => store.state.settings.duration).value);
         const minutes = ref(num.value < 10 ? '0' + num.value : num.value);
         const seconds = ref('00');

         let intervalId: number | undefined;

         const timer = () => {
            const countMinutes = num.value;
            const deadlineTime = +new Date(new Date().getTime() + countMinutes * 60 * 1000 + 1000);
            intervalId = setInterval(() => {
               console.log('fir');
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

         onMounted(() => {
            timer();
         });

         onUnmounted(() => {
            clearInterval(intervalId);
         });

         return {
            minutes,
            seconds,
         };
      },
   });
</script>

<style scoped></style>
