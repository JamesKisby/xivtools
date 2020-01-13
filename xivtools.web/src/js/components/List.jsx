import React from "react";
import { useSelector } from "react-redux";


export default function List() {
  const selector = useSelector(state => state.articles);

  return (
    <ul>
      {selector.map((el, ind) => (
        <li key={ind}>{el.title}</li>
      ))}
    </ul>
  );
}
