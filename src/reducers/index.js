import {combineReducers} from 'redux';
import countReducer from './reducer.js';
const allReducers= combineReducers({
  listData: countReducer,
});
export default allReducers;