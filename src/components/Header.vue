<template>
  <div class="header">
    <van-nav-bar :title="$route.meta.title" fixed border @click-left="onReturn">
      <van-icon name="arrow-left" color="#000" size="20px" slot="left" v-if="$route.meta.leftShow" />
    </van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      onReturn(e) {
        let that = this;
        console.log('返回', e);
        that.$router.history.go(-1);
      }
    }
  }
</script>

<style scoped>
  .header{
    height: 46px;
  }
</style>
