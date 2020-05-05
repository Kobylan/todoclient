import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store";
import Todo from "./todo";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Todo />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
