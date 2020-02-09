<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        小米 8
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'nav-bar',
  data(){
    return {
      isFixed:false
    }
  },
  mounted(){
    window.addEventListener('scroll',this.initHeight)
  },
  methods:{
    initHeight(){
      // 获取页面Y 轴的偏移量
      let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
      this.isFixed = scrollTop > 152 ? true :false;
    }
  },
  destroyed(){
    window.removeEventListener('scroll',this.initHeight,false)
  }
}
</script>
<style lang="scss" scoped>
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .nav-bar{
    height: 71px;
    line-height:71px;
    border-top: solid 1px $colorH;
    background: #fff;
    &.is_fixed {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      box-shadow: 0 5px 5px #ccc;
    }
    .container {
      @include flex();
      .pro-title{
        font-size: $fontH;
        color: $colorB;
        font-weight: bold;
      }
      .pro-param{
        font-size: $fontJ;
        span{
          color: $colorC;
        }
        a{
          color: $colorC;
          display: inline-block;
          margin:0 10px;
        }
      }
    }
  }
</style>



