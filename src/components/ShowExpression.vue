<template>
   <div class="expression-wrapper">
      <div v-for="(el, i) in displayExp" :key="i" class="element">
         <span v-if="el">{{ el }}</span>
         <input v-else type="number" v-model="userInput[i]" autofocus ref="inputs" />
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed, ref, onMounted} from 'vue';
   import store from '@/store';
   import {useCalculateResult} from '@/use/calculateResult';

   export default defineComponent({
      setup() {
         const checkboxValue = computed(() => store.state.checkboxValue);
         const level = computed(() => store.state.settings.complexity);
         const displayExp = computed(() => store.state.displayExpression);
         const userInput = computed(() => store.state.userInput);
         const currentResult = computed(() => store.state.currentResult);

         const inputs = ref(null);
         const showModal = ref(false);

         onMounted(() => {
            console.log(inputs.value);
            store.commit('setInputRef', inputs.value);
         });

         const getRandomElement = (arr: (string | number)[]) => {
            return arr[Math.floor(Math.random() * arr.length)];
         };

         const getNumbersMultiples = (prevNumber: any) => {
            const result = [];
            for (let i = 1; i <= prevNumber; i++) {
               if (prevNumber % i === 0) {
                  result.push(i);
               }
            }
            return result;
         };

         const compareResult = () => {
            const userInputResult = [...displayExp.value.slice(0, displayExp.value.length - 2)];
            userInputResult.forEach((el, i, arr) => {
               if (!el) {
                  arr[i] = userInput.value[i];
               }
            });
            store.commit('setUserResult', userInputResult);

            if (useCalculateResult(userInputResult) === currentResult.value) {
               showModal.value = true;
            }
         };

         const generateExpressionElements = (checkboxData: string[], expressionLength: number) => {
            const result = [];
            for (let i = 0; i < expressionLength; i++) {
               if (i % 2 === 0) {
                  if (result[i - 1] === '/') {
                     // для избежания числа с плавающей точкой
                     const multiplesNumbers = getNumbersMultiples(result[i - 2]);
                     result.push(getRandomElement(multiplesNumbers));
                  } else {
                     result.push(Math.floor(Math.random() * 10) + 1);
                  }
               } else {
                  if (result[i - 2] === '/') {
                     // исключаем деление больше одного раза подряд
                     result.push(getRandomElement(checkboxData.filter((el) => el !== '/')));
                  } else {
                     result.push(getRandomElement(checkboxData));
                  }
               }
            }
            return result;
         };

         const expressionElements = generateExpressionElements(checkboxValue.value, 2 * level.value + 1);
         store.commit('setExpressionElements', expressionElements);

         const result = useCalculateResult(expressionElements);
         store.commit('setCurrentResult', result);

         const displayExpression = [...expressionElements, '=', result].map((el, i, arr) => {
            if (i === 0 || i === arr.length - 1 || typeof el === 'string') return el;
            else undefined;
         });
         store.commit('setDisplayExpression', displayExpression);

         return {
            displayExp,
            userInput,
            showModal,
            inputs,
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
