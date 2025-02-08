import React, { useEffect} from "react";
/**
 * react-reduxでuseSelector/useDispatchが使えるのは7.1.0からだった。
 * 5.0.7 → .7.1.0にあげても、reactとreduxのバージョンはそのままでも
 * 互換性があったので問題なし！
 * https://github.com/reduxjs/react-redux/blob/v7.1.0/package.json#L38-L41
 */
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { fetchEvents, fetchEventsWithSteps } from "../../store/ducks/events";

const EventLayoutWithHooks = (props) => {

    // Storeから状態を取得
    const events = useSelector((state) => state.events.events);
    const errorMessage = useSelector((state) => state.events.errorMessage);
    const isLoading = useSelector((state) => state.events.isLoading);

    // Dispatcherの取得
    const dispatch = useDispatch();

    // マウント時に非同期でデータ取得
    useEffect(() => {
        dispatch(fetchEventsWithSteps())
    }, [])
  
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
        {props.children}
      </div>
    );
  };
  
  export default EventLayoutWithHooks;
  