// vuex-action
export default {
  saveUserName(context, username){
    context.commit('saveUserName',username)
  },
  saveCartCount(context, countnum){
    context.commit('saveCartCount', countnum)
  }
}