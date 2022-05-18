<template>
   <div class="range">
      <div class="range__item">
         <div class="badges">
            <span>1</span>
            <span>15</span>
         </div>
         <input class="mb-10" type="range" max="15" min="1" v-model="rangesValue.duration" />
         <p>
            Длительность: <span class="changing_data">{{ rangesValue.duration }}</span> минут
         </p>
      </div>
      <div class="range__item">
         <div class="badges">
            <span>1</span>
            <span>10</span>
         </div>
         <input class="mb-10" type="range" max="10" min="1" v-model="rangesValue.complexity" />
         <p>
            Сложность: <span class="changing_data">{{ rangesValue.complexity }}</span>
         </p>
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, watch, computed} from 'vue';
   import store from '@/store';
   import {storage} from '@/storage';

   export default defineComponent({
      setup() {
         const rangesValue = computed(() => store.state.settings.rangesValue);

         watch(
            () => rangesValue.value,
            () => {
               store.commit('setRangesValue', rangesValue.value);
               storage.setRangesValue(rangesValue.value);
            },
            {deep: true}
         );

         return {
            rangesValue,
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
