import React from "react";

export const UPDATE_APP_STATE = "UPDATE_APP_STATE";
export const FETCH_POLICIES_BEGIN = "FETCH_POLICIES_BEGIN";
export const FETCH_POLICIES_SUCCESS = "FETCH_POLICIES_SUCCESS";
export const FETCH_POLICIES_ERROR = "FETCH_POLICIES_ERROR";

export const updateAppState = (dispatch: React.Dispatch<ReducerAction>, propertyName: string, propertyNewValue: any) => {
  dispatch({
    type: UPDATE_APP_STATE,
    payload: {
      propertyName,
      propertyNewValue,
    },
  });
};

export const fetchPoliciesBegin = (dispatch: React.Dispatch<ReducerAction>) => {
  dispatch({ type: FETCH_POLICIES_BEGIN });
};

export const fetchPoliciesSuccess = (dispatch: React.Dispatch<ReducerAction>, policies: Policy[]) => {
  dispatch({ type: FETCH_POLICIES_SUCCESS, payload: { policies } });
};

export const fetchPoliciesError = (dispatch: React.Dispatch<ReducerAction>, errorMsg: string) => {
  dispatch({ type: FETCH_POLICIES_ERROR, payload: { errorMsg } });
};
