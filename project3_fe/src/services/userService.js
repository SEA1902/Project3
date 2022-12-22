import * as httpRequest from '~/utils/httpRequest';

export const login = async (username, password) => {
    try {
        const result = await httpRequest.post('user/login',{
            username: username,
            password: password,
        });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};
export const register = async (username, password) => {
    try {
        await httpRequest.post('user/register', {
            username: username,
            password: password,
        });
    } catch (error) {
        console.log(error);
    }
};
