import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:3009/',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data) => {
    return await httpRequest.post(path, data);
};

export const deleteItem = async (path) => {
    await httpRequest.delete(path);
};
export default httpRequest;
