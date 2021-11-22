import * as actionTypes from "../actions/actionsTypes";
import { updatedObject } from "../utility";
const initialState = {
  access_token: "",
  userId: "",
  userName: "",
  isAuthenticate: false,
};

const clearState = (state) => {
  sessionStorage.clear();
  return updatedObject(state, {
    access_token: "",
    userId: "",
    userName: "",
    isAuthenticate: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_VALIDATE: {
     
      if (action.isAuthenticate === true) {
        return updatedObject(state, {
          access_token: action.access_token,
          userId: action.userId,
          userName: action.userName,
          isAuthenticate: true,
        });
      } else {
        return clearState(state);
      }
    }
    case actionTypes.PORTAL_LOGOUT: {
      return clearState(state);
    }
    default:
      return state;
  }
};

export default reducer;
