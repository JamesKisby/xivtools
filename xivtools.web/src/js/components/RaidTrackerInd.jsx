import React from "react";


export default function RaidTracker({ name, el }) {

  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th colSpan="5" scope="col">{name}</th>
        </tr>
      </thead>
      <tbody>
        {el.map((i, ind) => (
          <tr key={ind}>
            <td className="col-sm-2"><img className="icon title-icon-border" src={i.icons} /></td>
            <td className="col-sm-4">{i.itemnames}</td>
            <td className="col-sm-3">Week 1</td>
            <td className="col-sm-2">Amount:</td>
            <td className="col-sm-1">{i.itemquantities}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
