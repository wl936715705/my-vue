<template>
  <div>
    <p>index</p>
    <div class="time">{{ time }}</div>

    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from "../components/Footer";
  export default {
    name: 'index',
    components: {
      Footer
    },
    data() {
      return {
        msg: 'index',
        time: ''
      }
    },

    created() {
      const that = this;
      console.log('created');
      console.log(this);

      // this.storage();
      // this.date();
      this.request();
    },

    methods: {
      /**
       * 数据缓存测试
       */
      storage() {
        const that = this;
        let arr = [{name: 'A', value: '本地缓存111'}, {name: 'B', value: '本地缓存222'}];
        arr.map(function (value, index, arr) {
          that.$jmweb.setStorage(value.name, value.value);
          that.msg += that.$jmweb.getStorage(arr[index].name);
          console.log('get：', that.$jmweb.getStorage(arr[index].name));
        });

        // const str = '{"name": "小明"}';
        const str = '"小明"';
        const json = {name: '小明'};
        console.log(that.$jmweb.getObject(str));
        // console.log(that.$jmweb.getJson(json));
        console.log(that.$jmweb.setAppJson('test'));

        let arrA = [1, 2, 3];
        let arrB = [1, 2, 3];
        let arrC = [2, 3, 4];
        let arrD = [4, 5, 6];

        console.log('isEqual:', that.$jmweb.array.isEqual(arrA, arrB));
        console.log('isEqual:', that.$jmweb.array.isEqual(arrA, arrC));
        console.log('getIntersection:', that.$jmweb.array.getIntersection(arrA, arrC));
        console.log('getUnion:', that.$jmweb.array.getUnion(arrA, arrC));
        console.log('hasOneOf:', that.$jmweb.array.hasOneOf(arrA, arrB));
        console.log('hasOneOf:', that.$jmweb.array.hasOneOf(arrA, arrD));

        console.log('getOneLen:', that.$jmweb.string.getOneLen(str, '小'));
        console.log('oneOf:', that.$jmweb.string.oneOf(json, '小明'));

        console.log('isMillisecond:', that.$jmweb.date.isMillisecond(80000000000));

        console.log('getDate:', that.$jmweb.date.getDate(Date.now(), ''));
        console.log('getRelativeTime:', that.$jmweb.date.getRelativeTime(1067761183));
        console.log('getRelativeTime:', that.$jmweb.date.getRelativeTime(Date.now()));
      },

      /**
       * date测试
       */
      date() {
        const that = this;
        that.time = ' 时间：' + that.$jmweb.date.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
        setInterval(function () {
          that.time = ' 时间：' + that.$jmweb.date.formatDate(new Date(),'yyyy-MM-dd h:mm:ss');
        }, 1000);
      },

      /**
       * 请求测试
       */
      request() {
        const that = this;
        let data = {name: '小明', num: 0};
        that.$jmweb.request({
          url: '/uuser/queryUserforPage',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          data: data
        }).then(function (res) {
          console.log(res);
        }, function (res) {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
