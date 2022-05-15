<template>
   <div></div>
</template>

<script lang="ts">
   import {defineComponent, computed} from 'vue';
   import store from '@/store';

   export default defineComponent({
      setup() {
         const level = computed(() => store.state.settings.complexity);
         const checkboxs = computed(() => store.state.checkboxValue);

         const getRandomItem = (arr: (string | number)[]) => arr[Math.floor(Math.random() * arr.length)];

         const expression = [];

         for (let i = 0; i < level.value * 2 + 1; i++) {
            if (i % 2 === 0) {
               expression.push(Math.floor(Math.random() * 10 + 1));
            } else {
               expression.push(getRandomItem(checkboxs.value));
            }
         }

         console.log(expression);

         return {};
      },
   });
</script>

<style scoped></style>
