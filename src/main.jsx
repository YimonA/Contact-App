import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { StateContextProvider } from "./context/stateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </StateContextProvider>
);
