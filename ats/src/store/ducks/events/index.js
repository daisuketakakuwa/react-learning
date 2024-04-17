import axios from "axios";
import { steps } from "redux-effects-steps";
import { extractTypeFromAction } from "store/utils";
import { AXIOS_ACTION } from "store/middleware/axiosMiddleware";

// actions
export const FETCH_EVENTS_BEGIN = "FETCH_EVENTS_BEGIN";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR";

// actionCreators
const fetchEventsBegin = () => {
  console.log("FETCH_EVENTS_BEGIN");
  return {
    type: FETCH_EVENTS_BEGIN,
  };
};

const fetchEventsSuccess = (action) => {
  console.log("FETCH_EVENTS_SUCCESS");
  console.log(action);
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: { events: action.payload.data.events },
  };
};

const fetchEventsError = (action) => {
  console.log("FETCH_EVENTS_ERROR");
  return {
    type: FETCH_EVENTS_ERROR,
    payload: { errorMessge: "Event一覧取得に失敗しました。" },
  };
};

// steps 使わないパターン
// 👉Promiseチェーンで処理の同期をとる
export const fetchEvents = (dispatch) => {
  dispatch(fetchEventsBegin());
  return axios.get("/api/events").then(
    (result) => {
      dispatch(fetchEventsSuccess(result.data));
    },
    () => {
      dispatch(fetchEventsError());
    }
  );
};

// steps 使うパターン
export const fetchEventsWithSteps = () =>
  steps(
    fetchEventsBegin(),
    // ★reduxでは 非同期処理(Promise)は middlewareへ委譲/処理させる👍
    //  -> なので、ここでは「APIリクエストします」っていう純粋なActionを投げる
    { type: AXIOS_ACTION, payload: { method: "get", url: "/api/events" } },
    [fetchEventsSuccess, fetchEventsError]
  );

// 各reducerの初期値は 各々でモジュールで設定
const INITIAL_STATE = {
  events: [],
  isLoading: false,
  errorMessage: "",
};

// reducers
const reducers = (state = INITIAL_STATE, action) => {
  // react-effect-steps を使うと
  // {
  //   type: "EFFECT_STEPS",
  //   payload: "FETCH_EVENTS_BEGIN"
  // }
  // となるから、typeの抽出を行う必要がある。
  const type = extractTypeFromAction(action);

  // console.log(action);
  // console.log(state);
  // console.log(`target type: ${type}`);
  // console.log("------------");
  switch (type) {
    case FETCH_EVENTS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        isLoading: false,
      };
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        events: [],
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducers;
