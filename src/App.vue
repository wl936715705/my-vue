<template>
  <div id="app">
    <!-- header -->
    <Header></Header>

    <!-- router -->
    <router-view class="container"></router-view>

    <!-- footer -->
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Footer from "./components/Footer";
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    text-align: center;
    color: #2c3e50;
    background: #fafafa;
  }
</style>
