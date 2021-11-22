import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions/index";
import * as CurrentUser from "../../lib/Helper";
import axios from "../../serviceCall/axiosEdusoft";

// import store from "../../store/store";

const requireAuthentication = (Component) => {
  class AuthenticatedComponent extends React.Component {
    state = {
      isAuthenticated: false,
      loading: true,
    };
    componentDidMount() {
      let isAuth = CurrentUser.isAuthenticate();
      if (isAuth === true) {
        this.setState({ isAuthenticated: true, loading: false });
      } else {
        const sessionId = sessionStorage.getItem("sessionId");
        if (sessionId) {
          axios
            .get(
              "ValidateSession?sessionid=" +
                encodeURI(sessionId) +
                "&Source=development"
            )
            .then((response) => {
              console.log("Rwvalidation", response);
              console.log("check1", response.statusText.toLowerCase());
              if (response.statusText.toLowerCase() === "ok") {
                //  console.log("Login Response", response);
                const respData = response.data.Response;

              
                if (response.data.Response.success === true) {
                  
                  console.log("check2",respData);
                  let userDetails = respData.data.map((details) => {
                    return { ...details };
                  });

                  console.log("check3", userDetails);
                  let userDetailsData = { ...userDetails[0] };
                  if (userDetailsData.isvalidate) {
                    this.props.onUserValidate(
                      response.data.JsonToken,
                      userDetailsData.userid,
                      userDetailsData.username,
                      true,
                      userDetailsData.sessionid
                    );

                    isAuth = true;
                    this.setState({ isAuthenticated: isAuth });
                  }
                }
              }
              this.setState({ loading: false });
            })
            .catch((err) => {});
        } else {
          this.setState({ isAuthenticated: isAuth, loading: false });
          this.props.onLogoutHandler();
        }
      }

      if (this.state.isAuth === false) {
        this.props.onLogoutHandler();
      }
    }

    render() {
      let loginErrorMessage = <Redirect to="/login" />;

      console.log("[store state from helper]", this.state.isAuthenticated);
      return (
        <div>
          {this.state.loading ? (
            <div>Please wait......</div>
          ) : Boolean(this.state.isAuthenticated) ? (
            <Component {...this.props} />
          ) : (
            loginErrorMessage
          )}
        </div>
      );
    }
  }

  const mapDispatchtoProps = (dispatch) => {
    return {
      onUserValidate: (
        access_token,
        userId,
        userName,
        isAuthenticate,
        sessionId
      ) => {
        sessionStorage.setItem("sessionId", sessionId);

        dispatch(
          actionTypes.login_validate(
            access_token,
            userId,
            userName,
            isAuthenticate
          )
        );
      },

      onLogoutHandler: () => {
        dispatch(actionTypes.portal_logout());
      },
    };
  };

  return connect(null, mapDispatchtoProps)(AuthenticatedComponent);
};

export default requireAuthentication;
