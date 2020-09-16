export const SET_DATA = 'setData';
export const SET_PERIOD = 'setPeriod';

const setData = (state, data) => {
  state.data = data;
};

const setPeriod = (state, period) => {
  state.period = period;
};

export default {
  [SET_DATA]: setData,
  [SET_PERIOD]: setPeriod,
};
