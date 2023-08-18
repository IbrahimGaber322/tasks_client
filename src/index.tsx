import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

// Get the root container element from the DOM
const container = document.getElementById("root") as Element;

// Create a React root with concurrent mode rendering
const appRoot = ReactDOMClient.createRoot(container);

// Render the main App component wrapped in the Redux Provider
appRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
