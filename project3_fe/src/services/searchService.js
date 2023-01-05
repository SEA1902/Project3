import * as httpRequest from '~/utils/httpRequest'

export const search = async (name) => {
    try {
        const res = await httpRequest.post('product/search', {
            name: name
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}