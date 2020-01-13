import React from "react";
import List from "./List";
import Form from "./Form";
import Post from "./Posts";
import "../../css/App.css";


const App = () => (
  <div id="menu" className="row">
    <div className="col-sm">
      <h2>Add a new article</h2>
      <Form />
    </div>
    <div className="col-sm">
      <h2>Articles</h2>
      <List />
    </div>
    <div className="col-sm">
      <h2>API Posts</h2>
      <Post />
    </div>
  </div>
);

export default App;
