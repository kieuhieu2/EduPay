import React, { useState } from 'react';
import { getSalaryReport, getSalaryReportById, updateSalaryReport } from '~/services/AdminService/salaryReportService';
import classNames from 'classnames/bind';
import styles from './GetSalaryReport.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function GetSalaryReport() {
    const [searchInput, setSearchInput] = useState('');
    const [salaryReport, setSalaryReport] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        month: '',
        year: '',
        workDaysInMonth: '',
        totalOverTimeHours: '',
        totalDeduction: '',
        bonusInMonth: '',
        netSalary: '',
        payDate: ''
    });

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async () => {
        const [teacherCode, month, year] = searchInput.split('/');

        try {
            let result = null;

            if(teacherCode && month && year) {
                result = await getSalaryReport(teacherCode, parseInt(month), parseInt(year));
            } else if(teacherCode) {
                result = await getSalaryReportById(teacherCode);
            }
            console.log(result)

            if (result) {
                setSalaryReport(result);
                toast.success('Lấy báo cáo thành công!');
            } else {
                toast.error('Không tìm thấy báo cáo lương!');
            }
        } catch (error) {
            toast.error('Lỗi khi lấy báo cáo lương!');
            console.error('Error fetching salary report:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData({
            ...salaryReport,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await updateSalaryReport(salaryReport.salaryReportId, editData);
            console.log(response)
            if (response.code === 1000) {
                toast.success('Cập nhật báo cáo lương thành công!');
                setSalaryReport(response.result); 
                setIsEditing(false); 
            } else {
                toast.error('Cập nhật thất bại!');
            }
        } catch (error) {
            toast.error('Lỗi khi cập nhật báo cáo lương!');
            console.error('Error updating salary report:', error);
        }
    };

    return (
        <div className={cx('salary-report-container')}>
            <h1 className={cx('title')}>Báo Cáo Lương Giáo Viên</h1>
            <div className={cx('search-bar')}>
                <input
                    type="text"
                    placeholder="Nhập teacherCode/month/year"
                    value={searchInput}
                    onChange={handleInputChange}
                    className={cx('search-input')}
                />
                <button onClick={handleSearch} className={cx('search-button')}>
                    Tìm kiếm
                </button>
            </div>

            {salaryReport && !isEditing && (
                <div className={cx('report-container')}>
                    <h2>Kết Quả Báo Cáo</h2>
                    <table className={cx('report-table')}>
                        <thead>
                            <tr>
                                <th>Tháng</th>
                                <th>Năm</th>
                                <th>Số ngày làm việc</th>
                                <th>Giờ làm thêm</th>
                                <th>Tổng tiền bị trừ</th>
                                <th>Thưởng</th>
                                <th>Lương thực nhận</th>
                                <th>Ngày trả</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{salaryReport.month}</td>
                                <td>{salaryReport.year}</td>
                                <td>{salaryReport.workDaysInMonth}</td>
                                <td>{salaryReport.totalOverTimeHours}</td>
                                <td>{salaryReport.totalDeduction} VNĐ</td>
                                <td>{salaryReport.bonusInMonth} VNĐ</td>
                                <td>{salaryReport.netSalary} VNĐ</td>
                                <td>{salaryReport.payDate}</td>
                                <td>
                                    <button onClick={handleEditClick} className={cx('edit-button')}>Sửa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {isEditing && salaryReport && (
                <div className={cx('edit-form')}>
                    <h2>Chỉnh Sửa Báo Cáo Lương</h2>
                    <form onSubmit={handleUpdate}>
                        <div className={cx('form-group')}>
                            <label>Tháng:</label>
                            <input
                                type="number"
                                name="month"
                                value={editData.month}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Năm:</label>
                            <input
                                type="number"
                                name="year"
                                value={editData.year}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Số ngày làm việc:</label>
                            <input
                                type="number"
                                name="workDaysInMonth"
                                value={editData.workDaysInMonth}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giờ làm thêm:</label>
                            <input
                                type="number"
                                name="totalOverTimeHours"
                                value={editData.totalOverTimeHours}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Tổng tiền bị trừ:</label>
                            <input
                                type="number"
                                name="totalDeduction"
                                value={editData.totalDeduction}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Thưởng:</label>
                            <input
                                type="number"
                                name="bonusInMonth"
                                value={editData.bonusInMonth}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Lương thực nhận:</label>
                            <input
                                type="number"
                                name="netSalary"
                                value={editData.netSalary}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Ngày trả:</label>
                            <input
                                type="date"
                                name="payDate"
                                value={editData.payDate}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <button type="submit" className={cx('btn-submit')}>
                            Cập nhật
                        </button>
                    </form>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default GetSalaryReport;
