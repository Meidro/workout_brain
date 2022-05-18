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
         rangesValue: {
            duration: 7,
            complexity: 3,
         },
         checkboxsValue: ['+'],
      },

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

      setRangesValue(state, rangesValue) {
         state.settings.rangesValue = rangesValue;
      },

      setCheckboxsValue(state, checkboxsValue) {
         state.settings.checkboxsValue = checkboxsValue;
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

      incTotalExamples(state) {
         state.statistics.totalExamples++;
         state.statistics.lastRound.totalExamplesRound++;
      },

      resetLastRound(state) {
         state.statistics.lastRound = {
            totalExamplesRound: 0,
            completedExamplesRound: 0,
         };
      },

      incTotalExamplesCompleted(state) {
         state.statistics.completedExamples++;
         state.statistics.lastRound.completedExamplesRound++;
      },
   },
   getters: {
      withCustomValuesExample(state) {
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
            return ((state.statistics.completedExamples / state.statistics.totalExamples) * 100).toFixed();
         } else {
            return 0;
         }
      },
   },
});
