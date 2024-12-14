import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'apiVersion': 'v1.0',
    },
});

export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};


export const deleteRequest = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;