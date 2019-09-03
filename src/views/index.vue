<template>
  <div>{{ msg }}</div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'index'
      }
    },

    created () {
      const that = this
      console.log('created')
      console.log(this)

      this.storage()
      // let arr = [{name: 'A', value: '111'}, {name: 'B', value: '222'}]
      // arr.map(function (value, index, arr) {
      //   that.$jmweb.setStorage(value.name, value.value)
      //   console.log('get：', that.$jmweb.getStorage(arr[index].name))
      // })
    },

    methods: {
      /**
       * 数据缓存测试
       */
      storage () {
        const that = this
        let arr = [{name: 'A', value: '111'}, {name: 'B', value: '222'}]
        arr.map(function (value, index, arr) {
          that.$jmweb.setStorage(value.name, value.value)
          console.log('get：', that.$jmweb.getStorage(arr[index].name))
        })
      }
    }
  }
</script>

<style scoped>

</style>
