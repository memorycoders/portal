import { combineReducers } from 'redux';
import listProductReducer from './form/reducer';

const rootReducer = combineReducers({
    listProduct:listProductReducer
});

export default rootReducer;