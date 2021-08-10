<template>
  <div id="app">
    <router-view/>
    <About/>
  </div>
</template>

<script>
  import About from "./views/About"
  export default {
    name: 'App',
    components: {About}
  }
</script>

<style>
  html,body,#app{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
  }
</style>
