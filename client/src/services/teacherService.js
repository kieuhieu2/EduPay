import * as httpRequest from '~/utils/httpRequest';

export const getMyInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const res = await httpRequest.get('teachers/getMyInfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }


};