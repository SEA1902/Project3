import * as httpRequest from '~/utils/httpRequest';

export const get = async (userId) => {
    try {
        const res = await httpRequest.post('cart/get', {
            userId: userId,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const post = async (userId, item) => {
    try {
        const res = await httpRequest.post('cart/add-item/', {
            userId: userId,
            item: item,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateQuantity = async (userId, items) => {
    try {
        await httpRequest.post('cart/update/', {
            userId: userId,
            items: items,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteItem = async (userId, id) => {
    try {
        await httpRequest.deleteItem('cart/delete-item/' + id, {
            userId: userId,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCart = async (userId) => {
    try {
        await httpRequest.deleteItem('cart/delete-cart', {
            userId: userId,
        });
    } catch (error) {
        console.log(error);
    }
};
