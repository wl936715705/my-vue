<template>
    <div>
      <p>my</p>
      <!-- parent-text: 子组件接收数据名字 parentClick: 子组件接收事件名字-->
      <my-button :parent-text="parentText" @parentClick="parentClick"></my-button>
    </div>
</template>

<script>
  import Footer from "../../components/Footer";
  import MyButton from "../../components/MyButton";
  export default {
    name: "my",
    components: {
      MyButton,
      Footer
    },
    data() {
      return {
        parentText: 'AAA',
        btnFlag: true
      }
    },
    methods: {
      parentClick() {
        let that = this;
        if (!that.btnFlag) return false;
        that.btnFlag = false;

        that.parentText = 'BBB';
        setTimeout(function () {
          that.parentText = 'CCC';
          that.btnFlag = true;
        }, 2000);
      }
    }
  }
</script>

<style scoped>

</style>
