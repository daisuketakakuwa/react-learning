import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { compose, lifecycle } from "recompose";
import { fetchEvents, fetchEventsWithSteps } from "../../store/ducks/events";

const enhancer = compose(
  // storeとconnectする
  connect(
    // args1 mapStateToProps
    (state) => ({
      events: state.events.events,
      errorMessage: state.events.errorMessage,
      isLoading: state.events.isLoading,
    }),
    // args2 mapDispatchToProps
    (dispatch) => ({
      fetchEvents: () => fetchEvents(dispatch),
      fetchEventsWithSteps: () => dispatch(fetchEventsWithSteps()),
    })
  ),
  lifecycle({
    componentDidMount() {
      // this.props.fetchEvents();
      this.props.fetchEventsWithSteps();
    },
  })
);

const EventLayout = (props) => {
  const { children, events, errorMessage, isLoading } = props;

  return (
    <div>
      <h1>Events</h1>
      <h2>LOADING NOW? : {isLoading ? "YES" : "NO"}</h2>
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
