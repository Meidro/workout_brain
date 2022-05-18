export interface LastDay {
   date: string;
   dayNumber: number;
}

export interface Statistics {
   totalExamples: number;
   completedExamples: number;

   lastRound: {
      totalExamplesRound: number;
      completedExamplesRound: number;
   };
}

export interface RangesValue {
   duration: number;
   complexity: number;
}
