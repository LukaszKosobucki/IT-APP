import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import {
  LOGIN,
  LOST_PASS,
  SIGN_UP,
  EVENT,
  EVENT_EDIT,
  MY_EVENTS,
  MY_TEAMS,
  MY_ACCOUNT,
  USER,
  TEAM,
  ABOUT,
  SEARCH,
  HOME,
  EDIT_ACCOUNT,
  SUCCESS,
  FAILURE
  EVENT_ADD,
  TEAM_ADD,
  TEAM_EDIT,
} from "./constants/paths";
import { Provider } from "react-redux";
import store from "./store/config";
import withAuth from "./hoc/withAuth";
import withLayout from "./hoc/withLayout";
import HomePage from "./stacks/HomeStack/HomePage";
import LoginPage from "./stacks/LoginStack/LoginPage";
import LostPasswordPage from "./stacks/LoginStack/LostPasswordStack";
import SignUpPage from "./stacks/LoginStack/SingUpStack";
import EventPage from "./stacks/EventStack/EventPage";
import EventEditPage from "./stacks/EventStack/EventEditPage";
import MyEventsPage from "./stacks/MyEventsStack/MyEventsPage";
import MyTeamsPage from "./stacks/MyTeamsStack/MyTeamsPage";
import UserPage from "./stacks/UserStack/UserPage";
import TeamPage from "./stacks/TeamStack/TeamPage";
import AboutPage from "./stacks/AboutStack/AboutPage";
import SearchPage from "./stacks/SearchStack/SearchPage";
import AccountPage from "./stacks/AccountStack/AccountPage";
import AccountEdit from "./stacks/AccountStack/AccountEdit";
import SuccessPage from "./components/shared/Informative/SuccessPage";
import FailurePage from "./components/shared/Informative/FailurePage";

import "./firebase/config";
import AuthService from "./service/authService";
import TeamEditPage from "./stacks/TeamStack/TeamEditPage";

function App() {
  return (
    <Provider store={store}>

      <AuthService>
        <BrowserRouter>
          <Switch>
            <Route path={LOGIN} component={LoginPage} />
            <Route path={SIGN_UP} component={SignUpPage} />
            <Route path={EVENT(":eventId")} component={withLayout(EventPage)} />
            <Route path={EVENT_ADD} component={withLayout(EventEditPage)} />
            <Route
              path={EVENT_EDIT(":eventId")}
              component={withLayout(EventEditPage)}
            />
            <Route path={MY_EVENTS} component={withLayout(MyEventsPage)} />
            <Route path={MY_TEAMS} component={withLayout(MyTeamsPage)} />
            <Route path={MY_ACCOUNT} component={withLayout(AccountPage)} />
            <Route path={EDIT_ACCOUNT} component={withLayout(AccountEdit)} />
            <Route path={USER(":userId")} component={withLayout(UserPage)} />
            <Route path={TEAM_ADD} component={withLayout(TeamEditPage)} />
            <Route
              path={TEAM_EDIT(":teamId")}
              component={withLayout(TeamEditPage)}
            />
            <Route path={TEAM(":teamId")} component={withLayout(TeamPage)} />
            <Route path={ABOUT} component={withLayout(AboutPage)} />
            <Route path={SEARCH} component={withLayout(SearchPage)} />
            <Route exact path={HOME} component={withLayout(HomePage)} />
            <Route path={LOST_PASS} component={LostPasswordPage} />
            <Route path={SUCCESS} component={withLayout(SuccessPage)} />
            <Route path={FAILURE} component={withLayout(FailurePage)} />
            <Redirect to={HOME} />
          </Switch>
        </BrowserRouter>
      </AuthService>
    </Provider>
  );
}

export default App;
