import React, { useState } from 'react';
import { updateAllBasicSalary } from '~/services/AdminService/basicSalaryService';
import classNames from 'classnames/bind';
import styles from './UpdateBasicSalary.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function UpdateBasicSalary() {
    const [basicSalary, setBasicSalary] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleInputChange = (e) => {
        setBasicSalary(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateAllBasicSalary(basicSalary);
            console.log(res)
            if (res.data.code === 1000) {
                toast.success('Cập nhật lương cơ bản thành công!');
                setResponseMessage('Cập nhật lương cơ bản thành công!');
            } else {
                toast.error(`Lỗi: ${res.message || 'Lỗi không xác định!'}`);
                setResponseMessage(res.message || 'Lỗi không xác định!');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi gọi API!');
            setResponseMessage('Đã xảy ra lỗi khi gọi API!');
            console.error(error);
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('heading')}>Cập nhật lương cơ bản cho tất cả giáo viên</h2>
            <form onSubmit={handleSubmit} className={cx('form')}>
                <label className={cx('label')}>Lương cơ bản mới</label>
                <input
                    type="number"
                    value={basicSalary}
                    onChange={handleInputChange}
                    className={cx('input')}
                    required
                />

                <button type="submit" className={cx('button')}>Cập nhật lương cơ bản</button>
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

export default UpdateBasicSalary;
