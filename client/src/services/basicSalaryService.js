import * as httpRequest from '~/utils/httpRequest';

export const getMyBasicSalary = async () => {
    const token = localStorage.getItem('token');
    const teacherCode = localStorage.getItem('teacherCode');
    const url = `basicSalary/getMyBasicSalary/${teacherCode}`;

    try {
        const response = await httpRequest.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        return response.result;
    } catch (error) {
        console.error('Error fetching basic salary:', error);
        throw new Error('Không thể lấy dữ liệu lương cơ bản');
    }
}