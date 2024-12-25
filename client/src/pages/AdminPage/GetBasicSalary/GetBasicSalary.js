import React, { useState } from 'react';
import { getBasicSalary, updateBasicSalary } from '~/services/AdminService/basicSalaryService';
import classNames from 'classnames/bind';
import style from './GetBasicSalary.module.scss';

const cx = classNames.bind(style);

function GetBasicSalary() {
    const [basicSalaryId, setBasicSalaryId] = useState('');
    const [salaryData, setSalaryData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    const handleSearch = async () => {
        if (!basicSalaryId) {
            setError('Vui lòng nhập ID lương cơ bản');
            return;
        }

        setLoading(true);
        setError('');
        setSalaryData(null);
        try {
            const data = await getBasicSalary(basicSalaryId);
            setSalaryData(data.data.result);
            setFormData(data.data.result);
            setEditMode(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            setError('');
            const updatedData = await updateBasicSalary(basicSalaryId, formData);
            setSalaryData(updatedData.data.result); 
            setEditMode(false);
            alert('Cập nhật thành công!');
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Tra cứu và sửa lương cơ bản</h1>

            <div className={cx('searchContainer')}>
                <input
                    type="text"
                    placeholder="Nhập ID lương cơ bản"
                    value={basicSalaryId}
                    onChange={(e) => setBasicSalaryId(e.target.value)}
                    className={cx('searchInput')}
                />
                <button onClick={handleSearch} className={cx('searchButton')}>Tìm kiếm</button>
            </div>

            {loading && <p className={cx('loading')}>Đang tải...</p>}
            {error && <p className={cx('error')}>{error}</p>}

            {salaryData && (
                <div>
                    <h1 className={cx('title')}>Thông tin lương cơ bản</h1>
                    <table className={cx('salaryTable')}>
                        <thead>
                            <tr>
                                <th>Lương cơ bản</th>
                                <th>Phụ cấp cố định</th>
                                <th>Tỉ lệ tăng ca</th>
                                <th>Hình thức thanh toán</th>
                                <th>Tiền tăng ca mỗi giờ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            name="basicSalary"
                                            value={formData.basicSalary}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        `${salaryData.basicSalary} VND`
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            name="fixed_allowances"
                                            value={formData.fixed_allowances}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        `${salaryData.fixed_allowances} VND`
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            name="overtimeRate"
                                            value={formData.overtimeRate}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        salaryData.overtimeRate
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <select
                                            name="paymentType"
                                            value={formData.paymentType}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        >
                                            <option value="BANKING">BANKING</option>
                                            <option value="CASH">CASH</option>
                                        </select>
                                    ) : (
                                        salaryData.paymentType
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            name="overtimePayPerHour"
                                            value={formData.overtimePayPerHour}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        `${salaryData.overtimePayPerHour} VND`
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <button onClick={handleSaveChanges} className={cx('saveButton')}>
                                            Lưu
                                        </button>
                                    ) : (
                                        <button onClick={() => setEditMode(true)} className={cx('editButton')}>
                                            Sửa
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default GetBasicSalary;
