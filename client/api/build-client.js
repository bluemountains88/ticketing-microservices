import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    try {
      return axios.create({
        baseURL: "http://www.argentickets.com.ar",
        headers: req.headers,
      });
      } else {
      // We must be on the browser
      return axios.create({
        baseUrl: "/",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default buildClient;
