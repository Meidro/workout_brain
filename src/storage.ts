import {RangesValue, Statistics} from './types';

class WorkoutBrainStorage {
   getStatistics() {
      const statisticsStr = localStorage.getItem('statistics');
      if (statisticsStr) return JSON.parse(statisticsStr);
   }

   setStatistics(statistics: Statistics) {
      localStorage.setItem('statistics', JSON.stringify(statistics));
   }
   //==================================================================
   getRangeSettings() {
      const rangeSettingsStr = localStorage.getItem('rangeSettings');
      if (rangeSettingsStr) return JSON.parse(rangeSettingsStr);
   }

   setRangesValue(rangesValue: RangesValue) {
      localStorage.setItem('rangeSettings', JSON.stringify(rangesValue));
   }
   //==================================================================
   getCheckboxsSettings() {
      const checkboxsSettingsStr = localStorage.getItem('checkboxsSettings');
      if (checkboxsSettingsStr) return JSON.parse(checkboxsSettingsStr);
   }

   setCheckboxsSettings(checkboxsSettings: string[]) {
      localStorage.setItem('checkboxsSettings', JSON.stringify(checkboxsSettings));
   }
   //==================================================================

   getLastDay() {
      const lastDay = localStorage.getItem('lastDay');
      if (lastDay) return JSON.parse(lastDay);
   }

   setLastDay(lastDay: {date: string; dayNumber: number}) {
      localStorage.setItem('lastDay', JSON.stringify(lastDay));
   }
}

export const storage = new WorkoutBrainStorage();
