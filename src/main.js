import Vue from 'vue';
import VueRouter from 'vue-router';

import { CURRENCY } from './utils/constants';
import store from './modules/store';
import App from './app.component.vue';
import Exchange from './routes/exchange/exchange.component.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/pln', component: Exchange, props: { currency: CURRENCY.PLN } },
  { path: '/usd', component: Exchange, props: { currency: CURRENCY.USD } },
  { path: '/gbp', component: Exchange, props: { currency: CURRENCY.GBP } },
  { path: '*' },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

