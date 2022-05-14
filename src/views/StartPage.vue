<template>
   <h1>Привет!</h1>
   <CurrentTrainingDay />
   <DisplayStatistics />
   <SettingsRange />
</template>

<script lang="ts">
   import {defineComponent} from 'vue'
   import CurrentTrainingDay from '@/components/CurrentTrainingDay.vue'
   import DisplayStatistics from '@/components/DisplayStatistics.vue'
   import SettingsRange from '@/components/SettingsRange.vue'

   export default defineComponent({
      setup() {
         return {}
      },
      components: {CurrentTrainingDay, DisplayStatistics, SettingsRange},
   })
</script>

<style scoped>
   h1 {
      margin-bottom: 50px;
      padding-top: 50px;
   }
</style>
