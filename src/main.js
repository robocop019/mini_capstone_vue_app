import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = "https://floating-ravine-17980.herokuapp.com";
  // process.env.NODE_ENV === "development" ? "https://floating-ravine-17980.herokuapp.com" : "/";

  
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
