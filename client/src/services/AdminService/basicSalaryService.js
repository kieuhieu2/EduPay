import httpRequest from "~/utils/httpRequest";

export const getBasicSalary = async (basicSalaryId) => {
    
    try {
        const token = localStorage.getItem("token");
        const res = await httpRequest.get(`/basicSalary/${basicSalaryId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createBasicSalary = async (teacherCode,data) => {
    try {
        const token = localStorage.getItem("token");
        const res = await httpRequest.post(`/basicSalary/${teacherCode}`,data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateBasicSalary = async (basicSalaryId,data) => {
    try {
        const token = localStorage.getItem("token");
        const res = await httpRequest.put(`/basicSalary/${basicSalaryId}`,data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};