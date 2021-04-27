import React from "react";

import Calendar from "../../components/Calendar";

import "./css/HomePage.css"
import { getEvents} from "./action/events"

class HomePage extends React.Component {
    state={
        events: []
    }

    componentDidMount() {
        const events = getEvents();
        this.setState({
          events: events,
        });
    }

  render() {
    return (
      <div className="HomePage">
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default HomePage;
