import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { metamaskReducer } from "./metamask/metamaskReducer";

const rootReducer = combineReducers({
  metamask: metamaskReducer,
});

const middlewares = [thunk];

const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(rootReducer, composedEnhancer);

export { store };
