<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="userName">{{userName}}</a>
          <a href="javascript:;" v-if="userName" @click="loginOut">【退出】</a>
          <a href="javascript:;" v-if="!userName" @click="login">登陆</a>
          <a href="javascript:;" v-if="userName">我的订单</a>
          <a href="javascript:;" v-else>注册</a>
          <a href="javascript:;" class="my-cart" @click="goCart"><span class="icon-cart"></span>购物车{{cartCount}}</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li v-for="(item,index) in phoneList" :key="index" class="product">
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>ReadMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="/#/" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="/#/" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米大电视</div>
                    <div class="pro-price">3799元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="/#/" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt="">
                    </div>
                    <div class="pro-name">小米超薄电视 无敌</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="/#/" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt="">
                    </div>
                    <div class="pro-name">小米微型电视</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="/#/" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt="">
                    </div>
                    <div class="pro-name">小米电视 你值得拥有</div>
                    <div class="pro-price">4799元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="/#/" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt="">
                    </div>
                    <div class="pro-name">小米电视机哇嘎嘎</div>
                    <div class="pro-price">2399元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:'nav-header',
  data(){
    return {
      phoneList:[]
    }
  },
  computed:{
    // userName(){
    //     return this.$store.state.userName
    // },
    // cartCount(){
    //   return this.$store.state.cartCount
    // },
    ...mapState(['userName','cartCount'])
  },
  mounted(){
    this.getproductList();
    if(this.$route.params && this.$route.params.from == 'login'){
      this.getCartCount();
    }
  },
  methods:{
    getproductList() {
      this.axios.get('./products',{
        params:{
          categoryId:'100012'
        }
      }).then( (res) => {
        if(res.list.length >6) return this.phoneList = res.list.slice(0,6)
        this.phoneList = res.list
      })
    },
    login() {
      this.$router.push('/login')
    },
    goCart() {
      this.$router.push('/cart');
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res) => {
        // to-do 保存到vuex里面
        this.$store.dispatch('saveCartCount', res);
      })
    },
    loginOut(){
      this.axios.post('/user/logout').then(()=>{
        this.$message.success('退出登陆成功～');
        this.$cookie.set('userId','',{expires:'-1'});
        this.$store.dispatch('saveUserName', '');
        this.$store.dispatch('saveCartCount', 0);
        // this.$router.push({name:'login'});
      })
    }
  },
  filters:{
    currency(val){
      if(!val) return '0.00' 
      return '¥' +val.toFixed(2) + '元';
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background: #333;
      color: #B0B0B0;
      .container{
        @include flex();
        a{
          display: inline-block;
          color: #B0B0B0;
          margin-right: 17px;
        }
        .my-cart {
          width: 110px;
          background-color: #FF6600;
          text-align: center;
          color: #fff;
          margin-right: 0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png',contain);
            margin-right: 4px;  
          }
        }
      }
    }
    .nav-header{
      .container{
        position: relative;
        height: 112px;
        @include flex();
        .header-menu{
          display: inline-block;
          width: 640px;
          padding-left: 209px;
          .item-menu{
            display: inline-block;
            color: #333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span{
              cursor: pointer;
            }
            &:hover{
              color: #FF6600;
              .children{
                height: 220px;
                opacity: 1;
              }
            }
            .children{
              position: absolute;
              background: #fff;
              top: 112px;
              left: 0;
              width: 1226px;
              height: 0;
              opacity: 0;
              overflow: hidden;
              border-top: 1px solid #E5E5E5;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition: all .3s;
              .product{
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                text-align: center;
                &:after{
                  position:absolute;
                  content: '';
                  top: 28px;
                  right: 0;
                  border-left: 1px solid #D7D7D7;
                  height: 100px;
                  width: 1px;
                }
                &:last-child:after{
                  display: none;
                }
                a{
                  display: inline-block;
                }
                img{
                  height: 111px;
                  width: auto;
                  margin-top: 26px;
                }
                .pro-img{
                  height: 137px;
                }
                .pro-name{
                  font-weight: bold;
                  line-height: 15px;
                  padding: 19px 0 8px 0;
                  color: #333;
                }
                .pro-price{
                  line-height: 20px;
                  color: #FF6600;
                }
              }
            }
          }
        }
        .header-search{
          width: 319px;
          .wrapper{
            height: 50px;
            border: 1px solid #E0E0E0;
            display: flex;
            align-items: center;
            input{
              border: none;
              border-right: 1px solid #E0E0E0;
              width: 264px;
              height: 50px;
              padding-left: 14px;
              box-sizing: border-box;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png',contain);
              margin-left: 17px;
            }
          }
        }
      }
    }
  }
</style>


