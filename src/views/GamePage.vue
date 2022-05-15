<template>
   <RoundTimer />
</template>

<script lang="ts">
   import {defineComponent} from 'vue';
   import RoundTimer from '@/components/RoundTimer.vue';
   import store from '@/store';

   export default defineComponent({
      setup() {
         const settingsRangeStr = localStorage.getItem('settingsRange');
         if (settingsRangeStr) {
            const settingsRange = JSON.parse(settingsRangeStr);
            store.commit('setSettings', settingsRange);
         }

         return {};
      },
      components: {RoundTimer},
   });
</script>

<style scoped></style>
