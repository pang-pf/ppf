<template>
  <div id="app">
    <router-view>
      <index></index>
    </router-view>
  </div>
</template>

<script>
import index from './pages/index'
// import axios from 'axios'
// import jsonp from 'jsonp'

export default {
  name: 'app',
  components: {
    index
  },
  data (){
    return {
      
    }
  },
  mounted (){
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
