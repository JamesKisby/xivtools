import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../actions/index";


export default function Post() {
  const selector = useSelector(state => state.remoteArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <ul>
      {selector.map(el => (
        <li key={el.id}>{el.bnpcname}</li>
      ))}
    </ul>
  );
}
