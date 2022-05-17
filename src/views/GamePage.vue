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

         const checkboxsValue = computed(() => store.state.checkboxValue);
         const level = computed(() => store.state.settings.complexity).value * 2 + 1;

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
            store.commit('incTotalExamples');
            store.commit('incTotalExamplesRound');
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
