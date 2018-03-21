import { combineReducers } from 'redux';
import * as ducks from '../ducks';
import { APP_STATE_NAMESPACE } from '../ducks/root';

const reduceDucks = (accumulator, duck) => ({ ...accumulator, ...duck.reducer });
export const ducksReducers = Object.keys(ducks)
  .map(key => ducks[key])
  .reduce(reduceDucks, {});
const combinedDucksReducers = combineReducers(ducksReducers);

export default { [APP_STATE_NAMESPACE]: combinedDucksReducers };
