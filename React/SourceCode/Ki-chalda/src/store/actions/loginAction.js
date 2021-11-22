import * as actionTypes from "./actionsTypes";
import axios from "../../serviceCall/axiosEdusoft";

export const login_validate = (
  access_token,
  userId,
  userName,
  isAuthenticate
) => {
  console.log("[Action Type value is dispatchng]");
  return {
    type: actionTypes.LOGIN_VALIDATE,
    access_token: access_token,
    userId: userId,
    userName: userName,
    isAuthenticate: isAuthenticate,
  };
};

export const portal_logout = () => {
  return {
    type: actionTypes.PORTAL_LOGOUT,
  };
};

export const validate_session = (sessionId) => {
  return (dispatch) => {
    axios
      .get(
        "home/EduHome/SessionValidation?SessionId=" +
          encodeURI(sessionId) +
          "&Source=development"
      )
      .then((response) => {
       // console.log("Rwvalidation", response);
        if (response.status === 200) {
          //  console.log("Login Response", response);
          const respData = response.data.response;
          if (respData.statusCode === 200) {
            let userDetails = respData.data.map((details) => {
              return { ...details };
            });
            let userDetailsData = { ...userDetails[0] };
            if (userDetailsData.isValidate) {
              sessionStorage.setItem("sessionId", userDetailsData.sessionId);
              dispatch(
                login_validate(
                  response.data.jsonToken,
                  userDetailsData.userId,
                  userDetailsData.name,
                  true
                )
              );
            } else {
              dispatch(portal_logout());
            }
          } else {
            dispatch(portal_logout());
          }
        } else {
          dispatch(portal_logout());
        }
      })
      .catch((err) => {
        dispatch(portal_logout());
      });
  };
};
