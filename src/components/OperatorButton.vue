<template>
   <button :style="{background: background}">
      <slot></slot>
   </button>
</template>

<script lang="ts">
   import {defineComponent} from 'vue';

   export default defineComponent({
      props: {
         background: {
            type: String,
            default: 'coral',
         },
      },
      setup() {
         return {};
      },
   });
</script>

<style scoped>
   button {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      border: none;
      font-weight: 700;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 3px 6px #000;
   }
</style>
