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
      displayExpression: [],
      userInput: [],
      userResult: [],
      currentResult: 0,
      expressionElements: [],
      inputsRefs: [],
   },
   getters: {},
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
      setDisplayExpression(state, payload) {
         state.displayExpression = payload;
      },
      setUserResult(state, payload) {
         state.userResult = payload;
      },
      setCurrentResult(state, payload) {
         state.currentResult = payload;
      },
      setExpressionElements(state, payload) {
         state.expressionElements = payload;
      },
      setInputRef(state, inputs) {
         state.inputsRefs = inputs;
      },
   },
   actions: {},
   modules: {},
});
