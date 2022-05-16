export const useRandomItem = (arr: (string | number)[]) => {
   return arr[Math.floor(Math.random() * arr.length)];
};

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

export const useNumbersMultiples = (number: number) => {
   const result = [];
   for (let i = 1; i <= number; i++) {
      if (number % i === 0) {
         result.push(i);
      }
   }
   return result;
};

export const useGenerateTaskElements = (checkboxsValue: string[], level: number) => {
   const result = [];
   for (let i = 0; i < level; i++) {
      const prevEl = result[i - 1];
      const penultEl = result[i - 2];
      if (i % 2 === 0) {
         if (prevEl === '/' && typeof penultEl === 'number') {
            // для избежания числа с плавающей точкой
            const multiplesNumbers = useNumbersMultiples(penultEl);
            result.push(useRandomItem(multiplesNumbers));
         } else {
            result.push(Math.floor(Math.random() * 10) + 1);
         }
      } else {
         if (result[i - 2] === '/') {
            // исключаем деление больше одного раза подряд
            result.push(useRandomItem(checkboxsValue.filter((el) => el !== '/')));
         } else {
            result.push(useRandomItem(checkboxsValue));
         }
      }
   }
   return result;
};
