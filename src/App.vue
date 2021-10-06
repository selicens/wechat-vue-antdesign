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
  .flexCenter{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .textCenter{
    text-align: center;
  }
  .cardBox{
    padding: 50px 10px;
    background-color: #FFFFFf;
    border-radius: 5px;
    width: 100%;
  }
  .images {
    height: 200px;
    border: 1px solid #c0c0c0;
    width: 100%;
  }

  .images img {
    width: 100%;
    height: 100%;
  }
  .texts{
    margin: 15px 0 0 0;
  }
  .title{
    margin: 0 0 10px 0;
  }
  .border{
    margin: 0 10px;
  }
  a {
    text-decoration: underline;
  }

</style>
