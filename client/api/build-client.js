import axios from "axios";

const buildClient = ({ req }) => {
  try{
    if (typeof window === "undefined") {
      // We are on the server
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
  } catch (err) { console.log(err); };
};

export default buildClient;
