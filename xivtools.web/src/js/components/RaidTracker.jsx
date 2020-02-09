import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRaidData } from "../actions/index";
import "../../css/App.css";


export default function RaidTracker({ match }) {
  const selector = useSelector(state => state.raidData);
  const dispatch = useDispatch();
  console.log("SELECTOR")
  console.log(selector);
  useEffect(() => {
    dispatch(getRaidData(match.params.userid));
  }, []);

  return (
    <div id="menu" className="row">
      <div className="col-12">
        <h2>RAID TRACKER</h2>
      </div>

          {selector.map(el => (
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th colspan="5" scope="col">{el[0].playername}</th>
                </tr>
              </thead>
              <tbody>
                {el.map(i => (
                  <tr>
                    <td className="col-sm-2"><img className="icon title-icon-border" src={i.icons} /></td>
                    <td className="col-sm-4">{i.itemnames}</td>
                    <td className="col-sm-3">Week 1</td>
                    <td className="col-sm-2">Amount:</td>
                    <td className="col-sm-1">{i.itemquantities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}

    </div>
  );
}
