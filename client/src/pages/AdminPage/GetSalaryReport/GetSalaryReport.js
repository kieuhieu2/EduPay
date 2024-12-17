import React, { useState } from 'react';
import { getSalaryReport, getSalaryReportById } from '~/services/AdminService/salaryReportService';
import classNames from 'classnames/bind';
import styles from './GetSalaryReport.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function SalaryReport() {
    const [searchInput, setSearchInput] = useState('');
    const [salaryReport, setSalaryReport] = useState(null);

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

            {salaryReport && (
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default SalaryReport;
