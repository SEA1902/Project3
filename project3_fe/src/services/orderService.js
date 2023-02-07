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
