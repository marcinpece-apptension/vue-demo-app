import { prop } from 'ramda';

export const GET_DATA = 'getData';
export const GET_PERIOD = 'getPeriod';

const getData = prop('data');
const getPeriod = prop('period');

export default {
  [GET_DATA]: getData,
  [GET_PERIOD]: getPeriod,
};
