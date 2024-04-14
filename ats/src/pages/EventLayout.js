import React from "react";
import { Link, browserHistory } from "react-router";

class EventLayout extends React.Component {
  render() {
    return (
      <div>
        {/* historyは browserHistoryをimportしてそのまま使うでOK👍 */}
        <p onClick={() => browserHistory.push("/event/1")}>Event1</p>
        <p>
          <Link to="/event/2">Event2</Link>
        </p>
        <p>
          <Link to="/event/3">Event3</Link>
        </p>
        {this.props.children}
      </div>
    );
  }
}

export default EventLayout;
