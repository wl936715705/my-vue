<template>
  <div>
    <router-view></router-view>
    <p>product</p>

    <ul class="list">
      <li v-for="(item, index) in list" class="item" :data-id="item.id" @click="toProductDetail">
        <span :data-id="item.id">这是第{{ index+1 }}一条数据：</span>
        <span :data-id="item.id">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Footer from "../../components/Footer";
  export default {
    name: "product",
    components: {
      Footer
    },
    data() {
      return {
        listIndex: 0,
        list: []
      }
    },
    created() {
      this.list = [
        {id: 1, name: '详情1'},
        {id: 2, name: '详情2'},
        {id: 3, name: '详情3'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
        {id: 4, name: '详情4'},
      ]
    },
    methods: {
      toProductDetail(e) {
        let that = this;
        console.log('div', e);
        that.$router.push('/productDetail?id='+e.target.dataset.id);
      }
    }
  }
</script>

<style scoped>
  .list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item{
    height: 30px;
    line-height: 30px;
    color: #000;
  }
  .item.active{
    color: #ff6c6c;
  }
</style>
