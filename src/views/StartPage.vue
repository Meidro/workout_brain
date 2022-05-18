<template>
   <h1>Привет!</h1>
   <CurrentTrainingDay />
   <DisplayStatistics />
   <h3>Настройки:</h3>
   <SettingsRange />
   <SettingsCheckbox />
   <div class="btn">
      <button @click="play">Play!</button>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue';
   import store from '@/store';
   import CurrentTrainingDay from '@/components/CurrentTrainingDay.vue';
   import DisplayStatistics from '@/components/DisplayStatistics.vue';
   import SettingsRange from '@/components/SettingsRange.vue';
   import SettingsCheckbox from '@/components/SettingsCheckbox.vue';
   import router from '@/router';
   import {storage} from '@/storage';

   export default defineComponent({
      setup() {
         const stat = storage.getStatistics();
         if (stat) store.commit('setStatistics', stat);

         const rangeSettings = storage.getRangeSettings();
         if (rangeSettings) store.commit('setRangesValue', rangeSettings);

         const checkboxsSettings = storage.getCheckboxsSettings();
         if (checkboxsSettings) store.commit('setCheckboxsValue', checkboxsSettings);

         const statistics = computed(() => store.state.statistics);
         const play = () => {
            router.push('/game');
            store.commit('resetLastRound');
            storage.setStatistics(statistics.value);
         };
         return {
            play,
         };
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
