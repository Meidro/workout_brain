import {createStore} from 'vuex'

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
   },
   getters: {},
   mutations: {
      setStatistics(state, statistics) {
         state.statistics = statistics
      },
      setSettings(state, settings) {
         state.settings = settings
      },
      setCheckboxValue(state, checkboxValue) {
         state.checkboxValue = checkboxValue
      },
   },
   actions: {},
   modules: {},
})
