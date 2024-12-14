    import * as httpRequest from '~/utils/httpRequest';

    // get salary report by teacherCode. /teacherCode/month/year teacgerCode from local storage, month and year from input
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