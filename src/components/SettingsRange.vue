<template>
   <div class="range">
      <h3 class="mb-15">Настройки</h3>
      <div class="duration">
         <div class="badges">
            <span>1</span>
            <span>15</span>
         </div>
         <input class="mb-15" type="range" max="15" min="1" v-model="duration" @input="onChangeDuration" />
         <p>
            Длительность: <span class="changing_data">{{ duration }}</span> минут.
         </p>
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, computed, ref} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const duration = ref(7)

         const onChangeDuration = () => {
            store.commit('setDuration', duration.value)
         }

         return {
            duration,

            onChangeDuration,
         }
      },
   })
</script>

<style scoped>
   h3 {
      font-size: 21px;
   }
   .range {
      width: 350px;
   }
   .badges {
      display: flex;
      justify-content: space-between;
   }
   .range input {
      width: 100%;
   }
</style>
