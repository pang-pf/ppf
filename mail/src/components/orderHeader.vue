<template>
  <div class="order-header">
    <div class="container">
        <div class="flex-box">
          <div class="header-logo">
            <a href="/#/index"></a>
          </div>
          <div class="title">
            <h2>{{title}}<slot name="tip"></slot></h2>
          </div>
          <div class="username">
            <a href="javascript:;">{{userName}}</a>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name:'order-header',
  props:{
    title:String
  },
  computed:{
    ...mapState(['userName'])
  },
}
</script>

<style lang="scss">
  .order-header{
    border-bottom: solid 2px #FF6600;
    background: #fff;
    height: 112px;
    line-height: 112px;
    .flex-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        width: 1050px;
        h2{
          color: #333;
          font-size: 28px;
          span{
            color: #999;
            font-size: 14px;
            display: inline-block;
            font-weight: 300;
            margin-left: 17px;
          }
        }
      }
      .username{
        color: #666;
        font-size: 16px;
        a{
          color: #B0B0B0;
        }
      }
    }
  }
</style>


