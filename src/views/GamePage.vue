<template>
   <RoundTimer />
   <ShowExpression />
   <ButtonsList @startApp="start" />
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue';
   import RoundTimer from '@/components/RoundTimer.vue';
   import store from '@/store';
   import ShowExpression from '@/components/ShowExpression.vue';
   import ButtonsList from '@/components/ButtonsList.vue';
   import {useGenerateTaskElements, useCalculateResult} from '@/use/helpers';
   import {storage} from '@/storage';

   export default defineComponent({
      setup() {
         const stat = storage.getStatistics();
         if (stat) store.commit('setStatistics', stat);

         const rangeSettings = storage.getRangeSettings();
         if (rangeSettings) store.commit('setRangesValue', rangeSettings);

         const checkboxsSettings = storage.getCheckboxsSettings();
         if (checkboxsSettings) store.commit('setCheckboxsValue', checkboxsSettings);

         const checkboxsValue = computed(() => store.state.settings.checkboxsValue);
         const level = computed(() => store.state.settings.rangesValue.complexity).value * 2 + 1;

         const start = () => {
            const taskElements = useGenerateTaskElements(checkboxsValue.value, level);
            const taskResult = useCalculateResult(taskElements);
            let displayedTask = [];
            let correctValues = [];
            for (let i = 0; i < taskElements.length; i++) {
               if (i !== 0 && typeof taskElements[i] === 'number') {
                  displayedTask.push(undefined);
                  correctValues.push(taskElements[i]);
               } else {
                  displayedTask.push(taskElements[i]);
               }
            }
            displayedTask.push('=', taskResult);

            store.commit('setTaskResult', taskResult);
            store.commit('setDisplayedTask', displayedTask);
            store.commit('setCorrectValues', correctValues);
         };

         start();

         return {
            start,
         };
      },
      components: {RoundTimer, ShowExpression, ButtonsList},
   });
</script>

<style scoped></style>
