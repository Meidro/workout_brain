<template>
   <Teleport to="body">
      <div class="modal">
         <slot></slot>
      </div>
   </Teleport>
</template>

<script lang="ts">
   import {defineComponent} from 'vue';

   export default defineComponent({
      setup() {
         return {};
      },
   });
</script>

<style scoped>
   .modal {
      position: fixed;
      z-index: 999;
      top: 20%;
      left: 50%;
      width: 500px;
      margin-left: -250px;
      background-color: #f2f3f4;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 16px #00000026;
      text-align: center;
   }
</style>
