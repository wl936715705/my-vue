<template>
    <div class="header">
      <van-nav-bar :title="$route.meta.headText" fixed border @click-left="onReturn">
        <van-icon name="arrow-left" color="#000" size="20px" slot="left" v-if="$route.meta.leftShow" />
      </van-nav-bar>
    </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      onReturn(e) {
        console.log('返回', e);
      }
    }
  }
</script>

<style scoped>

</style>
