import Vue from 'vue'
import App from './App.vue'
import router from './route';
import store from './store';
Vue.config.productionTip = false
setTimeout(()=>{
  store.state.counter++
},2000)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
