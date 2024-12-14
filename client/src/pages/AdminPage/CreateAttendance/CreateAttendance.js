import React, { useState } from 'react';
import { createAttendance } from '~/services/AdminService/attendanceService';
import classNames from 'classnames/bind';
import styles from './CreateAttendance.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CreateAttendance() {
    const [teacherCode, setTeacherCode] = useState('');
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        checkIn: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        checkOut: '17:00:00',
        workHours: 0,
        overTimeHours: 0,
        leaveType: null
    });
    
    const [responseMessage, setResponseMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createAttendance(teacherCode, formData);
            if (res.code === 1000) {
                toast.success('Điểm danh được tạo thành công!'); 
                //error not show toast.error
                setResponseMessage('Điểm danh được tạo thành công! ID: ' + res.result.attendanceId);
            } else {
                toast.error(`Lỗi khi xóa: ${res.message || "Lỗi không xác định!"}`); 
                setResponseMessage(res.message || 'Lỗi không xác định!');
            }
        } catch (error) {
            setResponseMessage('Đã xảy ra lỗi khi gọi API!');
            console.error(error);
            alert('Đã xảy ra lỗi khi gọi API!'); 
        }
    };
    

    return (
        <div className={cx('container')}>
            <h2 className={cx('heading')}>Tạo điểm danh</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <label className={cx('label')}>Mã giáo viên:</label>
                <input
                    type="text"
                    value={teacherCode}
                    onChange={(e) => setTeacherCode(e.target.value)}
                    className={cx('input')}
                    required
                />

                <label className={cx('label')}>Ngày:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={cx('input')}
                    required
                />

                <label className={cx('label')}>Giờ vào:</label>
                <input
                    type="time"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className={cx('input')}
                    required
                />

                <label className={cx('label')}>Giờ ra:</label>
                <input
                    type="time"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className={cx('input')}
                    required
                />

                <label className={cx('label')}>Số giờ làm việc:</label>
                <input
                    type="number"
                    name="workHours"
                    value={formData.workHours}
                    onChange={handleInputChange}
                    className={cx('input')}
                />

                <label className={cx('label')}>Số giờ làm thêm:</label>
                <input
                    type="number"
                    name="overTimeHours"
                    value={formData.overTimeHours}
                    onChange={handleInputChange}
                    className={cx('input')}
                />

                <label className={cx('label')}>Loại nghỉ phép:</label>
                <input
                    type="text"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    className={cx('input')}
                />

                <button type="submit" className={cx('button')}>Tạo điểm danh</button>
            </form>

            <ToastContainer />

            {responseMessage && (
                <div>
                    <div className={cx('response')}>{responseMessage}</div>
                </div>
            )}
        </div>
    );
}

export default CreateAttendance;
