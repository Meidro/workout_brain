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

   <ModalWindow v-if="typeModal === 'correct'">
      <p class="correct">Это верный ответ!:)</p>
      <button @click="nextTask">Следующий пример</button>
   </ModalWindow>

   <ModalWindow v-if="typeModal === 'result'">
      <p>Переход к следующему примеру</p>
      <button @click="nextTask">Перейти</button>
   </ModalWindow>

   <ModalWindow v-if="typeModal === 'no-correct'">
      <p class="no-correct">Неверный ответ :(</p>
      <button @click="nextTask">Переход к следующему примеру</button>
   </ModalWindow>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted} from 'vue';
   import OperatorButton from '@/components/OperatorButton.vue';
   import store from '@/store';
   import {useCalculateResult} from '@/use/helpers';
   import ModalWindow from './ModalWindow.vue';

   export default defineComponent({
      emits: ['startApp'],
      setup(props, {emit}) {
         const numbersBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
         const operatorsBtns = ['<', '>', '?', '='];

         const inputsRefs = computed(() => store.state.inputsRefs);
         const taskResult = computed(() => store.state.taskResult);
         const correctValues = computed(() => store.state.correctValues);
         const inputIndex = ref(0);
         const typeModal = ref('');

         const compareResult = () => {
            if (useCalculateResult(store.getters.withEnteredValuesTask) === taskResult.value) {
               typeModal.value = 'correct';
               store.commit('incCompletedExamples');
               store.commit('incCompletedExamplesRound');
            } else {
               typeModal.value = 'no-correct';
            }
         };

         const showCorrectValues = () => {
            inputsRefs.value.forEach((input: HTMLInputElement, i) => {
               input.value = correctValues.value[i];
            });
            typeModal.value = 'result';
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
            if (innerText === '?') {
               showCorrectValues();
            }
            const currentInput: HTMLInputElement = inputsRefs.value[inputIndex.value];
            currentInput.focus();
         };

         const nextTask = () => {
            emit('startApp');
            typeModal.value = '';
            store.commit('resetInputsValues');
            const currentInput: HTMLInputElement = inputsRefs.value[0];
            currentInput.focus();
         };

         onMounted(() => {
            const currentInput: HTMLInputElement = inputsRefs.value[inputIndex.value];
            currentInput.focus();

            inputsRefs.value.forEach((input: HTMLInputElement, i) => {
               input.addEventListener('focus', () => {
                  inputIndex.value = i;
               });
            });
         });

         return {
            numbersBtns,
            operatorsBtns,
            typeModal,
            onNumberBtnClick,
            onOperBtnClick,
            nextTask,
         };
      },
      components: {OperatorButton, ModalWindow},
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
   .modal p {
      letter-spacing: 1.5px;
      line-height: 24px;
      font-size: 28px;
      font-weight: 600;
      color: #213547;
      margin-bottom: 20px;
   }
   .modal button {
      background-color: #f1f1f1;
      padding: 7px 16px;
      border: 1px solid rgba(60, 60, 60, 0.29);
      border-radius: 8px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
   }
   .modal .correct {
      color: #03c03c;
   }
   .modal .no-correct {
      color: red;
   }
</style>
