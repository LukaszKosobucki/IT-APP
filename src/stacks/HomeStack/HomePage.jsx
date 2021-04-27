import React from "react";

import Calendar from "../../components/Calendar";

import "./css/HomePage.css"

class HomePage extends React.Component {
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
