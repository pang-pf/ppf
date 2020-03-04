<template>
  <div class="comfirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真查看订单信息</span>
      </template>
    </order-header>
    <div class="container">
      <div class="adress">
        收货地址
        <div class="adress-l">
          <div class="adress-box" @click="actived = index" :class="{'actived':actived==index}" v-for="(item,index) in list" :key="index">
            <p>{{item.receiverName}}</p>
            <p>{{item.receiverMobile}}</p>
            <p>邮编：{{item.receiverZip}}</p>
            <p>地址：{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</p>
            <div class="cz-icon">
              <div @click="deleteAdress(item)">删除</div>
              <div @click="editAdresss(item)">编辑</div>
            </div>
          </div>
          <div class="adress-box">
            <h4 @click="addAddress">添加地址+</h4>
          </div>
        </div>
      </div>
      <div class="sp-list">
        <h2>商品</h2>
        <div class="list" v-for="(item,index) in cartList" :key="index">
          <div>{{item.productName}}{{item.productSubtitle}}</div>
          <div>{{item.productPrice}}元*{{item.quantity}}</div>
          <div>{{item.productTotalPrice}}元</div>
        </div>
      </div>
      <div class="midll">
        <div class="ps">
          配送方式
          <p>包邮</p>
        </div>
        <div class="ps">
          发票<p>电子发票 个人 商品明显</p>
        </div>
        <div class="detail-lis">
          <div>商品件数:<p>{{count}}件</p></div>
          <div>商品总价:<p>{{cartTotalPrice}}元</p></div>
          <div>优惠活动:<p>0元</p></div>
          <div>运费:<p>0元</p></div>
          <div>应付总额:<p class="font24">{{cartTotalPrice}}元</p></div>
        </div>
      </div>
      <div class="details-foot">
        <router-link to='/#/cart'><button class="btn btn-large btn-default">返回购物车</button></router-link>
        <button class="btn btn-large" @click="orderSubmit">去结算</button>
      </div>
      <div>
      </div>
    </div>
    <modal
      :title="title"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京市">北京市</option>
              <option value="天津市">天津市</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京市">北京市</option>
              <option value="天津市">天津市</option>
              <option value="河北">保定</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京市">昌平区</option>
              <option value="天津市">海淀区</option>
              <option value="河北">西城区</option>
              <option value="河北">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea v-model="checkedItem.receiverAddress" name="street" id="" cols="30" rows="10">

            </textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import orderHeader from './../components/orderHeader'
import Modal from './../components/Modal'
export default {
  name:'order-comfirm',
  components:{Modal,orderHeader},
  data(){
    return{
      list:[],// 收获地址list
      cartList:[], //购物车需要结算的list
      cartTotalPrice:0,
      count:0, // 商品总件数
      checkedItem:{}, //选中的商品的对象
      userAction:'', // 用户行为 0 新增 1编辑 2删除
      showDelModal:false, // 是否显示删除弹窗
      showEditModal:false, // 编辑的弹窗显示 隐藏
      title:'', // 新增 编辑title的修改
      actived:0,
    }
  },
  mounted(){
    this.getAddressList();
    this.getCartList();
  },
  methods:{
    getAddressList(){
      this.axios.get('/shippings').then((res)=>{
        this.list = res.list;
      })
    },
    getCartList(){
      this.axios.get('/carts').then((res)=>{
        let list = res.cartProductVoList;
        this.cartTotalPrice = res.cartTotalPrice;
        this.cartList = list.filter(item => item.productSelected);
        this.cartList.map((item)=>{
          this.count += item.quantity;
        })
      })
    },
    // 编辑地址
    editAdresss(item){
      this.checkedItem = item;
      this.showEditModal = true;
      this.userAction = 1;
    },
    deleteAdress(item){
      this.checkedItem = item;
      this.userAction = 2;
      this.showDelModal = true;
    },
    //  地址删除 编辑 新增 功能
    submitAddress(){
      let { checkedItem,userAction } = this;
      let method,url,params={};
      if(userAction == 0) {
        method = 'post',url='/shippings';
      } else if(userAction == 1){
        method = 'put',url=`/shippings/${checkedItem.id}`;
      } else {
        method = 'delete',url=`/shippings/${checkedItem.id}`;
      }
      if(userAction == 0 ||  userAction == 1){
        let { 
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverAddress,
          receiverZip } = checkedItem;
        let errMessage;
        if(!receiverName){
          errMessage = '请输入收货人名称';
        } else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){
          errMessage = '请输入正确的手机号'
        } else if(!receiverProvince || !receiverCity || !receiverAddress || !receiverZip){
          errMessage = '请选择省份'
        }
        if(errMessage){
          this.$message.error(errMessage);
          return
        }
        params ={
         receiverName:checkedItem.receiverName,
         receiverMobile:checkedItem.receiverMobile,
         receiverProvince:checkedItem.receiverProvince,
         receiverCity:checkedItem.receiverCity,
         receiverAddress:checkedItem.receiverAddress,
         receiverZip:checkedItem.receiverZip,
        }
      }
      this.axios[method](url,params).then(()=>{
        this.closeModal();
        this.getAddressList();
        this.$message.success('操作成功');
      });
    },
    closeModal(){
      this.checkedItem = {};
      this.userAction = '';
      this.showDelModal = false;
      this.showEditModal = false;
    },
    addAddress(){
      this.showEditModal = true;
      this.userAction = 0;
      this.checkedItem = {};
      this.title = '新增地址信息';
    },
    // 订单提交
    orderSubmit(){
      let item = this.list[this.actived];
      if(!item){
        this.$message.error('请选择收货地址');
        return
      }
      this.axios.post('/orders',{
        shippingId:item.id
      }).then((res)=>{
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo:res.orderNo
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "./../assets/scss/button.scss";
  .comfirm{
    padding: 30px 0 100px 0;
    background: #F5F5F5;
    .container{
      background: #fff;
      .adress{
        color: #333;
        font-size: 20px;
        line-height: 20px;
        padding: 38px 0 0 0;
        margin: 0 60px;
        .adress-l{
          display: flex;
          .adress-box{
            &:hover{
              cursor: pointer;
            }
            width: 270px;
            height: 180px;
            text-align: center;
            line-height: 180px;
            font-size: 14px;
            color: #999;
            border: solid 1px #E5E5E5;
            margin: 20px 30px 40px 0;
            h4{
              cursor: pointer;
            }
            p{
              height: 30px;
              line-height: 30px;
              text-align: left;
              padding-left: 20px;
            }
            .cz-icon{
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 30px;
              /* bottom: 0; */
              padding: 20px 30px;
              cursor: pointer;
              &>div:hover{
                color: #FF6700;
              }
            }
          }
          .actived{
            border: solid 1px #FF6700;
          }
        }
      }
      .sp-list{
        padding: 38px 0;
        margin: 0 60px;
        .list{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          padding: 20px 0;
          border-bottom: solid 1px #E5E5E5;
          border-top: solid 1px #E5E5E5;
          &>div:nth-child(1) {
            width: 400px;
          }
        }
      }
      .midll{
        // padding: 38px 0;
        margin: 0 60px;
        .ps{
          color: #333;
          height: 20px;
          line-height: 20px;
          font-size: 20px;
          margin-top: 20px;
          p{
            font-size: 16px;
            height: 16px;
            line-height: 16px;
            display: inline-block;
            font-size: 16px;
            color: #FF6700;
          }
        }
      }
      .detail-lis{
        text-align: right;
        margin: 30px 30px;
        border-bottom: solid 1px #E5E5E5;
        padding-bottom: 30px;
        div{
          font-size: 16px;
          height: 16px;
          line-height: 16px;
          color: #666;
          margin-top: 14px;
          p{
            display: inline-block;
            color: #FF6700;
            width: 200px;
            &.font24{
              font-size: 24px;
            }
          }
        }
      }
      .details-foot{
        text-align: right;
        margin: 50px 0;
        padding-bottom: 60px;
        button{
          margin-right: 30px;
        }
      }
    }
    .edit-wrap{
      font-size: 14px;
      .item{
        margin-bottom: 15px;
        input{
          display: inline-block;
          width: 283px;
          height: 40px;
          line-height: 40px;
          padding-left: 15px;
          border:solid 1px #e5e5e5;
          &:nth-child(2) {
            margin-left: 14px;
          }
        }
        select{
          height: 40px;
          line-height: 40px;
          border:solid 1px #e5e5e5;
          margin-right: 15px;
        }
        textarea{
          height: 62px;
          width: 100%;
          padding: 13px 15px;
          box-sizing: border-box;
          border:solid 1px #e5e5e5;
        }
      }
    }
  }
</style>


