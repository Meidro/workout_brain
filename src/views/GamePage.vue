<template>
   <RoundTimer />
</template>

<script lang="ts">
   import {defineComponent} from 'vue';
   import RoundTimer from '@/components/RoundTimer.vue';

   export default defineComponent({
      setup() {
         return {};
      },
      components: {RoundTimer},
   });
</script>

<style scoped></style>
