<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>仔细看看自己的订单列表，哪些支付了哪些没支付的.</span>
      </template>
    </order-header>
    <div v-show="showLoading">
      <loading></loading>
    </div>
    <div v-if="noData">
      <no-data></no-data>
    </div>
    <div v-else class="container">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div>
            <div>{{item.createTime}} | {{item.receiverName}} | 订单号：{{item.orderNo}} | {{item.paymentTypeDesc}}</div>
            <div>应付金额：<span>{{item.payment}}元</span></div>
          </div>
          <div>
            <div v-for="(child,i) in item.orderItemVoList" :key="i">
              <img :src="child.productImage" alt="">
              <p>{{child.productName}}</p> 
              <p>{{child.currentUnitPrice}} x {{child.quantity}} 元</p>
            </div>
            <div v-if="item.status == 20">
              <p>{{item.statusDesc}}</p>
            </div>
            <div v-else>
              <p @click="goPay(item.orderNo)">{{item.statusDesc}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="container" style="margin-top:30px;text-align:right;">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :pageSize="pageSize"
        @current-change="handleChange"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Loading from './../components/Loading'
import noData from './../components/noData'
import orderHeader from './../components/orderHeader'
import { Pagination } from 'element-ui'
export default {
  name:'order-list',
  data(){
    return{
      list:[],
      showLoading:true,
      noData:false,
      pageSize:10,
      pageNum:1,
      total:0
    }
  },
  components:{
    orderHeader,
    Loading,
    noData,
    [Pagination.name]:Pagination
  },
  mounted(){
    this.getOrderList();
  },
  methods:{
    getOrderList(){
      this.axios.get('/orders',{
        params:{
          pageNum:this.pageNum
        }
      }).then((res)=>{
        this.list = res.list;
        this.total =  res.total;
        this.showLoading = false;
        if(!res.list){
          this.noData = true;
        }
      })
    },
    goPay(orderNo){
      this.$router.push({
        path:'/order/pay',
        query:{
          orderNo
        }
      })
    },
    handleChange(pageNum){
      this.pageNum = pageNum;
      this.getOrderList();
    }
  }
}
</script>
<style  lang="scss" scoped>
.order-list {
  background: #f5f5f5;
  padding-bottom: 80px;
  .container{
    ul {
      li{
        width: 100%;
        background: #fff; 
        padding: 20px 30px;
        margin: 50px 0 0px 0;
        border-radius: 10px;
        box-shadow: 0px 0px 3px #FF6700;
        div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 60px;
          font-size: 14px;
          color: #666;
          img{
            height: 80px;
            width: 50px;
          }
          span{
            font-size: 24px;
          }
          p{
            font-size: 20px;
            color: #FF6700;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>


