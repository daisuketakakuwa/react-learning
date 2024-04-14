import "components/App.scss";
import React from "react";
import { browserHistory, IndexRoute, Route, Router } from "react-router";
import AboutPage from "../pages/AboutPage";
import EventDetailPage from "../pages/EventDetailPage";
import EventLayout from "../pages/EventLayout";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        {/* 👉Nestする側のcomponentはLayoutの役割をなす -> this.props.childrenを定義すること */}
        <Route path="/" component={Layout}>
          <IndexRoute component={HomePage} />
          <Route path="/about" component={AboutPage} />
          {/* 👉Nestする側のcomponentはLayoutの役割をなす -> this.props.childrenを定義すること */}
          <Route path="/event" component={EventLayout}>
            <IndexRoute component={() => <div>※EVENTを選択してね</div>} />
            <Route path="/event/:eventId" component={EventDetailPage} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default App;
