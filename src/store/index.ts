import {createStore} from 'vuex'

export default createStore({
   state: {
      statistics: {
         totalExamples: 0,
         lastResult: 0,
         totalAccuracy: 0,
      },
      settings: {
         duration: 0,
      },
   },
   getters: {},
   mutations: {
      setStatistics(state, statistics) {
         state.statistics = statistics
      },
      setDuration(state, duration) {
         state.settings.duration = duration
      },
   },
   actions: {},
   modules: {},
})
