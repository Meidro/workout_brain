<template>
   <div class="range">
      <h3>Настройки:</h3>
      <div class="range__item">
         <div class="badges">
            <span>1</span>
            <span>15</span>
         </div>
         <input class="mb-10" type="range" max="15" min="1" v-model="settings.duration" />
         <p>
            Длительность: <span class="changing_data">{{ settings.duration }}</span> минут
         </p>
      </div>
      <div class="range__item">
         <div class="badges">
            <span>1</span>
            <span>10</span>
         </div>
         <input class="mb-10" type="range" max="10" min="1" v-model="settings.complexity" />
         <p>
            Сложность: <span class="changing_data">{{ settings.complexity }}</span>
         </p>
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, ref, onMounted, watch} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const settings = ref({
            duration: 7,
            complexity: 3,
         })

         watch(
            () => settings.value,
            () => {
               store.commit('setSettings', settings.value)
               localStorage.setItem('settingsRange', JSON.stringify(settings.value))
            },
            {deep: true}
         )

         onMounted(() => {
            const settingsRangeStr = localStorage.getItem('settingsRange')
            if (settingsRangeStr) {
               const settingsRange = JSON.parse(settingsRangeStr)
               settings.value = settingsRange
            }
         })
         return {
            settings,
         }
      },
   })
</script>

<style scoped>
   h3 {
      font-size: 21px;
      margin-bottom: 20px;
   }
   .range {
      width: 350px;
   }
   .badges {
      display: flex;
      justify-content: space-between;
   }
   .badges span {
      font-size: 14px;
   }
   .range input {
      width: 100%;
   }
   .range__item {
      margin-bottom: 30px;
   }
</style>
