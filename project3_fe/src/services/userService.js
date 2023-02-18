import * as httpRequest from '~/utils/httpRequest';

export const login = async (phone, password) => {
    try {
        const result = await httpRequest.post('user/login', {
            phone: phone,
            password: password,
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
export const register = async (username, password, phone, address) => {
    try {
        await httpRequest.post('user/register', {
            phone: phone,
            password: password,
            username: username,
            address: address,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateInformation = async (userId, username, phone) => {
    try {
        const result = await httpRequest.post('user/update-information/' + userId, {
            phone: phone,
            username: username,
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePassword = async (userId, password) => {
    try {
        const result = await httpRequest.post('user/update-information/' + userId, {
            password: password,
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateAddress = async (userId, address) => {
    try {
        const result = await httpRequest.post('user/update-information/' + userId, {
            address: address,
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
