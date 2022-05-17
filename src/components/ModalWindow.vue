<template>
   <Teleport to="body">
      <div class="modal-wrapper">
         <div class="modal">
            <slot></slot>
         </div>
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
   .modal-wrapper {
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(242, 243, 244, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .modal {
      width: 500px;
      padding: 30px;
      border: 1px solid teal;
      border-radius: 8px;
      box-shadow: 0 4px 16px #00000026;
      text-align: center;
      background-color: rgb(242, 243, 244);
      position: relative;
      top: -300px;
   }
</style>
