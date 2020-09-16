import { map, pathOr, pipe, values } from 'ramda';
import moment from 'moment';
import { SET_DATA } from './currency.mutations';
import { api } from '../../services/api';
import { CURRENCY, PERIODS } from '../../utils/constants';

export const FETCH_DATA = 'fetchData';

const fetchData = async ({ commit }) => {
  const endPeriod = moment();
  const startPeriod = moment().subtract(PERIODS.NINETY, 'days');
  const format = 'YYYY-MM-DD';
  const currenciesQuery = [CURRENCY.PLN, CURRENCY.USD, CURRENCY.GBP].join('+');

  const { data } = await api.get(`/D.${currenciesQuery}.${CURRENCY.EUR}.SP00.A?startPeriod=${startPeriod.format(format)}&endPeriod=${endPeriod.format(format)}`);

  const currencies = pathOr([], ['structure', 'dimensions', 'series', 1, 'values'], data).map(({ id }) => id);
  const times = pathOr([], ['structure', 'dimensions', 'observation', 0, 'values'], data).map(({ id }) => moment(new Date(id)));
  const sets = pipe(
    pathOr({}, ['dataSets', 0, 'series']),
    values,
    map(({ observations }) => map(([value]) => value, observations)),
  )(data);

  commit(SET_DATA, {
    currencies,
    times,
    sets,
  });
};

export default {
  [FETCH_DATA]: fetchData,
};
