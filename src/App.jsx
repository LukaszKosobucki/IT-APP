import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LOGIN, LOST_PASS, SIGN_UP } from "./constants/paths";
import { Provider } from "react-redux";
import store from "./store/config";
import withAuth from "./hoc/withAuth";
import HomePage from "./stacks/HomeStack/HomePage";
import "./firebase/config";
import LoginPage from "./stacks/LoginStack/LoginPage";
import LostPasswordPage from "./stacks/LoginStack/LostPasswordStack";
import SignUpPage from "./stacks/LoginStack/SingUpStack";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={LOGIN} component={LoginPage}/>
          <Route path={SIGN_UP} component={SignUpPage} />
          <Route path={LOST_PASS} component={LostPasswordPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
