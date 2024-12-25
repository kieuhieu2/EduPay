import React, { useState } from 'react';
import { createBasicSalary } from '~/services/AdminService/basicSalaryService'; 
import classNames from 'classnames/bind';
import style from './CreateBasicSalary.module.scss';

const cx = classNames.bind(style);

function CreateBasicSalary() {
    const [formData, setFormData] = useState({
        basicSalary: '',
        fixed_allowances: '',
        overtimeRate: '',
        paymentType: '',
        overtimePayPerHour: '',
    });
    const [teacherCode, setTeacherCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateSalary = async () => {
        if (!teacherCode) {
            setError('Vui lòng nhập mã giáo viên.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const data = await createBasicSalary(teacherCode, formData);
            setSuccess('Tạo lương cơ bản thành công!');
            console.log(data.result); // Xem kết quả trả về
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Tạo mới lương cơ bản</h1>

            {/* Form nhập liệu */}
            <div className={cx('form')}>
                <div className={cx('formGroup')}>
                    <label>Mã giáo viên:</label>
                    <input
                        type="text"
                        placeholder="Nhập mã giáo viên"
                        value={teacherCode}
                        onChange={(e) => setTeacherCode(e.target.value)}
                        className={cx('input')}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label>Lương cơ bản:</label>
                    <input
                        type="number"
                        name="basicSalary"
                        placeholder="Nhập lương cơ bản"
                        value={formData.basicSalary}
                        onChange={handleInputChange}
                        className={cx('input')}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label>Phụ cấp cố định:</label>
                    <input
                        type="number"
                        name="fixed_allowances"
                        placeholder="Nhập phụ cấp cố định"
                        value={formData.fixed_allowances}
                        onChange={handleInputChange}
                        className={cx('input')}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label>Tỉ lệ tăng ca:</label>
                    <input
                        type="number"
                        name="overtimeRate"
                        placeholder="Nhập tỉ lệ tăng ca"
                        value={formData.overtimeRate}
                        onChange={handleInputChange}
                        className={cx('input')}
                    />
                </div>
                <div className={cx('formGroup')}>
                    <label>Hình thức thanh toán:</label>
                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleInputChange}
                        className={cx('input')}
                    >
                        <option value="">Chọn hình thức</option>
                        <option value="BANKING">BANKING</option>
                        <option value="CASH">CASH</option>
                    </select>
                </div>
                <div className={cx('formGroup')}>
                    <label>Tiền tăng ca mỗi giờ:</label>
                    <input
                        type="number"
                        name="overtimePayPerHour"
                        placeholder="Nhập tiền tăng ca mỗi giờ"
                        value={formData.overtimePayPerHour}
                        onChange={handleInputChange}
                        className={cx('input')}
                    />
                </div>
                <button
                    onClick={handleCreateSalary}
                    className={cx('submitButton')}
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : 'Tạo mới'}
                </button>
            </div>

            {/* Thông báo lỗi hoặc thành công */}
            {error && <p className={cx('error')}>{error}</p>}
            {success && <p className={cx('success')}>{success}</p>}
        </div>
    );
}

export default CreateBasicSalary;
