import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LOGIN } from "./constants/paths";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOGIN} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
