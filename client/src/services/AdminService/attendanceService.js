import * as httpRequests from '~/utils/httpRequest';

export const createAttendance = async (teacherCode,data) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequests.post(`attendance/${teacherCode}`, data, {
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

export const getAttendance = async (attendanceId) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequests.get(`attendance/${attendanceId}`, {
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

export const getAttendanceByTeacherCode_Month_yaer = async (teacherCode, month, year) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequests.get(`attendance/${teacherCode}/${month}/${year}`, {
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

export const updateAttendance = async (attendanceId, data) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequests.put(`attendance/${attendanceId}`, data, {
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

export const deleteAttendance = async (attendanceId) => {
    try {
        const token = localStorage.getItem('token');

        const res = await httpRequests.deleteRequest(`attendance/${attendanceId}`, {
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