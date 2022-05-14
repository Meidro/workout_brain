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
   .mb-15 {
      margin-bottom: 15px;
   }
</style>
