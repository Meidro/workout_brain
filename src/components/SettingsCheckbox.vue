<template>
   <div class="checkbox">
      <div v-for="checkbox in checkboxs" :key="checkbox.value" class="checkbox__item mb-10">
         <input type="checkbox" :id="checkbox.value" :value="checkbox.value" v-model="checkboxsValue" />
         <label :for="checkbox.value">{{ checkbox.label }}</label>
      </div>
   </div>
</template>

<script lang="ts">
   import {defineComponent, ref, watch, computed} from 'vue'
   import store from '@/store'

   export default defineComponent({
      setup() {
         const checkboxs = [
            {value: '+', label: 'Суммирование'},
            {value: '-', label: 'Разность'},
            {value: '*', label: 'Умножение'},
            {value: '/', label: 'Деление'},
            {value: '**', label: 'Возведение в степень'},
         ]

         const checkboxsValue = ref(computed(() => store.state.checkboxValue).value)

         watch(
            () => checkboxsValue.value,
            () => {
               store.commit('setCheckboxValue', checkboxsValue.value)
               localStorage.setItem('checkbox', JSON.stringify(checkboxsValue.value))
            },
            {deep: true}
         )

         return {
            checkboxs,
            checkboxsValue,
         }
      },
   })
</script>

<style scoped>
   .checkbox__item label {
      margin-left: 15px;
   }
</style>
