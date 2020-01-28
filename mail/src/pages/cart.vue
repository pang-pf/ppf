<template>
  <div>
    <order-header></order-header>
    cart
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
  name:'cart'
}
</script>
<style lang="sass" scoped>

</style>


