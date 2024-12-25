import React, { useState, useEffect } from 'react';
import { getContract, updateContract } from '~/services/AdminService/contractService';
import classNames from 'classnames/bind';
import style from './GetContract.module.scss';

const cx = classNames.bind(style);

function GetContract() {
    const [teacherCode, setTeacherCode] = useState('');
    const [contractData, setContractData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleSearch = async () => {
        if (!teacherCode) {
            setError('Vui lòng nhập mã Hop dong');
            return;
        }

        setLoading(true);
        setError('');
        setContractData(null);
        setSuccessMessage('');
        try {
            const data = await getContract(teacherCode);
            console.log(data);

            if (data && data.result) {
                setContractData(data.result);
                setFormData(data.result);
                setEditMode(false);
            } else {
                setError('Không tìm thấy hợp đồng.');
            }
        } catch (err) {
            setError('Không tìm thấy hợp đồng.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (contractData) {
            console.log('Contract Data:', contractData);
        }
    }, [contractData]);

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            setError('');
            const updatedData = await updateContract(contractData.contractId, formData);
            if (updatedData) {
                setContractData(updatedData); 
                setEditMode(false);
                setSuccessMessage('Cập nhật hợp đồng thành công!');
                
                const freshData = await getContract(contractData.contractId); 
                if (freshData && freshData.result) {
                    setContractData(freshData.result);
                } else {
                    setError('Không tìm thấy hợp đồng mới.');
                }
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Tra cứu và sửa hợp đồng giáo viên</h1>

            <div className={cx('searchContainer')}>
                <input
                    type="text"
                    placeholder="Nhập mã hop dong"
                    value={teacherCode}
                    onChange={(e) => setTeacherCode(e.target.value)}
                    className={cx('searchInput')}
                />
                <button onClick={handleSearch} className={cx('searchButton')}>Tìm kiếm</button>
            </div>

            {loading && <p className={cx('loading')}>Đang tải...</p>}
            {error && <p className={cx('error')}>{error}</p>}
            {successMessage && <p className={cx('success')}>{successMessage}</p>}

            {contractData && (
                <div>
                    <h1 className={cx('title')}>Thông tin hợp đồng</h1>
                    <table className={cx('contractTable')}>
                        <thead>
                            <tr>
                                <th>Loại hợp đồng</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Lương hàng tháng</th>
                                <th>Số ngày nghỉ phép mỗi tháng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {editMode ? (
                                        <select
                                            name="contractType"
                                            value={formData.contractType}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        >
                                            <option value="FULL_TIME">FULL_TIME</option>
                                            <option value="PART_TIME">PART_TIME</option>
                                        </select>
                                    ) : (
                                        contractData.contractType
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        contractData.startDate
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        contractData.endDate
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            name="salaryOfMonth"
                                            value={formData.salaryOfMonth}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        `${contractData.salaryOfMonth} VND`
                                    )}
                                </td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            name="annualLeaveDaysInMonth"
                                            value={formData.annualLeaveDaysInMonth}
                                            onChange={handleInputChange}
                                            className={cx('input')}
                                        />
                                    ) : (
                                        contractData.annualLeaveDaysInMonth
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

export default GetContract;
