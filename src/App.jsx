import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  LOGIN,
  LOST_PASS,
  SIGN_UP,
  EVENT,
  EVENT_EDIT,
  MY_EVENTS,
  USER,
  TEAM,
  ABOUT,
  SEARCH,
  HOME,
} from "./constants/paths";
import { Provider } from "react-redux";
import store from "./store/config";
import withAuth from "./hoc/withAuth";
import HomePage from "./stacks/HomeStack/HomePage";
import LoginPage from "./stacks/LoginStack/LoginPage";
import LostPasswordPage from "./stacks/LoginStack/LostPasswordStack";
import SignUpPage from "./stacks/LoginStack/SingUpStack";
import EventPage from "./stacks/EventStack/EventPage";
import EventEditPage from "./stacks/EventStack/EventEditPage";
import MyEventsPage from "./stacks/MyEventsStack/MyEventsPage";
import UserPage from "./stacks/UserStack/UserPage";
import TeamPage from "./stacks/TeamStack/TeamPage";
import AboutPage from "./stacks/AboutStack/AboutPage";
import SearchPage from "./stacks/SearchStack/SearchPage";

import "./firebase/config";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={LOGIN} component={LoginPage} />
          <Route path={SIGN_UP} component={SignUpPage} />
          <Route path={EVENT} component={EventPage} />
          <Route path={EVENT_EDIT} component={withAuth(EventEditPage)} />
          <Route path={MY_EVENTS} component={withAuth(MyEventsPage)} />
          <Route path={USER} component={UserPage} />
          <Route path={TEAM} component={TeamPage} />
          <Route path={ABOUT} component={AboutPage} />
          <Route path={SEARCH} component={SearchPage} />
          <Route exact path={HOME} component={HomePage} />
          <Route path={LOST_PASS} component={LostPasswordPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
