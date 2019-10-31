<template>
    <div class="MyButton" @click="childClick">{{childText}}</div>
</template>

<script>
  export default {
    name: "MyButton",
    props: ['parentText'],
    data() {
      return {
        childText: this.parentText // 将父组件数据赋值给子组件
      }
    },
    methods: {
      childClick() {
        /**
         * 接收父组件事件
         */
        this.$emit('parentClick');
      }
    },
    watch: {
      /**
       * 监听父组件数据变化
       */
      parentText(newVal) {
        this.childText = newVal;
      }
    }
  }
</script>

<style scoped>
  .MyButton{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: #ff6c6c;
    transform: translate3d(-50%, 50%, 0);
    border-radius: 6px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, .2);
  }
</style>
