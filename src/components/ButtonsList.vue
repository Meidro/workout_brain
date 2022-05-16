<template>
   <div class="buttons-wrapper">
      <div class="buttons-number">
         <OperatorButton @click="onNumberBtnClick" v-for="(number, i) in numbersBtns" :key="i">
            {{ number }}</OperatorButton
         >
      </div>
      <div class="buttons-oper">
         <OperatorButton @click="onOperBtnClick" v-for="(operator, i) in operatorsBtns" :key="i" background="#999">{{
            operator
         }}</OperatorButton>
      </div>
   </div>
   <Teleport to="body">
      <div v-if="showModal" class="modal">
         <p>Верно!</p>
         <button @click="showModal = false">Close</button>
      </div>
   </Teleport>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted} from 'vue';
   import OperatorButton from '@/components/OperatorButton.vue';
   import store from '@/store';
   import {useCalculateResult} from '@/use/helpers';

   export default defineComponent({
      setup() {
         const numbersBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
         const operatorsBtns = ['<', '>', '?', '='];

         const inputsRefs = computed(() => store.state.inputsRefs);
         const displayedTask = computed(() => store.state.displayedTask);
         const inputsValues = computed(() => store.state.inputsValues);
         const taskResult = computed(() => store.state.taskResult);
         const inputIndex = ref(0);
         const showModal = ref(false);

         const compareResult = () => {
            const withEnteredValuesTask = [...displayedTask.value];
            withEnteredValuesTask.forEach((el, i, arr) => {
               if (!el) {
                  arr[i] = inputsValues.value[i];
               }
            });

            if (
               useCalculateResult(withEnteredValuesTask.slice(0, displayedTask.value.length - 2)) === taskResult.value
            ) {
               showModal.value = true;
            }
         };

         const onNumberBtnClick = (e: Event) => {
            const currentInput: HTMLInputElement = inputsRefs.value[inputIndex.value];
            currentInput.value += (e.target as HTMLButtonElement).innerText;
            currentInput.dispatchEvent(new Event('input'));
            currentInput.focus();
         };

         const onOperBtnClick = (e: Event) => {
            const innerText = (e.target as HTMLButtonElement).innerText;
            if (innerText === '>' && inputIndex.value < inputsRefs.value.length - 1) {
               inputIndex.value++;
            }
            if (innerText === '<' && inputIndex.value > 0) {
               inputIndex.value--;
            }
            if (innerText === '=') {
               compareResult();
            }
            const currentInput: HTMLInputElement = inputsRefs.value[inputIndex.value];
            currentInput.focus();
         };

         onMounted(() => {
            (inputsRefs.value[inputIndex.value] as HTMLInputElement).focus();
         });

         return {
            numbersBtns,
            operatorsBtns,
            showModal,
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
   .modal {
      position: fixed;
      z-index: 999;
      top: 20%;
      left: 50%;
      width: 300px;
      margin-left: -150px;
      background-color: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 16px #00000026;
   }
   .modal p {
      letter-spacing: 0.2px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 400;
      color: #213547;
      margin-bottom: 20px;
   }
   .modal button {
      background-color: #f1f1f1;
      padding: 5px 12px;
      border: 1px solid rgba(60, 60, 60, 0.29);
      border-radius: 8px;
      font-size: 0.9em;
      font-weight: 600;
   }
</style>
