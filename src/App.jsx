import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LOGIN } from "./constants/paths";
import { Provider } from "react-redux";
import store from "./store/config";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={LOGIN} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
