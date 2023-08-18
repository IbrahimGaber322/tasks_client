import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

// Create a Redux store with middleware and enhancers
const store = createStore(
  reducers, // Combined reducers
  compose(
    applyMiddleware(thunk) // Apply thunk middleware for async actions
    // Additional enhancers can be added here
  )
);

export default store;
