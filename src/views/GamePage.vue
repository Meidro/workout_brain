<template>
   <RoundTimer />
   <ShowExpression />
   <ButtonsList />
</template>

<script lang="ts">
   import {defineComponent} from 'vue';
   import RoundTimer from '@/components/RoundTimer.vue';
   import store from '@/store';
   import ShowExpression from '@/components/ShowExpression.vue';
   import ButtonsList from '@/components/ButtonsList.vue';

   export default defineComponent({
      setup() {
         const settingsRangeStr = localStorage.getItem('settingsRange');
         if (settingsRangeStr) {
            store.commit('setSettings', JSON.parse(settingsRangeStr));
         }

         const checkboxsStr = localStorage.getItem('checkbox');
         if (checkboxsStr) {
            store.commit('setCheckboxValue', JSON.parse(checkboxsStr));
         }

         return {};
      },
      components: {RoundTimer, ShowExpression, ButtonsList},
   });
</script>

<style scoped></style>
