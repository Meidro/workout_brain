<template>
   <div class="buttons-wrapper">
      <div class="buttons-number">
         <OperatorButton @click="onNumberBtnClick" v-for="(num, i) in state.buttonsNumber" :key="i">
            {{ num }}</OperatorButton
         >
      </div>
      <div class="buttons-oper">
         <OperatorButton
            @click="onOperBtnClick"
            v-for="(oper, i) in state.buttonsOperators"
            :key="i"
            background="#999"
            >{{ oper }}</OperatorButton
         >
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, reactive, computed, ref} from 'vue';
   import OperatorButton from '@/components/OperatorButton.vue';
   import store from '@/store';
   export default defineComponent({
      setup() {
         const state = reactive({
            buttonsNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            buttonsOperators: ['<', '>', '?', '='],
         });

         const inputs = computed(() => store.state.inputsRefs);
         const inputIndex = ref(0);

         const onNumberBtnClick = (e: Event) => {
            const currentInput: HTMLInputElement = inputs.value[inputIndex.value];
            currentInput.value += (e.target as HTMLButtonElement).innerText;
            currentInput.dispatchEvent(new Event('input'));
            currentInput.focus();
         };

         const onOperBtnClick = (e: Event) => {
            const innerText = (e.target as HTMLButtonElement).innerText;
            if (innerText === '>' && inputIndex.value < inputs.value.length - 1) {
               inputIndex.value++;
            }
            if (innerText === '<' && inputIndex.value > 0) {
               inputIndex.value--;
            }
            if (innerText === '=') {
               // compareResult();
            }
            const currentInput: HTMLInputElement = inputs.value[inputIndex.value];
            currentInput.focus();
         };

         return {
            state,
            onNumberBtnClick,
            onOperBtnClick,
         };
      },
      components: {OperatorButton},
   });
</script>

<style scoped>
   .buttons-wrapper {
      display: flex;
      justify-content: center;
   }
   .buttons-number {
      max-width: 300px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
   }
   .buttons-oper {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin-left: 20px;
   }
</style>
