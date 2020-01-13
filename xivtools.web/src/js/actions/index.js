import { ADD_ARTICLE, DATA_REQUESTED } from "../constants/action-type";

export function addArticle(payload) {
  return {type: ADD_ARTICLE, payload}
};

export function getData() {
  return {type: DATA_REQUESTED}
};
