type Policy = {
  policyNo: string;
  holderName: string;
  gender: string;
};

// Contextで状態管理するデータ
type ContextState = {
  isLoading: boolean;
  policies: Policy[];
  selectedPolicies: Policy[];
};

type ReducerAction = {
  type: string;
  payload?: any;
};

// Contextに登録するオブジェクトの型(useReducerの戻り値)
type DataStoreContext = {
  state: ContextState;
  dispatch: React.Dispatch<ReducerAction>;
};
