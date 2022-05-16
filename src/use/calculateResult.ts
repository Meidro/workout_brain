export const useCalculateResult = (expressionElements: any) => {
   const copyParam = [...expressionElements];
   while (copyParam.length > 1) {
      let index = copyParam.indexOf('/');
      if (index >= 0) {
         copyParam.splice(index - 1, 3, copyParam[index - 1] / copyParam[index + 1]);
      } else {
         index = copyParam.indexOf('*');
         if (index >= 0) {
            copyParam.splice(index - 1, 3, copyParam[index - 1] * copyParam[index + 1]);
         } else {
            index = copyParam.indexOf('-');
            if (index >= 0) {
               copyParam.splice(index - 1, 3, copyParam[index - 1] - copyParam[index + 1]);
            } else {
               index = copyParam.indexOf('+');
               if (index >= 0) {
                  copyParam.splice(index - 1, 3, copyParam[index - 1] + copyParam[index + 1]);
               }
            }
         }
      }
   }

   return copyParam[0];
};
