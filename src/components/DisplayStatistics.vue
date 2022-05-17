<template>
   <div class="statistics">
      <p class="mb-10">
         Ваш последний результат - решено
         <span class="changing_data">{{ statistics.lastRound.completedExamplesRound }}</span> из
         <span class="changing_data">{{ statistics.lastRound.totalExamplesRound }}</span
         >.
      </p>
      <p>
         Общая точность: <span class="changing_data">{{ totalAccuracy }}%</span>
      </p>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue';
   import store from '@/store';

   export default defineComponent({
      setup() {
         const statistics = computed(() => store.state.statistics);
         const totalAccuracy = store.getters.totalAccuracy;

         return {
            statistics,
            totalAccuracy,
         };
      },
   });
</script>

<style scoped>
   .statistics {
      margin-bottom: 50px;
   }
</style>
