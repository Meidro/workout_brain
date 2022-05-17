import {createStore} from 'vuex';

export default createStore({
   state: {
      statistics: {
         totalExamples: 0,
         lastResult: 0,
         totalAccuracy: 0,
      },
      settings: {
         duration: 7,
         complexity: 3,
      },
      checkboxValue: ['+'],
      displayedTask: [],
      taskResult: 0,
      inputsRefs: [],
      inputsValues: [],
      correctValues: [],
   },

   mutations: {
      setStatistics(state, statistics) {
         state.statistics = statistics;
      },

      setSettings(state, settings) {
         state.settings = settings;
      },

      setCheckboxValue(state, checkboxValue) {
         state.checkboxValue = checkboxValue;
      },

      setDisplayedTask(state, displayedTask) {
         state.displayedTask = displayedTask;
      },

      setTaskResult(state, taskResult) {
         state.taskResult = taskResult;
      },

      setInputsRef(state, inputs) {
         state.inputsRefs = inputs;
      },

      setInputsValues(state, inputsValues) {
         state.inputsValues = inputsValues;
      },

      setCorrectValues(state, correctValues) {
         state.correctValues = correctValues;
      },
      resetInputsValues(state) {
         state.inputsValues = [];
      },
   },
   getters: {
      withEnteredValuesTask(state) {
         const temp = [...state.displayedTask];
         temp.forEach((el, i, arr) => {
            if (!el) {
               arr[i] = state.inputsValues[i];
            }
         });
         return temp.slice(0, state.displayedTask.length - 2);
      },
   },
});
