// 商城vuex-mutations
export default {
  saveUserName(state, username){
    state.userName = username;
  },
  saveCartCount(state, countnum){
    state.cartCount = countnum;
  }
}