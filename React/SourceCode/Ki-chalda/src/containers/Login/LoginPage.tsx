import React, { useState, useEffect } from "react";
import axios from "../../serviceCall/axiosEdusoft";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import swal from "sweetalert2";

function LoginPage(props: any) {
  const [loginCredentials, setLoginCredentials] = useState({
    userId: "",
    password: "",
  });

  useEffect(() => {
    document.body.className = "bg-gradient-primary";
    return () => {
      document.body.className = "";
    };
  }, []);

  const oncredentialsChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const LoginClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get(
        `LoginPortal?userId=${loginCredentials.userId}&password=${loginCredentials.password}&source=development`,
      )
      .then((resp) => {
        if (resp.statusText.toLowerCase() === "ok") {
          if ((resp.data.Response.success as Boolean) === false) {
            swal.fire("ERROR", resp.data.Response.message, "error");
          } else {
            const respData = resp.data.Response;

            let userDetails = respData.data.map((details: any) => {
              return { ...details };
            });
            let userDetailsData = { ...userDetails[0] };

            props.onUserValidate(
              resp.data.JsonToken,
              userDetailsData.userid,
              userDetailsData.username,
              true,
              userDetailsData.sessionid,
            );

            props.history.replace("/Webportal");
          }
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Welcome to KI-CHALDA!
                      </h1>
                    </div>

                    <form
                      className="user"
                      onSubmit={(event) => LoginClick(event)}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="userId"
                          name="userId"
                          autoComplete="none"
                          aria-describedby="emailHelp"
                          placeholder="Enter user id"
                          onChange={(event) => {
                            oncredentialsChanged(event);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          name="password"
                          placeholder="Password"
                          onChange={(event) => {
                            oncredentialsChanged(event);
                          }}
                        />
                      </div>
                      {/* <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck">Remember
                                                    Me</label>
                          </div>
                      </div> */}
                      <button
                        type="submit"
                        className="btn btn-google btn-user btn-block">
                        Login
                      </button>
                      {/* <a href="index.html" className="btn btn-primary btn-user btn-block">
                          Login
                                        </a> */}
                      <hr />
                      &nbsp;
                      <br />
                      &nbsp;
                      {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a> */}
                    </form>
                    {/* <hr /> */}
                    <div className="text-center">
                      &nbsp;
                      {/* <a className="small" href="forgot-password.html">Forgot Password?</a> */}
                    </div>
                    <div className="text-center">
                      &nbsp;
                      {/* <a className="small" href="register.html">Create an Account!</a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onUserValidate: (
      access_token: any,
      userId: any,
      userName: string,
      isAuthenticate: boolean,
      sessionId: any,
    ) => {
      sessionStorage.setItem("sessionId", sessionId);
      dispatch(
        actionTypes.login_validate(
          access_token,
          userId,
          userName,
          isAuthenticate,
        ),
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
