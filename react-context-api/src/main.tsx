import ReactDOM from "react-dom";
import App from "./App";
import ContextProvider from "./context/ContextProvider";

import "bootstrap/dist/css/bootstrap.min.css";

// React17
ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);

// 以下React18の書き方。\
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   )
