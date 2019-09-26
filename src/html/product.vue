<template>
  <div>
    <p>product</p>

    <ul class="list">
      <li :class="index === listIndex ? 'item active' : 'item'" :data-id="item.id" v-for="(item, index) in list" @click="toProductDetail">
        <span :data-id="item.id">这是一条数据：</span>
        <span :data-id="item.id" @click="test">{{ item.name }}</span>
      </li>
    </ul>

    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from "../components/Footer";
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
        {id: 4, name: '详情4'}
      ]
    },
    methods: {
      toProductDetail(e) {
        let that = this;
        console.log('div', e);
        that.list.map(function (item, index) {
          if (String(item.id) === e.target.dataset.id) {
            that.listIndex = index;
          }
        });
      },
      test(e) {
        console.log('span', e);
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
    width: 50%;
    height: 30px;
    line-height: 30px;
    color: #000;
  }
  .item.active{
    color: #ff6c6c;
  }
</style>
