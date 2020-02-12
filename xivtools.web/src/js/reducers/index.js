import { ADD_ARTICLE,DATA_LOADED,API_ERRORED,RAID_DATA_LOADED } from "../constants/action-type";


const initialState = {
  articles: [],
  remoteArticles: [],
  raidData: []
};

function rootReducer(state = initialState, action) {
  if(action.type == ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if(action.type == DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }
  if(action.type == RAID_DATA_LOADED) {
    return Object.assign({}, state, {
      raidData: action.payload
    });
  }
  if(action.type == API_ERRORED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat({title: "FAIL",id: "0"})
    });
  }
  return state;
};

export default rootReducer;
