import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';

import { Toast } from 'vant';
import { Area } from 'vant';
import { Lazyload } from 'vant';
import { Dialog } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import '@/css/index.css';

// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Area);
Vue.use(Vant);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app');
