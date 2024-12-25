import React, { useState } from 'react';
import { CreateContract } from '~/services/AdminService/contractService';
import classNames from 'classnames/bind';
import style from './CreateContract.module.scss';

const cx = classNames.bind(style);

function CreateContractComponent() {
    const [teacherCode, setTeacherCode] = useState('');
    const [formData, setFormData] = useState({
        contractType: 'FULL_TIME',
        startDate: '',
        endDate: '',
        salaryOfMonth: '',
        annualLeaveDaysInMonth: '',
    });
    const [contractData, setContractData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateContract = async () => {
        if (!teacherCode) {
            setError('Vui lòng nhập mã giáo viên.');
            return;
        }

        if (!formData.startDate || !formData.endDate || !formData.salaryOfMonth || !formData.annualLeaveDaysInMonth) {
            setError('Vui lòng nhập đầy đủ thông tin hợp đồng.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');
        setContractData(null);

        try {
            const response = await CreateContract(teacherCode, formData);
            if (response) {
                setContractData(response.result);
                setSuccessMessage('Tạo hợp đồng thành công!');
            } else {
                setError('Không thể tạo hợp đồng.');
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi tạo hợp đồng.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Tạo hợp đồng giáo viên</h1>

            <div className={cx('formContainer')}>
                <input
                    type="text"
                    placeholder="Nhập mã giáo viên"
                    value={teacherCode}
                    onChange={(e) => setTeacherCode(e.target.value)}
                    className={cx('input')}
                />

                <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleInputChange}
                    className={cx('input')}
                >
                    <option value="FULL_TIME">FULL_TIME</option>
                    <option value="PART_TIME">PART_TIME</option>
                </select>

                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={cx('input')}
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={cx('input')}
                />
                <input
                    type="number"
                    placeholder="Lương hàng tháng"
                    name="salaryOfMonth"
                    value={formData.salaryOfMonth}
                    onChange={handleInputChange}
                    className={cx('input')}
                />
                <input
                    type="number"
                    placeholder="Số ngày nghỉ phép mỗi tháng"
                    name="annualLeaveDaysInMonth"
                    value={formData.annualLeaveDaysInMonth}
                    onChange={handleInputChange}
                    className={cx('input')}
                />

                <button onClick={handleCreateContract} className={cx('submitButton')}>
                    Tạo hợp đồng
                </button>
            </div>

            {loading && <p className={cx('loading')}>Đang xử lý...</p>}
            {error && <p className={cx('error')}>{error}</p>}
            {successMessage && <p className={cx('success')}>{successMessage}</p>}

            {contractData && (
                <div>
                    <h2 className={cx('title')}>Hợp đồng đã tạo</h2>
                    <table className={cx('contractTable')}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Loại hợp đồng</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Lương hàng tháng</th>
                                <th>Số ngày nghỉ phép mỗi tháng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{contractData.contractId}</td>
                                <td>{contractData.contractType}</td>
                                <td>{contractData.startDate}</td>
                                <td>{contractData.endDate}</td>
                                <td>{`${contractData.salaryOfMonth} VND`}</td>
                                <td>{contractData.annualLeaveDaysInMonth}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CreateContractComponent;
