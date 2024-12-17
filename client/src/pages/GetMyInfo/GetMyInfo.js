import React, { useState, useEffect } from 'react';
import { getMyInfo } from '~/services/teacherService';
import classNames from 'classnames/bind';
import style from './GetMyInfo.module.scss';

const cx = classNames.bind(style);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN'); // Format: dd/MM/yyyy
    };

    return (
        <div className={cx('teacherInfoContainer')}>
            {loading && <div className={cx('loadingSpinner')}>Đang tải...</div>}
            {error && <p className={cx('errorMessage')}>{error}</p>}

            {teacherData && (
                <>
                    <h1 className={cx('title')}>Thông tin giáo viên</h1>
                    <div className={cx('teacherInfo')}>
                        <div className={cx('infoColumn')}>
                            <div><strong>Mã giáo viên</strong> {teacherData.teacherCode || 'N/A'}</div>
                            <div><strong>Tên người dùng</strong> {teacherData.username || 'N/A'}</div>
                            <div><strong>Họ và tên</strong> {teacherData.firstName} {teacherData.lastName || ''}</div>
                            <div><strong>Ngày sinh</strong> {teacherData.dob ? formatDate(teacherData.dob) : 'N/A'}</div>
                            <div><strong>Email</strong> {teacherData.email || 'N/A'}</div>
                        </div>

                        <div className={cx('infoColumn')}>
                            <div><strong>Địa chỉ</strong> {teacherData.address || 'N/A'}</div>
                            <div><strong>Số điện thoại</strong> {teacherData.phone || 'N/A'}</div>
                            <div><strong>Chức vụ</strong> {teacherData.position || 'N/A'}</div>
                            <div><strong>Trình độ</strong> {teacherData.qualificationOfTeacher || 'N/A'}</div>
                            <div><strong>Kinh nghiệm</strong> {teacherData.experience ? `${teacherData.experience} năm` : 'N/A'}</div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default GetMyInfo;
