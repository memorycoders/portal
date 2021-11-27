import {
  LIST_PRODUCT_ADD,
  LIST_PRODUCT_EDIT,
  LIST_PRODUCT_DEL,
} from "src/constants";
import { PRODUCT_SAGA_TYPES } from "src/constants";
const initialState = [];

export default function listproduct(state = initialState, action) {
  switch (action.type) {
    case LIST_PRODUCT_ADD:
    case PRODUCT_SAGA_TYPES.ADD_PRODUCT_SUCCESS:
      return [...state, action.item];
    case PRODUCT_SAGA_TYPES.LIST_PRODUCT_SUCCESS:
      return action.res;
    case LIST_PRODUCT_EDIT:
      return state.map((stateItem) => {
        if (stateItem.id === action.index) {
          return action.item;
        } else {
          return stateItem;
        }
      });
    case LIST_PRODUCT_DEL:
      return state.filter((item) => item.id !== action.index);
    default:
      return state;
  }
}
