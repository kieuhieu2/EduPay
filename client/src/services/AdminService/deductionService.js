import * as httpRequest from '~/utils/httpRequest'

export const createDeduction = async (teacherCode, data) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.post(`/deduction/${teacherCode}`, data, {
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

export const getDeductions = async (teacherCode, month, year) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.get(`/deduction/${teacherCode}/${month}/${year}`, {
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

export const updateDeduction = async (deductionId, data) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.put(`/deduction/${deductionId}`, data, {
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

export const deleteDeduction = async (deductionId) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.deleteRequest(`/deduction/${deductionId}`, {
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