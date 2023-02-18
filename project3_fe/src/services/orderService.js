import * as httpRequest from '~/utils/httpRequest';

export const post = async (order) => {
    try {
        await httpRequest.post('order/create-order', order);
    } catch (error) {
        console.log(error);
    }
};

export const getRecentOrder = async (userId) => {
    try {
        const res = await httpRequest.get('order/get-recent-order/' + userId);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getAllOrders = async (userId) => {
    try {
        const res = await httpRequest.get('order/get-all-orders/' + userId);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async (userId, orderId) => {
    try {
        const res = await httpRequest.post('order/get-order/' + userId, {
            orderId: orderId,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const res = await httpRequest.post('order/delete-order/', {
            orderId: orderId,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
