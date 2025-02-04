import * as httpRequest from '~/utils/httpRequest';

export const createSalaryReport = async (teacherCode, salaryReportData) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.post(`salaryReport/${teacherCode}`, salaryReportData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}

export const getSalaryReport = async (teacherCode, month, year) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.get(`salaryReport/${teacherCode}/${month}/${year}`, {
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

export const getSalaryReportById = async (salaryReportId) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.get(`salaryReport/${salaryReportId}`, {
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

export const updateSalaryReport = async (salaryReportId, salaryReportData) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequest.put(`salaryReport/${salaryReportId}`, salaryReportData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    } 
}