<template>
   <p class="mb-10">
      Добро пожаловать на <span class="changing_data">{{ currentTrainingDay }}</span> тренировочный день.
   </p>
</template>

<script lang="ts">
   import {defineComponent, ref} from 'vue';
   import {LastTrainingDay} from '@/types';

   export default defineComponent({
      setup() {
         const currentTrainingDay = ref(1);

         const lastDayStr = localStorage.getItem('lastDay');
         const currentDay = new Date().toLocaleDateString();
         if (lastDayStr) {
            const lastTrainingDay: LastTrainingDay = JSON.parse(lastDayStr);
            if (lastTrainingDay.date !== currentDay) {
               currentTrainingDay.value = lastTrainingDay.dayNumber + 1;
               lastTrainingDay.date = currentDay;
               lastTrainingDay.dayNumber++;
               localStorage.setItem('lastDay', JSON.stringify(lastTrainingDay));
            } else {
               currentTrainingDay.value = lastTrainingDay.dayNumber;
            }
         } else {
            localStorage.setItem(
               'lastDay',
               JSON.stringify({
                  date: currentDay,
                  dayNumber: 1,
               })
            );
         }

         return {
            currentTrainingDay,
         };
      },
   });
</script>

<style scoped></style>
