<template>
   <p class="mb-10">
      Добро пожаловать на <span class="changing_data">{{ currentTrainingDay }}</span> тренировочный день.
   </p>
</template>

<script lang="ts">
   import {defineComponent, ref} from 'vue';
   import {LastDay} from '@/types';
   import {storage} from '@/storage';

   export default defineComponent({
      setup() {
         const currentTrainingDay = ref(1);

         const lastDay: LastDay = storage.getLastDay();
         const currentDay = new Date().toLocaleDateString();
         if (lastDay) {
            if (lastDay.date !== currentDay) {
               currentTrainingDay.value = lastDay.dayNumber + 1;
               lastDay.date = currentDay;
               lastDay.dayNumber++;
               storage.setLastDay(lastDay);
            } else {
               currentTrainingDay.value = lastDay.dayNumber;
            }
         } else {
            storage.setLastDay({date: currentDay, dayNumber: 1});
         }

         return {
            currentTrainingDay,
         };
      },
   });
</script>

<style scoped></style>
