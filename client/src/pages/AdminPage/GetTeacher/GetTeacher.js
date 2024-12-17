import React, { useState } from 'react';
import { getTeacher } from '~/services/AdminService/TeacherService';
import classNames from 'classnames/bind'; 
import styles from './GetTeacher.module.scss'; 

const cx = classNames.bind(styles); 

function GetTeacher() {
    const [teacherCode, setTeacherCode] = useState('');
    const [teacherData, setTeacherData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setTeacherCode(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const result = await getTeacher(teacherCode); 
            if (result) {
                setTeacherData(result); 
                setError(null); 
            } else {
                setTeacherData(null);
                setError('Không tìm thấy giáo viên');
            }
        } catch (err) {
            setTeacherData(null);
            setError('Lỗi khi lấy thông tin giáo viên.');
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('heading')}>Tìm kiếm thông tin giáo viên</h2>
            <div className={cx('searchContainer')}>
                <label>Mã giáo viên:</label>
                <input
                    type="text"
                    value={teacherCode}
                    onChange={handleChange}
                    className={cx('input')}
                />
                <button onClick={handleSearch} className={cx('button')}>Tìm</button>
            </div>

            {error && <div className={cx('error')}>{error}</div>}
            {teacherData && (
                <div className={cx('teacherInfo')}>
                    <h3>Thông tin giáo viên:</h3>
                    <ul className={cx('infoList')}>
                        <li><strong>Mã giáo viên:</strong> {teacherData.teacherCode}</li>
                        <li><strong>Tên đăng nhập:</strong> {teacherData.username}</li>
                        <li><strong>Họ:</strong> {teacherData.firstName}</li>
                        <li><strong>Tên:</strong> {teacherData.lastName}</li>
                        <li><strong>Ngày sinh:</strong> {teacherData.dob}</li>
                        <li><strong>Email:</strong> {teacherData.email}</li>
                        <li><strong>Địa chỉ:</strong> {teacherData.address}</li>
                        <li><strong>Số điện thoại:</strong> {teacherData.phone}</li>
                        <li><strong>Vị trí:</strong> {teacherData.position}</li>
                        <li><strong>Bằng cấp:</strong> {teacherData.qualificationOfTeacher}</li>
                        <li><strong>Kinh nghiệm:</strong> {teacherData.experience} năm</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GetTeacher;
