<template>
  <div id="app">
    <Container>
      <Navigation>
        <router-link to="/pln">{{ CURRENCY_SYMBOLS.PLN }}</router-link>
        <router-link to="/usd">{{ CURRENCY_SYMBOLS.USD }}</router-link>
        <router-link to="/gbp">{{ CURRENCY_SYMBOLS.GBP }}</router-link>
      </Navigation>
      <Content>
        <router-view></router-view>
      </Content>
    </Container>
  </div>
</template>

<script>
import { isNil } from 'ramda';
import { mapActions, mapGetters } from 'vuex';/*, mapGetters, mapMutations } from 'vuex'; */
import { PREFIX as CURRENCY } from './modules/currency';
import { CURRENCY as CURRENCY_SYMBOLS } from './utils/constants';
import { FETCH_DATA } from './modules/currency/currency.actions';
import { GET_DATA } from './modules/currency/currency.getters';
import { Navigation, Content, Container } from './app.styles';

export default {
  name: 'App',
  components: {
    Container, Navigation, Content,
  },
  data() {
    return {
      CURRENCY_SYMBOLS,
    };
  },
  methods: {
    ...mapActions(CURRENCY, [FETCH_DATA]),
  },
  computed: {
    ...mapGetters(CURRENCY, [GET_DATA]),
  },
  created() {
    if (isNil(this[GET_DATA])) {
      this[FETCH_DATA]();
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600&family=Roboto:wght@700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Rajdhani', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
