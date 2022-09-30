import axios from 'axios';

const buildClient = ({ req }) => {
    try {
        if (typeof window === 'undefined') {
            return axios.create({
                baseURL: 'http://www.argentickets.com.ar',
                headers: req.headers
            });
        } else {
            return axios.create({
                baseUrl: '/'
            });
        }
    } catch (err) {
        console.error(err);
    };
};

export default buildClient;