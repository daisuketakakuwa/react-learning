import React from "react";

// このComponentで、Event詳細取得APIを呼ぶ
// ・componentDidMountで
// ・mapProp内で編集

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
