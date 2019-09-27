<template>
  <div class="footer">
    <van-tabbar v-model="active" route inactive-color="#737373" active-color="#3c4158">
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[0].active : icon[0].normal">
      </van-tabbar-item>

      <van-tabbar-item replace to="/product">
        <span>产品</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[1].active : icon[1].normal">
      </van-tabbar-item>

      <van-tabbar-item replace to="/my">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[2].active : icon[2].normal">
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import iconPath1 from '../assets/img/tabBar/1.png';
  import selectedIconPath1 from '../assets/img/tabBar/1_selected.png';
  import iconPath2 from '../assets/img/tabBar/2.png';
  import selectedIconPath2 from '../assets/img/tabBar/2_selected.png';
  import iconPath4 from '../assets/img/tabBar/4.png';
  import selectedIconPath4 from '../assets/img/tabBar/4_selected.png';
  export default {
    data() {
      return {
        active: 0,
        icon: [
          {
            text: '首页',
            normal: iconPath1,
            active: selectedIconPath1
          },
          {
            text: '产品',
            normal: iconPath2,
            active: selectedIconPath2
          },
          {
            text: '我的',
            normal: iconPath4,
            active: selectedIconPath4
          }
        ]
      }
    },

    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
