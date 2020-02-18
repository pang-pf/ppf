<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="product-bg" v-for="(item,index) in bgList" :key="index">
      <div class="title-top">
        <p>{{product.name}}</p>
        <p>{{product.subtitle}}</p>
        <p>{{product.price}}</p>
      </div>
      <img :src="item" alt="">
    </div>
    <div class="swiper-box">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in swiperList" :key="index">
          <img :src="item" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div class="swiper-text">
        <p>小米8 AI变焦双摄拍摄</p>
      </div>
    </div>
    <div class="item-video">
      <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
      <p>后置960帧电影版超慢动作视频，奖眨眼的美妙展现的淋漓尽致！<br/>更能AI精准分析视频内容，15个场景只能匹配背景音效</p>
      <div class="video-bg" @click="videoShow = true"></div>
      <div class="video-box">
        <div :class="{'slide':videoShow}" class="overlay"></div>
        <div :class="{'slide':videoShow}" class="video">
          <span class="icon-close" @click="closeVideo"></span>
          <video id="myvideo" src="/imgs/product/video.mp4" muted autoplay="autoplay" controls="controls"></video>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductParam from './../components/ProductParam'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name:'product',
  components:{
    ProductParam,
    swiper,
    swiperSlide
  },
  data(){
    return {
      bgList:['/imgs/product/product-bg-1.png','/imgs/product/product-bg-2.png','/imgs/product/product-bg-3.png'],
      swiperList:['/imgs/product/gallery-2.png','/imgs/product/gallery-3.png','/imgs/product/gallery-4.png','/imgs/product/gallery-5.jpg','/imgs/product/gallery-6.jpg'],
      swiperOption:{
        slidesPerView: 3,
        spaceBetween: 30,
        // slidesPerView: 'auto',
        loop: true,
        // freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        }
      },
      videoShow:false,
      product:{}
    }
  },
  computed:{
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
    this.getProductInfo();
  },
  methods:{
    closeVideo() {
      this.videoShow = false;
      document.getElementById('myvideo').pause();
    },
    getProductInfo(){
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then( (res) => {
        this.product = res;
      })
    },
    buy() {
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../assets/scss/mixin.scss';
.product{
  .h{
    height: 150px;
    text-align: center;
    line-height: 150px;
  }
  .product-bg{
    .title-top{
      position: absolute;
      width: 100%;
      p{
        text-align: center;
        font-size: 30px;
        padding: 10px;
        &:nth-child(1) {
          font-weight: bold;
        }
      }
    }
    img{
      width: 100%;
      border: 1px dashed #333;
    }
    &:nth-child(3){
      display: block;
      margin: 20px auto;
      height:400px;
      width: 1226px;
      img{
        height: 400px;
        width: 1226px;
      }
    }
  }
  .swiper-box{
    position: relative;
    z-index: 1;
    margin: 36px 0;
    height: 356px; 
    .swiper-wrapper{ 
      height: 356px;
      .swiper-slide{
        width: 627px !important;
        height: 356px;
        margin-right: 22px !important;
        img{
          width: 100%;
          height: 356px;
        }
      }
    }
    .swiper-container{
      padding-bottom: 50px;
      .swiper-pagination{
        span{
          width: 27px !important;
          height: 3px !important;
        }
        .swiper-pagination-bullet{
          background: #ccc !important;
        }
        .swiper-pagination-bullet-active {
          background: #666 !important;
        }
      }
    }
    .swiper-text {
      margin: 10px 0;
      text-align: center;
      font-size: 18px;
      color: #333;
      line-height: 42px;
    }
  }
  .item-video{
    height: 1044px;
    margin-bottom: 40px;
    display: block;
    text-align: center;
    color: #fff;
    background: #000;
    margin-top: 130px;
    h2{
      font-weight: bold;
      font-size: 60px;
      line-height: 80px;
      display: inline-block;
      padding: 80px 0 40px 0;
    }
    p{
      font-size: 24px;
      line-height: 36px;
      font-weight: bold;
    }
    .video-bg{
      width: 1226px;
      height: 540px;
      background: url('/imgs/product/gallery-1.png') no-repeat center;
      background-size: contain;
      margin: 40px auto 120px auto;
      border:dashed 1px #fff;
    }
    .video-box{
      .overlay{
        @include position(fixed);
        background: #333;
        opacity: .5;
        z-index:888;
        display: none;
        &.slide{
          display: block;
        }
      }
      .video{
        position: fixed;
        top: -50%;
        left: 50%;
        z-index: 999;
        transform: translate(-50%,-50%);
        width: 1000px;
        height: 526px;
        opacity: 0;
        transition: all .6s;
        &.slide{
          top: 50%;
          opacity: 1;
        }
        video{
          width: 100%;
        }
        .icon-close{
          @include bgImg(20px,20px,'/imgs/icon-close.png');
          position:absolute;
          top: 20px;
          right: 20px;
          cursor: pointer;
          z-index: 889;
        }
      }
    }
  }
}
</style>


