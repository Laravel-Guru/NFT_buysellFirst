import axios from "axios";

const urlDomain = "http://localhost:3050";
const headers = { withCredentials: true };

const request = {

  get(url) {
    return axios
      .get(urlDomain + url, {
        headers: {
          authorization: localStorage.getItem("token"),
          // email: localStorage.getItem("email"),
        },
      })
      .then((res) => {
        if ((res.status == 200)) {
          if (res.data.message == "expired") {
            localStorage.removeItem("token");
            localStorage.removeItem("user_name");
            res.data.message = false; // replace to mark as fail
            window.location = "/";
            // history.push("/");
            // throw new Error(`${res.status} ${res.data.message}`);
            return res.data;  // return code should push to root
          }
          else {
            return res.data;
          }
        }
        else
          throw new Error(`${res.status} ${res.statusText}`);
      });
  },
  
  post(url, data) {
    const send_param = {
      headers,
      data,
    };
    return axios
      .post(urlDomain + url, send_param, {
        headers: {
          authorization: localStorage.getItem("token"),
          // email: localStorage.getItem("email"),
        },
      })
      .then((res) => {
        if ((res.status = 200)) {
          if (res.data.message == "expired") {
            localStorage.removeItem("token");
            localStorage.removeItem("user_name");
            res.data.message = false; // replace to mark as fail
            // history.push("/");
            throw new Error(`${res.status} ${res.data.message}`);
          } else {
            return res.data;
          }
        }
        throw new Error(`${res.status} ${res.statusText}`);
      });
  },
};

export default request;
