export const useRandomItem = (arr: (string | number)[]) => {
   return arr[Math.floor(Math.random() * arr.length)]
}

export const useCalculateResult = (taskElements: any) => {
   const copy = [...taskElements]
   let index = 0
   while (copy.length > 1) {
      index = copy.indexOf('**')
      if (index >= 0) {
         copy.splice(index - 1, 3, copy[index - 1] ** copy[index + 1])
      } else {
         index = copy.indexOf('/')
         if (index >= 0) {
            copy.splice(index - 1, 3, copy[index - 1] / copy[index + 1])
         } else {
            index = copy.indexOf('*')
            if (index >= 0) {
               copy.splice(index - 1, 3, copy[index - 1] * copy[index + 1])
            } else {
               index = copy.indexOf('-')
               if (index >= 0) {
                  copy.splice(index - 1, 3, copy[index - 1] - copy[index + 1])
               } else {
                  index = copy.indexOf('+')
                  if (index >= 0) {
                     copy.splice(index - 1, 3, copy[index - 1] + copy[index + 1])
                  }
               }
            }
         }
      }
   }
   return copy[0]
}

export const useNumbersMultiples = (number: number) => {
   const result = []
   for (let i = 1; i <= number; i++) {
      if (number % i === 0) {
         result.push(i)
      }
   }
   return result
}

export const useGenerateTaskElements = (checkboxsValue: string[], level: number) => {
   const result = []
   for (let i = 0; i < level; i++) {
      const prevEl = result[i - 1]
      const penultEl = result[i - 2]
      if (i % 2 === 0) {
         if (prevEl === '/' && typeof penultEl === 'number') {
            // для избежания числа с плавающей точкой
            const multiplesNumbers = useNumbersMultiples(penultEl)
            result.push(useRandomItem(multiplesNumbers))
         } else if (prevEl === '**') {
            // для избежания очень большого результата
            result.push(Math.floor(Math.random() * 2) + 2)
         } else {
            result.push(Math.floor(Math.random() * 10) + 1)
         }
      } else {
         if (penultEl === '/' || penultEl === '**') {
            // исключаем деление больше одного раза подряд
            // для избежания числа с плавающей точкой
            // исключаем возведение в степень больше одного раза подряд
            result.push(useRandomItem(checkboxsValue.filter((el) => el !== '/' && el !== '**')))
         } else {
            result.push(useRandomItem(checkboxsValue))
         }
      }
   }
   return result
}
