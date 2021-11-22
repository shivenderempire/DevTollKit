import axios from "axios";
import swal from "sweetalert2";
import * as helpers from "../lib/Helper";
import JsonResponse from "./JsonResponse";

const instance = axios.create({
  baseURL: "http://104.255.32.135:8080/PortalAPI/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
});
//const jsonResponse = { success: true, statusCode: 200, data: null, message: "ok" };

const jsonResponse = new JsonResponse(true, 200, null, "ok");

instance.interceptors.request.use(
  (request) => {
    instance.defaults.headers.post["Content-Type"] = "application/json";

    const token = helpers.access_token();
    //console.log("mytoken "+token)
    if (token !== "") {
      request.headers.Authorization = "bearer " + token;
    }
    return request;
  },
  (err) => {
    console.log("Axios Request", err);

    return Promise.reject({
      ...jsonResponse,
      success: false,
      statusCode: 400,
      message: err,
    });
  },
);
instance.interceptors.response.use(
  (resp) => {
    if (resp.status === 200 || resp.status === 201) {
      return resp.data;
    } else {
      return {
        success: false,
        statusCode: resp.status,
        data: null,
        message: resp.statusText,
      };
    }
  },
  (err) => {
    console.log(err.response.status);
    if (err.response.status === 401 || err.response.status === 403) {
      window.location.reload();
      return;
    }
    swal.fire("oops!", "Some Error Occurred", "error");
    return Promise.reject({
      ...jsonResponse,
      success: false,
      statusCode: "dddd",
      message: err.message,
      data: null,
    });

    //    return Promise.reject({ ...jsonResponse, success: false, statusCode: err.response.status, message: err.message, data: null });
  },
);
export default instance;
