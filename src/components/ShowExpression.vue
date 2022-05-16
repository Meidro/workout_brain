<template>
   <div class="expression-wrapper">
      <div v-for="(el, i) in displayedTask" :key="i" class="element">
         <span v-if="el">{{ el }}</span>
         <input v-else type="number" v-model="inputsValues[i]" ref="inputsRef" />
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted, watch} from 'vue';
   import store from '@/store';
   import {useCalculateResult, useGenerateTaskElements} from '@/use/helpers';

   export default defineComponent({
      setup() {
         const checkboxsValue = computed(() => store.state.checkboxValue);
         const level = computed(() => store.state.settings.complexity).value * 2 + 1;
         const inputsValues = ref([]);
         const inputsRef = ref(null);

         watch(
            () => inputsValues.value,
            () => store.commit('setInputsValues', inputsValues.value),
            {deep: true}
         );

         const taskElements = useGenerateTaskElements(checkboxsValue.value, level);

         const taskResult = useCalculateResult(taskElements);
         store.commit('setTaskResult', taskResult);

         const displayedTask = [...taskElements, '=', taskResult].map((el, i, arr) => {
            if (i === 0 || i === arr.length - 1 || typeof el === 'string') return el;
            else undefined;
         });
         store.commit('setDisplayedTask', displayedTask);

         onMounted(() => {
            store.commit('setInputsRef', inputsRef.value);
         });

         return {
            displayedTask,
            inputsRef,
            inputsValues,
         };
      },
   });
</script>

<style scoped>
   label {
      width: 100%;
      height: 100%;
      border-radius: 50%;
   }
   .expression-wrapper {
      font-weight: 700;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 100px;
   }
   .element {
      margin-right: 7px;
      text-align: center;
   }
</style>
