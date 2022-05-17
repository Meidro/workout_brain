import {createStore} from 'vuex';

export default createStore({
   state: {
      statistics: {
         totalExamples: 0,
         completedExamples: 0,

         lastRound: {
            totalExamplesRound: 0,
            completedExamplesRound: 0,
         },
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

      // ==================================================
      incTotalExamples(state) {
         state.statistics.totalExamples++;
      },

      decTotalExamples(state) {
         state.statistics.totalExamples--;
      },

      incTotalExamplesRound(state) {
         state.statistics.lastRound.totalExamplesRound++;
      },

      decTotalExamplesRound(state) {
         state.statistics.lastRound.totalExamplesRound--;
      },

      // =====================================

      incCompletedExamples(state) {
         state.statistics.completedExamples++;
      },

      incCompletedExamplesRound(state) {
         state.statistics.lastRound.completedExamplesRound++;
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

      totalAccuracy(state) {
         if (state.statistics.totalExamples !== 0) {
            return (state.statistics.completedExamples / state.statistics.totalExamples) * 100;
         } else {
            return 0;
         }
      },
   },
});
