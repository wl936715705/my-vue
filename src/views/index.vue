<template>
  <div>
    <div>{{ msg }}</div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'index',
        time: ''
      }
    },

    created () {
      const that = this
      console.log('created')
      console.log(this)

      this.storage()
      this.tools()
    },

    methods: {
      /**
       * 数据缓存测试
       */
      storage () {
        const that = this
        let arr = [{name: 'A', value: '本地缓存111'}, {name: 'B', value: '本地缓存222'}]
        arr.map(function (value, index, arr) {
          that.$jmweb.setStorage(value.name, value.value)
          that.msg += that.$jmweb.getStorage(arr[index].name)
          console.log('get：', that.$jmweb.getStorage(arr[index].name))
        })
      },

      /**
       * tools测试
       */
      tools () {
        const that = this
        that.time = ' 时间：' + that.$jmweb.tools.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
        setInterval(function () {
          that.time = ' 时间：' + that.$jmweb.tools.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
