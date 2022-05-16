<template>
   <div class="app-wrapper">
      <router-view></router-view>
   </div>
</template>

<style>
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }
   html,
   body {
      height: 100%;
      font-family: Helvetica, sans-serif;
      font-weight: 700;
   }
   .app-wrapper {
      max-width: 900px;
      margin: 0 auto;
   }
   span.changing_data {
      color: teal;
      font-size: 20px;
   }
   .mb-10 {
      margin-bottom: 10px;
   }
   .element input {
      max-width: 40px;
      font-weight: 700;
      font-size: 28px;
      border: none;
      outline: none;
      border-bottom: 2px solid #000;
      padding: 2px;
      text-align: center;
   }
   input[type='number']::-webkit-inner-spin-button,
   input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
</style>
