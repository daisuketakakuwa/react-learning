import { FETCH_POLICIES_BEGIN, FETCH_POLICIES_ERROR, FETCH_POLICIES_SUCCESS, UPDATE_APP_STATE } from "./actionCreator";

const reducer = (state: ContextState, action: ReducerAction) => {
  switch (action.type) {
    case UPDATE_APP_STATE:
      return {
        ...state,
        [action.payload.propertyName]: action.payload.propertyNewValue,
      };
    case FETCH_POLICIES_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POLICIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        policies: action.payload.policies,
      };
    case FETCH_POLICIES_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default reducer;
