<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="container">
      <div class="details-nav">
        <div class="nav-left">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in imgList" :key="index">
              <img :src="item" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="nav-right">
          <div class="right-txt">
            <div class="top-txt">
              <h2>{{product.name}}</h2>
              <span>{{product.subtitle}} / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红 外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</span>
              <p>小米自营</p>
              <p>{{product.price}}元<span> 2999元</span></p>
            </div>
            <div class="nav-middle">
              <p>北京 北京市 朝阳区 安定门街道<span>修改</span></p>
              <p>有现货</p>
            </div>
            <div class="nav-choice">
              <h3>选择版本</h3>
              <div class="choice-box">
                <div :class="{'active-box':version==1}" @click="version=1">6GB+64GB 全网通 <span>1699元</span></div>
                <div :class="{'active-box':version==2}" @click="version=2">4GB+64GB 移动4G <span>1449元</span></div>
                <div :class="{'active-box':version==3}" @click="version=3">2GB+64GB 联通4G <span>1249元</span></div>
                <div :class="{'active-box':version==4}" @click="version=4">1GB+64GB 移动4G <span>949元</span></div>
              </div>
              <h3>选择颜色</h3>
              <div class="choice-box">
                <div class="active-box">深空灰</div>
                <div>天空蓝</div>
              </div>
            </div>
            <div class="nav-show">
              <div>
                <span v-if="version == 1">{{product.name}} 6GB+64GB 全网通 深灰色</span>
                <span v-if="version == 2">{{product.name}} 4GB+64GB 移动4G</span>
                <span v-if="version == 3">{{product.name}} 2GB+64GB 联通4G</span>
                <span v-if="version == 4">{{product.name}} 1GB+64GB 移动4G 深灰色</span>
                <span>{{product.price}}</span>
              </div>
              <p>总计: {{product.price}}元</p>
            </div>
            <div class="nav-btn btn-group">
              <button class="btn btn-huge" @click="addCart">加入购物车</button>
              <button class="btn btn-like btn-default">喜欢</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="details-foot">
      <div class="container">
        <header>价格说明</header>
        <div class="foot-bo">
          划线价: 商品展示的划横线价格为参考价，改价格可能是专柜柜台的价格，大家不要看
          这个价格就是真的价格，有可能是假的价格，打架要擦亮眼睛才能看得清楚。我憋的也不想
          多说了，我现在在干嘛？我在打一段字。来适应页面，让底部看起来舒服好看。醉了醉了。还要打
          多少字啊，我不想打了啊。我想剪指甲，指甲长了打的好不舒服。
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import ProductParam from './../components/ProductParam';
import ServiceBar from './../components/ServiceBar';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
  name:'detail',
  components:{ProductParam,ServiceBar,swiper,swiperSlide},
  data(){
    return{
      id:this.$route.params.id,
      version:1,
      imgList:[
        '/imgs/nav-img/nav-1.png','/imgs/nav-img/nav-2.png'
      ],
      product:{},
      swiperOption:{
        autoplay:true,
        loop:true,
        effect:'slide',
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  mounted(){
    this.getProductInfo();
  },
  methods:{
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then( (res) => {
        this.product = res;
      })
    },
    addCart(){
      this.axios.post(`/carts`,{
        productId:this.id,
        selected:true
      }).then( (res = {cartProductVoList:0}) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
        this.$router.push('/cart');
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../assets/scss/button.scss';
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
  .detail{
    .container{
      .details-nav{
        padding-bottom: 50px;
        display: flex;
        .nav-left{
          flex: 1;
          .swiper-container{
            width: 613px;
            padding-bottom: 30px;
            img{
              width: 100%;
              height: 400px;
              margin-top: 90px;
            }
          }
        }
        .nav-right{
          flex: 1;
          .top-txt{
            border-bottom: solid 1px #E5E5E5;
            padding-bottom: 10px;
            h2{
              color: #333;
              font-size: 28px;
              line-height: 60px;
            }
            span{
              font-size: 14px;
              color: #999;
              line-height: 22px;
            }
            p{
              color: $colorA;
              font-size: 16px;
              line-height: 22px;
              &:nth-child(2) {
                font-size: 20px;
              }
              span{
                text-decoration: line-through;
                display: inline-block;
                margin-left: 8px;
              }
            }
          }
          .nav-middle{
            width: 100%;
            height: 108px;
            margin: 28px auto 0 auto;
            background: #FAFAFA;
            border: solid 1px #E5E5E5;
            p{
              position: relative;
              font-size: 14px;
              line-height: 14px;
              color: #666;
              margin: 30px 0 0 64px;
              &:nth-child(1):before{
                content: '';
                @include positionImg(absolute,-5px,560px,20px,22px,'/imgs/icon-loc.png');
              }
              &:nth-child(2) {
                color: $colorA;
              }
              span{
                display: inline-block;
                color: $colorA;
                margin-left: 5px;
              }
            }
          }
          .nav-choice{
            h3{
              color: #333;
              font-size: 18px;
              font-weight: bold;line-height: 60px;
            }
            .choice-box{
              display: flex;
              flex-wrap:wrap;
              // justify-content: space-between;
              div{
                cursor: pointer;
                margin: 5px 10px;
                font-size: 16px;
                line-height: 50px;
                text-align: center;
                min-width: 200px;
                padding: 0 30px;
                border: solid 1px #666;
                color: #666;
                &.active-box{
                  border: solid 1px $colorA;
                  color: $colorA;
                  span{
                    color: #666;
                  }
                }
              }
            }
          }
          .nav-show{
            height: 108px;
            margin: 40px 0 30px 0;
            background: rgba(250,250,250,1);
            div{
              zoom: 1;
              overflow: hidden;
              span{
                display: inline-block;
                font-size: 14px;
                line-height: 60px;
                color: #333;
                margin-left: 30px;
                &:nth-child(1) {
                  float: left;
                }
                &:nth-child(2) {
                  float: right;
                  margin-right: 30px;
                }
              }
            }
            p{
              font-size:24px;
              font-family:PingFang SC;
              font-weight:bold;
              color:$colorA;
              margin: 0px 30px;
            }
          }
        }
      }
    }
    .details-foot{
      background: rgba(243,243,243,1);
      header{
        font-size: 24px;
        line-height: 24px;
        padding: 38px 0 30px 0;
        color: #333;
        font-weight: bold;
      }
      .foot-bo{
        line-height: 30px;
        padding: 30px 40px;
        border: solid 1px #ddd;
        color: #666;
        margin: 0 0 30px 0;
      }
      padding-bottom: 30px;
    }
  }
</style>


