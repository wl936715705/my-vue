<template>
  <div id="app">
    <!-- header -->
    <Header></Header>

    <!-- router -->
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/Header";
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: .6rem;*/
    /*font-size: .28rem;*/
  }
</style>
