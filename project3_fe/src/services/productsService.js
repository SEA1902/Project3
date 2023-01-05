import * as httpRequest from '~/utils/httpRequest';

export const getProductList = async (page, limit, articleType) => {
    try {
        const res = await httpRequest.get('product/get-product-list', {
            params: {
                page,
                limit,
                articleType,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (productId) => {
    try {
        const res = await httpRequest.get('product/get-product/' + productId);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getProductRecommendation = async (productId) => {
    try {
        const res = await httpRequest.post('product/get-recommendation/', {
            id: productId
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
