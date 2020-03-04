<template>
  <div class="carts-list">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template> 
    </order-header>
    <!-- 订单样式 -->
    <div class="table-list">
      <div class="container">
        <table>
          <ul>
            <li class="table-head">
              <span class="chexkbox" @click="toggleAll" :class="{'checked':allChecked}"><i></i></span>
              <p>全选</p>
            </li>
            <li>商品名称</li>
            <li>单价</li>
            <li class="w">数量</li>
            <li>小记</li>
            <li>操作</li>
          </ul>
          <ul class="pd22" v-for="(item,index) in list" :key="index">
            <li>
              <span class="chexkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"><i></i></span>
            </li>
            <li class="col3">
              <img :src="item.productMainImage"/>
              <p>{{item.productName}} {{item.productSubtitle}}</p>
            </li>
            <li class="col3">{{item.productPrice}}元</li>
            <li>
              <div class="add-jian">
                <div @click="updateCart(item,'一')">一</div>
                <div>{{item.quantity}}</div>
                <div @click="updateCart(item,'＋')">＋</div>
              </div>
            </li>
            <li class="col60">{{item.productTotalPrice}}元</li>
            <li class="col3"><a href="javascript:;" @click="deleteCarts(item)">x</a></li>
          </ul>
        </table>
      </div>
    </div>
    <div class="table-footer">
      <div class="container">
        <div>
          <p class="shopping">继续购物</p>
          <p>共<span> {{cartTotalQuantity}} </span>件商品，已选择<span> {{checkedNum}} </span>件</p>
        </div>
        <div>
          <p class="shopping">合计：<span class="fn24">{{cartTotalPrice}}元</span></p>
          <button class="btn btn-large" @click="order">去结算</button>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/orderHeader'
import NavFooter from './../components/NavFooter'
export default {
  components:{
    OrderHeader,NavFooter
  },
  name:'cart',
  data() {
    return {
      list:[],//商品列表
      allChecked:false, //是否全选
      cartTotalPrice:0, //商品总金额
      checkedNum:0, // 选中商品熟练
      cartTotalQuantity:0
    }
  },
  mounted(){
    this.getCartList();
  },
  methods:{
    getCartList(){
      this.axios.get('/carts').then( (res) => {
        this.renderData(res);
      })
    },
    // 控制全选非全选功能 
    toggleAll(){
      let url = this.allChecked ? '/carts/unSelectAll' : 'carts/selectAll';
      this.axios.put(url).then( (res) => {
        this.renderData(res);
      })
    },
    // 购物车删除商品
    deleteCarts(item){
      let con = confirm('确定删除该商品吗？');
      if(con){
        this.axios.delete(`/carts/${item.productId}`).then((res) => {
          this.renderData(res);
          this.$message.success('商品删除成功～')
        })
      } else {
        return;
      }
    },
    // 购物车下单
    order(){
      let isChecked = this.list.every(item => !item.productSelected);
      if(isChecked){
        this.$message.warning('请选择要结算的商品');
      } else {
        this.$router.push('/order/comfirm');
      }
    },
    // 购物车状态更新
    updateCart(item,type){
      let quantity = item.quantity,
          selected = item.productSelected;
      if(type == '一'){
        if(quantity == 1){
          this.$message.warning('商品至少保留一件');
          return;
        }
        --quantity;
      } else if(type == '＋'){
        if(quantity > item.productStock){
          this.$message.warning('商品不能超过库存数量');
        }
        ++quantity;
      } else {
        selected = !item.productSelected;
      }
      this.axios.put(`/carts/${item.productId}`,{
        quantity,
        selected
      }).then( (res) => {
        this.renderData(res);
      })
    },
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.cartTotalQuantity = res.cartTotalQuantity;
      this.checkedNum = res.cartProductVoList.filter(item => item.productSelected).length;
    },
    checked(item){
      this.$message.warning(item)
      if(item){
        item=false;
      }
      item = true;
    }
  }
}
</script>
<style lang="scss">
@import './../assets/scss/mixin.scss';
  .carts-list{
    .table-list{
      padding:32px 0 32px 0;
      background: #f1f1f2;
      .container{
        background: #fff;
        border: solid 1px #f5f5f5;
        table{
          width: 100%;
          ul{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 30px;
            border-bottom: solid 1px #ddd;
            &:nth-child(1){
              li{
                color: #666;
                font-size: 14px;
              }
            }
            &.pd22 {
              padding:22px 0;
            }
            li {
              // padding: 0 10px;
              text-align: center;
              display: block;
              float: left;
              height: 80px;
              line-height: 80px;
              position: relative;
              &:nth-child(1){
                width:120px;
              }
              &:nth-child(2){
                width:400px;
              }
              &:nth-child(4){
                width:150px;
              }
              &:nth-child(5){
                width:100px;
              }
              &:nth-child(6){
                width:50px;
              }
              &.table-head{
                p{
                  margin-left: 80px;
                }
              }
              p{
                display: inline-block;
                margin-left: 80px;
                width: 500px;
                text-align: left;
              }
              .chexkbox {
                display: inline-block;
                width: 22px;
                height: 22px;
                background-color: #f1f1f2;
                position: absolute;
                top: 29px;
                left: 40px;
                z-index: 999;
                i{
                  position: absolute;
                  left: 0;
                  @include bgImg(22px,22px,'/imgs/icon-gou.png');
                }
              }
              .checked{
                background: #FF6600;
              }
              img{
                position: absolute;
                width: 120px;
                height: 80px;
                left: -50px;
              }
              &.col3{
                color: #333;
                font-size: 18px;
              }
              &.col60{
                color: #FF6600;
                font-size: 16px;
              }
              a{
                font-size: 26px;
                color: #B0B0B0;
              }
              .add-jian{
                width: 150px;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border:solid 1px #ccc;
                margin-top: 19px;
                div:nth-child(2){
                  flex:2;
                }
                div:nth-child(1),div:nth-child(3){
                  flex: 1;
                }
                div{
                  font-size: 14px;
                  text-align: center;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    .table-footer{
      background: #f1f1f2;
      padding-bottom: 100px;
      .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        div{
          p{
            display: inline-block;
            color: #666666;
            font-size: 14px;
            span{
              color: #FF6600;
              &.fn24{
                font-size: 24px;
              }
            }
            &.shopping{
              margin-right: 30px;
            }
          }
        }
      }
    }
  }
</style>


