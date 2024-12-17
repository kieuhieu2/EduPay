import * as httpRequest from '~/utils/httpRequest';

export const createCustomerFeedback = async (salaryReportId, feedback) => {
    try {
        const token = localStorage.getItem('token');
        const url = `salaryReport/customerFeedback/${salaryReportId}`;

        const res = await httpRequest.post(url, feedback, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return res.result;
    } catch (error) {
        console.error('Error creating customer feedback:', error);
        throw new Error('Không thể gửi phản hồi');
    }
};

export async function getCustomerFeedback(salaryReportId) {
    try {
        const token = localStorage.getItem('token');
        const url = `salaryReport/customerFeedback/${salaryReportId}`;
        const response = await httpRequest.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.result;
    } catch (error) {
        console.error('Error fetching customer feedback:', error);
        throw new Error('Không thể lấy dữ liệu phản hồi');
        
    }
};

export async function getCustomerFeedbacks() {
    try {
        const token = localStorage.getItem('token');
        const url = `salaryReport/customerFeedback/`;
        const response = await httpRequest.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.result;
    } catch (error) {
        console.error('Error fetching customer feedbacks:', error);
        throw new Error('Không thể lấy dữ liệu phản hồi');
    }
};

export async function getSalaryReport(teacherCode, month, year) {
        const token = localStorage.getItem('token');
        const url = `salaryReport/${teacherCode}/${month}/${year}`;
    
        try {
            const response = await httpRequest.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            return response.result;
        } catch (error) {
            console.error('Error fetching salary report:', error);
            throw new Error('Không thể lấy dữ liệu bảng lương');
        }
    }

