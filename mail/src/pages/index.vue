<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(sub,i) in item" :key="i">
                    <a :href="sub ? '/#/product/'+sub.id : ''">
                      <img :src="sub.id ? sub.img : '/imgs/item-box-1.png'" alt="">
                      {{sub ? sub.name : '小米cc9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视盒子</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(sub,i) in item" :key="i">
                    <a :href="sub ? '/#/product/'+sub.id : ''">
                      <img v-lazy="sub.id ? sub.img : '/imgs/item-box-1.png'" alt="">
                      {{sub ? sub.name : '小米cc9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行  穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img v-lazy="item.img" alt="#">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" data-src="" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
      <div class="product-box">
        <div class="container">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="banneer-left">
              <a href="/#/product/35">
                <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
              </a>
            </div>
            <div class="list-box-right">
              <div class="list" v-for="(arr,index) in phoneList" :key="index">
                <div class="item" v-for="(item,i) in arr" :key="i">
                  <span v-if="item.status === 1" class="new-pro">新品</span>
                  <span v-else class="kill-pro">秒杀</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price" @click="addCart(item.id)">{{item.price | AllPrice}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <service-bar></service-bar>
    <modal 
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @cancel="showModal=false"
      @submit="gotoCart">
      <template v-slot:body>
        <p>商品添加成功!!</p>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from './../components/ServiceBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Modal from './../components/Modal'
export default {
  name:'index',
  components:{
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data(){
    return {
      showModal:false,
      swiperOption:{
        autoplay:true,
        loop:true,
        effect:'cube',
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      slideList:[
        {
          id:'42',
          img:'/imgs/slider/slide-1.jpg'
        },
        {
          id:'45',
          img:'/imgs/slider/slide-2.jpg'
        },
        {
          id:'46',
          img:'/imgs/slider/slide-3.jpg'
        },
        {
          id:'42',
          img:'/imgs/slider/slide-4.jpg'
        },
        {
          id:'42',
          img:'/imgs/slider/slide-5.jpg'
        },
      ],
      menuList:[
        [
          {
            id:30,
            img:'/imgs/item-box-1.png',
            name:'小米CC9'
          },{
            id:31,
            img:'/imgs/item-box-2.png',
            name:'小米8青春版'
          },{
            id:32,
            img:'/imgs/item-box-3.jpg',
            name:'ReadMi k20 pro'
          },{
            id:30,
            img:'/imgs/item-box-4.jpg',
            name:'移动4G专区'
          }
        ],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },
        {
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },
        {
          id:45,
          img:'/imgs/ads/ads-3.png'
        },
        {
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList:[
        [0,0,0,0],[0,0,0,0]
      ]
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.axios.get('/products',{
        params:{
          categoryId:100012,
          pageSize:14
        }
      }).then( (res) => {
        res.list = res.list.slice(6,14);
        this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)]
      })
    },
    addCart(id) {
      // return
      this.axios.post('/carts',{
        productId:id,
        selected:true
      }).then( (res) => {
        this.showModal = true;
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
      }).catch( () => {
        this.showModal = true;
      })
    },
    gotoCart(){
      this.$router.push('/cart')
    }
  },
  filters:{
    AllPrice(val){
      if(!val) return '0'
      return '¥' + val.toFixed(2) +'元';
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../assets/scss/mixin.scss';
  .index{
    .swiper-box{
      .nav-menu{
        position: absolute;
        width: 264px;
        height: 451px;
        z-index: 9;
        padding: 26px 0;
        background: #55585a78;
        box-sizing: border-box;
        // font-size: 
        .menu-wrap{
          .menu-item{
            a{
              position: relative;
              display: block;
              color: #fff;
              font-size: 16px;
              padding-left: 30px;
              &:after{
                position:absolute;
                right: 30px;
                top: 17.5px;
                content: '';
                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color: #FF6600;
              .children{
                display: block;
              }
            }
            .children{
              position: absolute;
              display: none;
              overflow: hidden;
              width: 962px;
              height: 450px;
              background-color: #fff;
              top: 0;
              left: 264px;
              border: solid 1px #E5E5E5;
              ul{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 75px;
                li{
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  padding-left: 23px;
                  a{
                    color: #333;
                    img{
                      width: 42px;
                      height: 35px;
                      vertical-align: middle;
                      margin-right: 10px;
                    }
                  }
                }
              }
            }
            height: 50px;
            line-height: 50px;
          }
        }
      }
      .swiper-container{
        height: 451px;
        .swiper-button-prev{
          left: 274px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom: 31px;
      a{
        width: 296px;
        height: 167px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner{
      margin-bottom: 50px;
      a{
        img{
          width: 100%;
        }
      }
    }
    .product-box{
      h2{
        color: #333;
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        margin-bottom: 20px;
      }
      background-color: #F5F5F5;
      padding: 30px 0 50px 0;
      .wrapper{
        display: flex;
        .banneer-left{
          margin-right: 16px;
          a{
            img{
              width: 224px;
              height: 619px;
            }
          }
        }
        .list-box-right{
          .list{
            width: 986px;
            margin-bottom: 14px;
            &:last-child{
              margin-bottom: 0;
            }
            @include flex();
            .item{
              width: 236px;
              height: 302px;
              background-color: #fff;
              text-align: center;
              span{
                font-size: 14px;
                display: inline-block;
                width: 67px;
                height: 24px;
                line-height: 24px;
                color: #fff;
                &.new-pro{
                  background-color: #7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  height: 195px;
                  width: 100%;
                }
              }
              .item-info{
                h3{
                  color: #333;
                  font-size: 14px;
                  font-weight: bold;
                  height: 14px;
                  line-height: 14px;
                }
                p{
                  color: #999;
                  line-height: 13px;
                  margin: 6px auto 13px auto;
                }
                .price{
                  font-size: 14px;
                  color: #F20A0A;
                  font-weight: bold;
                  cursor: pointer;
                  &:after{
                    content: '';
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png',contain);
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>


