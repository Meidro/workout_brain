<template>
   <div class="statistics">
      <p class="mb-10">
         Ваш последний результат - решено <span class="changing_data">{{ statistics.lastResult }}</span> из
         <span class="changing_data">{{ statistics.totalExamples }}</span
         >.
      </p>
      <p>
         Общая точность <span class="changing_data">{{ statistics.totalAccuracy }}%</span>
      </p>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const statistics = computed(() => store.state.statistics)

         return {
            statistics,
         }
      },
   })
</script>

<style scoped>
   .statistics {
      margin-bottom: 50px;
   }
</style>
