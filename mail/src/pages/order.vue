<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <order-footer></order-footer>
  </div>
</template>
<script>
// import OrderHeader from './../components/orderHeader'
import ServiceBar from './../components/ServiceBar'
import OrderFooter from './../components/OrderFooter'
export default {
  components:{
    // OrderHeader,
    OrderFooter,
    ServiceBar
  },
  name:'order',
  data(){
    return {
      title:'',
      tip:''
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped>

</style>


