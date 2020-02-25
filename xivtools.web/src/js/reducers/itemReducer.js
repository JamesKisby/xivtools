import * as ACTION_TYPES from "../constants/action-type";


const initialState = {
  item: []
};

function itemReducer(state = initialState, action) {
  if(action.type == ACTION_TYPES.ITEM_SEARCH_SUCCESS) {
    return Object.assign({}, state, {
      item: action.payload
    });
  }
  if(action.type == ACTION_TYPES.ITEM_SEARCH_FAILED) {
    return Object.assign({}, state, {
      item: action.payload
    });
  }
  return state;
};

export default itemReducer;
