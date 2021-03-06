import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userDetails from "./reducers/userDetails";

const rootReducers = combineReducers({
  uDetails: userDetails,
});

//Middleware of Redux when you want ti update data
const logger = (store) => {
  return (next) => {
    return (action) => {
      // console.log("[Middleware] dispatching", action);
      const result = next(action);
      // console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};
//Lecture 284 and 285 for more derails in composeEnhancers and logger
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(logger, thunk)),
);
export default store;
