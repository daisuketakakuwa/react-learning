import axios from "axios";
import React from "react";
import { fetchPoliciesBegin, fetchPoliciesError, fetchPoliciesSuccess } from "../context/actionCreator";

export const fetchPolicies = async (dispatch: React.Dispatch<ReducerAction>) => {
  fetchPoliciesBegin(dispatch);
  try {
    const { data } = await axios.get("/api/policies");
    fetchPoliciesSuccess(dispatch, data);
  } catch (error: any) {
    fetchPoliciesError(dispatch, "failed to fetch policies.");
  }
};
