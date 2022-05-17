<template>
   <div class="expression-wrapper">
      <div v-for="(el, i) in displayedTask" :key="i" class="element">
         <span v-if="el !== undefined">{{ el }}</span>
         <input v-else type="number" v-model="inputsValues[i]" ref="inputsRef" />
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted, watch} from 'vue';
   import store from '@/store';

   export default defineComponent({
      setup() {
         const displayedTask = computed(() => store.state.displayedTask);
         const inputsValues = computed(() => store.state.inputsValues);
         const inputsRef = ref(null);

         watch(
            () => inputsValues.value,
            () => store.commit('setInputsValues', inputsValues.value),
            {deep: true}
         );

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
