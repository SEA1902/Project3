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

export const updateInformation = async (username, phone) => {
    try {
        await httpRequest.post('user/update-information', {
            phone: phone,
            username: username,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateChangePassword = async (newPassword) => {
    try {
        await httpRequest.post('user/update-password', {
            newPassword: newPassword,
        });
    } catch (error) {
        console.log(error);
    }
};
