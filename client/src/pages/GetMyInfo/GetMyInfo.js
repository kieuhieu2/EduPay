import React, { useState, useEffect } from 'react';
import { getMyInfo } from '~/services/teacherService';

function GetMyInfo() {
    const [teacherData, setTeacherData] = useState(null); 
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchTeacherInfo = async () => {
            setLoading(true); 
            setError(''); 
            try {
                const data = await getMyInfo(); 
                setTeacherData(data); 
            } catch (err) {
                setError('Không thể lấy thông tin giáo viên');
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherInfo();
    }, []);

    return (
        <div>
            {loading && <p>Đang tải thông tin giáo viên...</p>} {/* Hiển thị loading */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}

            {teacherData && (
                <div>
                    <h1>Thông tin giáo viên</h1>
                    <ul>
                        <li><strong>Mã giáo viên:</strong> {teacherData.teacherCode}</li>
                        <li><strong>Tên người dùng:</strong> {teacherData.username}</li>
                        <li><strong>Họ và tên:</strong> {teacherData.firstName} {teacherData.lastName}</li>
                        <li><strong>Ngày sinh:</strong> {teacherData.dob}</li>
                        <li><strong>Email:</strong> {teacherData.email}</li>
                        <li><strong>Địa chỉ:</strong> {teacherData.address}</li>
                        <li><strong>Số điện thoại:</strong> {teacherData.phone}</li>
                        <li><strong>Chức vụ:</strong> {teacherData.position}</li>
                        <li><strong>Trình độ:</strong> {teacherData.qualificationOfTeacher}</li>
                        <li><strong>Kinh nghiệm:</strong> {teacherData.experience} năm</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GetMyInfo;
