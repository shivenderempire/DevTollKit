import axios from "axios";
import swal from "sweetalert2";
import * as helpers from "../lib/Helper";

const instance = axios.create({
  baseURL: "http://104.255.32.135:8080/PortalAPI/",
  //  baseURL: "https://localhost:44343/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
});

instance.interceptors.request.use(
  (request) => {
    instance.defaults.headers.post["Content-Type"] = "application/json";
    const token = helpers.access_token();

    if (token !== "") {
      request.headers.Authorization = "bearer " + token;
    }
    return request;
  },
  (err) => {
    console.log("Axios Request", err);
    return Promise.reject(err);
  },
);
instance.interceptors.response.use(
  (resp) => {
    //console.log("REsponse from inerceptor", resp);
    //return Promise.reject("resp");

    return resp;
  },
  (err) => {
    //console.log("Error in posting", err);
    swal.fire("oops!", "Some Error Occurred", "error");
    return Promise.reject(err);
  },
);
export default instance;
