import React, { useState } from 'react';
import { createDeduction } from '~/services/AdminService/deductionService';
import classNames from 'classnames/bind';
import styles from './CreateDeduction.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CreateDeduction() {
    const [formData, setFormData] = useState({
        teacherCode: '',
        date: '',
        deductionType: 'UNAPPROVED_ABSENCE',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { teacherCode, ...data } = formData;

        if (!teacherCode || !data.date || !data.description) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            const response = await createDeduction(teacherCode, data);

            if (response.code === 1000) {
                toast.success('Tạo khau tru thành công!');
                setFormData({
                    teacherCode: '',
                    date: '',
                    deductionType: 'UNAPPROVED_ABSENCE',
                    amount: '',
                    description: '',
                });
            } else {
                toast.error(response.message || 'Có lỗi xảy ra!');
            }
        } catch (error) {
            toast.error('Lỗi khi tạo khau tru!');
            console.error('Error creating deduction:', error);
        }
    };

    return (
        <div className={cx('create-deduction-container')}>
            <h1 className={cx('title')}>Tạo Deduction</h1>
            <form onSubmit={handleSubmit} className={cx('create-deduction-form')}>
                <div className={cx('form-group')}>
                    <label htmlFor="teacherCode">Mã giáo viên:</label>
                    <input
                        type="text"
                        id="teacherCode"
                        name="teacherCode"
                        value={formData.teacherCode}
                        onChange={handleChange}
                        placeholder="Nhập mã giáo viên"
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="date">Ngày:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="deductionType">Loại trừ lương:</label>
                    <select
                        id="deductionType"
                        name="deductionType"
                        value={formData.deductionType}
                        onChange={handleChange}
                    >
                        <option value="UNAPPROVED_ABSENCE">Vắng không phép</option>
                        <option value="LATE">Đi muộn</option>
                        <option value="EARLY_LEAVE">Về sớm</option>
                    </select>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="amount">Số lan:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Nhập số lan"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="description">Mô tả:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Nhập mô tả"
                        required
                    />
                </div>
                <button type="submit" className={cx('btn-submit')}>
                    Tạo
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateDeduction;
