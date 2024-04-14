import React from "react";

class EventDetailPage extends React.Component {
  render() {
    return (
      <div>
        <h1>EventID: {this.props.params.eventId}</h1>
      </div>
    );
  }
}

export default EventDetailPage;
