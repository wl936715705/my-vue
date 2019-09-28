<template>
  <div>
    详情页{{ msg }}
  </div>
</template>

<script>
  export default {
    name: "productDetail",
    data() {
      return {
        msg: ''
      }
    },
    created() {
      let id = this.$route.query.id;
      this.msg = id;
    }
  }
</script>

<style scoped>

</style>
