import * as httpRequest from '~/utils/httpRequest';

export const get = async (userId) => {
    try {
        const res = await httpRequest.get('cart/'+ userId + '/get');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const post = async (userId, item) => {
    
    try {
        await httpRequest.post('cart/'+ userId + '/add-item/', item);
    } catch (error) {
        console.log(error);
    }
};

export const deleteItem = async (userId, id) => {
    try {
        await httpRequest.deleteItem('cart/'+ userId + '/delete-item/' + id);
    } catch (error) {
        console.log(error);
    }
};

export const deleteCart = async (userId) => {
    try {
        await httpRequest.deleteItem('cart/'+ userId + '/delete-cart');
    } catch (error) {
        console.log(error);
    }
};