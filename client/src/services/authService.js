import * as httpRequest from '~/utils/httpRequest';

const handleResponse = (response) => {
    if (response.code === 1000) {
        return response.result;
    } else {
        throw new Error('Unexpected response code');
    }
};

export const login = async (username, password) => {
    try {
        const res = await httpRequest.post('auth/token', {
            username,
            password,
        });
        return handleResponse(res);
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }

};