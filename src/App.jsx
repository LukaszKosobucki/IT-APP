import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LOGIN, SIGN_UP } from "./constants/paths";
import { Provider } from "react-redux";
import store from "./store/config";
import withAuth from "./hoc/withAuth";
import HomePage from "./stacks/HomeStack/HomePage";
import "./firebase/config";


function App() {

  // return (
  //   <Provider store={store}>
  //     <BrowserRouter>
  //       <Switch>
  //         <Route path={LOGIN} />
  //         <Route path={SIGN_UP} component={withAuth(HomePage)} />
  //       </Switch>
  //     </BrowserRouter>
  //   </Provider>
  // );
}

export default App;
