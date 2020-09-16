import getters from './currency.getters';
import mutations from './currency.mutations';
import actions from './currency.actions';

import { PERIODS } from '../../utils/constants';

export const PREFIX = 'currency';

const initialState = () => ({
  data: null,
  period: PERIODS.NINETY,
});

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
