import * as httpRequest from '~/utils/httpRequest';

export const createTeacher = async (data) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.post('teachers/', data, {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        });

        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

export const getTeacher = async (teacherCode) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const res = await httpRequest.get(`teachers/${teacherCode}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return res.result;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

