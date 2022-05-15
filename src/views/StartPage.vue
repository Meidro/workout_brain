<template>
   <h1>Привет!</h1>
   <CurrentTrainingDay />
   <DisplayStatistics />
   <h3>Настройки:</h3>
   <SettingsRange />
   <SettingsCheckbox />
   <div class="btn">
      <button @click="$router.push('/game')">Play!</button>
   </div>
</template>

<script lang="ts">
   import {defineComponent} from 'vue';
   import store from '@/store';
   import CurrentTrainingDay from '@/components/CurrentTrainingDay.vue';
   import DisplayStatistics from '@/components/DisplayStatistics.vue';
   import SettingsRange from '@/components/SettingsRange.vue';
   import SettingsCheckbox from '@/components/SettingsCheckbox.vue';

   export default defineComponent({
      setup() {
         const settingsRangeStr = localStorage.getItem('settingsRange');
         if (settingsRangeStr) {
            store.commit('setSettings', JSON.parse(settingsRangeStr));
         }

         const checkboxsStr = localStorage.getItem('checkbox');
         if (checkboxsStr) {
            store.commit('setCheckboxValue', JSON.parse(checkboxsStr));
         }
         return {};
      },
      components: {CurrentTrainingDay, DisplayStatistics, SettingsRange, SettingsCheckbox},
   });
</script>

<style scoped>
   h1 {
      margin-bottom: 50px;
      padding-top: 50px;
   }
   h3 {
      font-size: 21px;
      margin-bottom: 20px;
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
      margin: 0 auto;
      box-shadow: 3px 3px 6px #777;
      cursor: pointer;
   }
</style>
