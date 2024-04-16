import React from "react";
import { Link, browserHistory } from "react-router";
import { compose, lifecycle, withStateHandlers } from "recompose";

// このComponentで、Event一覧取得APIを呼ぶ
// ・Promiseを返す関数を用意
// ・componentDidMountでコール
// ・mapProp内で編集

const fetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        data: {
          events: [
            { id: 1, name: "Event1", date: "2024/01/01" },
            { id: 2, name: "Event2", date: "2024/01/02" },
            { id: 3, name: "Event3", date: "2024/01/03" },
          ],
        },
      });
    }, 1000);
  });
};

const enhancer = compose(
  withStateHandlers(
    { events: [] },
    {
      setEvents: (state) => (events) => ({
        ...state,
        events,
      }),
    }
  ),
  lifecycle({
    // Mount時にEvent一覧取得APIコール
    componentDidMount() {
      fetchEvents().then((r) => {
        this.props.setEvents(r.data.events);
      });
    },
  })
);

const EventLayout = (props) => {
  const { events, children } = props;

  return (
    <div>
      <h1>Events</h1>
      {events.map((e) => (
        <p key={e.id}>
          <Link to={`/event/${e.id}`}>{`${e.name}@${e.date}`}</Link>
        </p>
      ))}
      <br />
      {children}
    </div>
  );
};

export default enhancer(EventLayout);
