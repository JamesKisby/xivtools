import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addArticle } from "../actions/index";


export default function Form(props) {
  const [values, setValues] = useState({title: ""});
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addArticle(values));
    setValues({title: ""});
  }

  const handleChange = (event) => {
    setValues({ [event.target.id]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={values.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">SAVE</button>
    </form>
  );
}
