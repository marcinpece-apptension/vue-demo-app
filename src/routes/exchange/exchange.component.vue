<template>
  <Container v-if="getData">
    <ExchangeTitle>
      <TitleBase>{{ CURRENCY_SYMBOLS.EUR }}</TitleBase>
      <TitleTarget>{{ currency }}</TitleTarget>
    </ExchangeTitle>
    <Chart>
      <svg width="600" height="400">
        <defs>
          <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:var(--bg-color);stop-opacity:0.5" />
            <stop offset="80%" style="stop-color:var(--bg-color);stop-opacity:0" />
          </linearGradient>
        </defs>
        <g transform="translate(30, 0)">
          <circle :r="radius" :cx="radius" :cy="radius" fill="var(--active-color)"/>
          <g>
            <path :d="path" stroke="var(--bg-color)" stroke-width="2" fill="transparent"/>
            <path :d="areaPath" fill="url(#chart-gradient)" />
          </g>
          <g transform="translate(35, 50)">
            <LegendLine x1="5" x2="25" />
            <LegendLabel>{{ max }}</LegendLabel>
          </g>
          <g transform="translate(35, 350)">
            <LegendLine x1="5" x2="25" />
            <LegendLabel>{{ min }}</LegendLabel>
          </g>
          <g :transform="`translate(410, ${currentY})`">
            <LegendLine x1="0" x2="20" />
            <CurrentValueLabel transform="translate(25, 0)">
              {{ currentValue }}
              <CurrencyLabel>{{ currency }}</CurrencyLabel>
            </CurrentValueLabel>
          </g>
        </g>
      </svg>
    </Chart>
    <FilterList>
      Show last
      <FilterItem
        v-for="period in periods"
        :key="period"
        :isActive="isActiveFilter(period)"
        @click="setPeriod(period)"
        >
          {{ period }} days
        </FilterItem>
    </FilterList>
  </Container>
</template>

<script>
import { equals, findIndex, identity, last, pathOr, times, takeLast } from 'ramda';
import { mapGetters, mapMutations } from 'vuex';
import { scaleLinear, scalePoint } from 'd3-scale';
import { area, line } from 'd3-shape';

import { PREFIX as CURRENCY } from '../../modules/currency';
import { CURRENCY as CURRENCY_SYMBOLS, PERIODS } from '../../utils/constants';
import { GET_DATA, GET_PERIOD } from '../../modules/currency/currency.getters';
import { SET_PERIOD } from '../../modules/currency/currency.mutations';
import {
  Container,
  Title as ExchangeTitle,
  Chart,
  TitleBase,
  TitleTarget,
  LegendLabel,
  LegendLine,
  CurrentValueLabel,
  CurrencyLabel,
  FilterList,
  FilterItem
} from './exchange.styles';

export default {
  components: {
    Container,
    ExchangeTitle,
    Chart,
    TitleBase,
    TitleTarget,
    LegendLabel,
    LegendLine,
    CurrentValueLabel,
    CurrencyLabel,
    FilterList,
    FilterItem
  },
  props: {
    currency: { type: String, default: '' },
  },
  data() {
    return {
      CURRENCY_SYMBOLS,
      periods: Object.values(PERIODS).reverse(),
      radius: 200,
    };
  },
  computed: {
    ...mapGetters(CURRENCY, [GET_DATA, GET_PERIOD]),
    currencyIndex() {
      return findIndex(equals(this.currency), pathOr([], [GET_DATA, 'currencies'], this));
    },
    list() {
      const list = Object.values(pathOr({}, [GET_DATA, 'sets', this.currencyIndex], this));

      return takeLast(this[GET_PERIOD], list);
    },
    min() {
      const value = Math.ceil(Math.min(Infinity, ...this.list) * 0.99 * 100) / 100;

      return value;
    },
    max() {
      const value = Math.floor(Math.max(-Infinity, ...this.list) * 1.01 * 100) / 100;

      return value;
    },
    xScale() {
      return scalePoint()
        .domain(times(identity, this.list.length))
        .range([0, 400]);
    },
    yScale() {
      return scaleLinear()
        .domain([this.min, this.max])
        .range([350, 50]);
    },
    currentValue() {
      const value = last(this.list) || 0;

      return Math.round(value * 1000) / 1000;
    },
    currentY() {
      return this.yScale(this.currentValue);
    },
    path() {
      const lineFunction = line()
        .x((value, index) => this.xScale(index))
        .y(value => this.yScale(value))

      return  lineFunction(this.list);
    },
    areaPath() {
      const areaFunction = area()
        .x((value, index) => this.xScale(index))
        .y0(this.yScale(this.min))
        .y1(value => this.yScale(value));

      return areaFunction(this.list);
    },
  },
  methods: {
    isActiveFilter(period) {
      return period === this[GET_PERIOD];
    },
    ...mapMutations(CURRENCY, [SET_PERIOD]),
  }
};
</script>