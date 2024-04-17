import axios from "axios";
import { extractTypeFromAction } from "store/utils";

export const AXIOS_ACTION = "AXIOS_ACTION";

const axiosMiddleware = () => {
  // 引数 next: Dispatch
  // 返値 Dispatch = (action: A) => A

  // 👉「actionを返す関数」を返す必要がある
  return (next) => (action) => {
    const type = extractTypeFromAction(action);
    // そのままreducerにDispatch(next)で横流し
    if (type !== AXIOS_ACTION) return next(action);

    // axiosで呼び出した結果をreducerにdispatchする
    const request = action.payload;
    return axios(request)
      .then((res) => {
        return next({ ...action, payload: res });
      })
      .catch((err) => {
        // TODO エラーメッセージ
        return next({ ...action });
      });
  };
};

export default axiosMiddleware;
