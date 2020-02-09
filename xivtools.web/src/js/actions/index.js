import { ADD_ARTICLE, DATA_REQUESTED, RAID_DATA_REQUESTED } from "../constants/action-type";

export function addArticle(payload) {
  return {type: ADD_ARTICLE, payload}
};

export function getData() {
  console.log("IN GETDATA");
  return {type: DATA_REQUESTED}
};

export function getRaidData(userid) {
  console.log("IN GETRAIDDATA");
  return {type: RAID_DATA_REQUESTED, userid}
}
