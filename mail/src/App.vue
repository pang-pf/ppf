<template>
  <div id="app">
    <router-view>
      <index></index>
    </router-view>
  </div>
</template>

<script>
import index from './pages/index'
// import storage from './storage/index.js'
// import axios from 'axios'
// import jsonp from 'jsonp'

export default {
  name: 'app',
  components: {
    index
  },
  data (){
    return {
      res:{}
    }
  },
  mounted (){
    this.getUsers();
    this.getCartCount();
    // this.axios.get('/user/login').then((res) => {
    //   this.res = res;
    // })
    // storage.setItem('a',1);
    // storage.setItem('user',{a:1})
    // storage.setItem('abc',{a:1},'user');
    // storage.clear('a','user');
  },
  methods:{
    getUsers(){
      this.axios.get('/user').then((res) => {
        // to-do 保存到vuex里面
        this.$store.dispatch('saveUserName', res.username);
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res) => {
        // to-do 保存到vuex里面
        this.$store.dispatch('saveCartCount', res);
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/button.scss';
</style>
