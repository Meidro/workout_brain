<template>
   <div class="range">
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
   import {defineComponent, ref, watch, computed} from 'vue';
   import store from '@/store';

   export default defineComponent({
      setup() {
         const settings = ref(computed(() => store.state.settings).value);

         watch(
            () => settings.value,
            () => {
               store.commit('setSettings', settings.value);
               localStorage.setItem('settingsRange', JSON.stringify(settings.value));
            },
            {deep: true}
         );

         return {
            settings,
         };
      },
   });
</script>

<style scoped>
   .range {
      width: 350px;
      margin-bottom: 50px;
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
