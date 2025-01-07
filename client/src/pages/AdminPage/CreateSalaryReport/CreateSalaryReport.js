import React, { useState } from 'react';
import { createSalaryReport } from '~/services/AdminService/salaryReportService';
import classNames from 'classnames/bind';
import styles from './CreateSalaryReport.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CreateSalaryReport() {
    const [salaryReportData, setsalaryReportData] = useState({
        teacherCode: '',
        month: 0,
        year: 0,
        workDaysInMonth: 0,
        totalOverTimeHours: 0,
        totalDeduction: 0,
        bonusInMonth: 0,
        netSalary: 0,
        payDate: '',
    });

    const [salaryReport, setSalaryReport] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsalaryReportData((prevData) => ({
            ...prevData,
            [name]: value === '' ? 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!salaryReportData.teacherCode.trim()) {
            toast.error('Vui lòng nhập mã giáo viên!');
            return;
        }

        try {
            const response = await createSalaryReport(salaryReportData.teacherCode, salaryReportData);

            if (response.code === 1000) {
                toast.success('Tạo báo cáo lương thành công!');
                setSalaryReport(response);
                setsalaryReportData({
                    teacherCode: '',
                    month: 0,
                    year: 0,
                    workDaysInMonth: 0,
                    totalOverTimeHours: 0,
                    totalDeduction: 0,
                    bonusInMonth: 0,
                    netSalary: 0,
                    payDate: '',
                });
            } else {
                toast.error(response.message || 'Có lỗi xảy ra!');
            }
        } catch (error) {
            toast.error('Lỗi khi tạo báo cáo lương!');
            console.error('Error:', error);
        }
    };

    return (
        <div className={cx('create-salary-report-container')}>
            <h1 className={cx('title')}>Tạo Báo Cáo Lương</h1>
            {salaryReport && (
                <div className={cx('salary-report')}>
                    <h2 className={cx('report-title')}>Chi Tiết Báo Cáo Lương</h2>
                    <table className={cx('report-table')}>
                        <thead>
                            <tr>
                                <th>Tháng</th>
                                <th>Năm</th>
                                <th>Ngày công</th>
                                <th>Giờ tăng ca</th>
                                <th>Khấu trừ</th>
                                <th>Thưởng</th>
                                <th>Lương thực lãnh</th>
                                <th>Ngày trả</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{salaryReport.result.month}</td>
                                <td>{salaryReport.result.year}</td>
                                <td>{salaryReport.result.workDaysInMonth}</td>
                                <td>{salaryReport.result.totalOverTimeHours}</td>
                                <td>{salaryReport.result.totalDeduction}</td>
                                <td>{salaryReport.result.bonusInMonth}</td>
                                <td>{salaryReport.result.netSalary}</td>
                                <td>{salaryReport.result.payDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <form onSubmit={handleSubmit} className={cx('create-salary-report-form')}>
                <div className={cx('form-group')}>
                    <label htmlFor="teacherCode">Mã giáo viên:</label>
                    <input
                        type="text"
                        id="teacherCode"
                        name="teacherCode"
                        value={salaryReportData.teacherCode}
                        onChange={handleChange}
                        placeholder="Nhập mã giáo viên"
                        required
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="month">Tháng:</label>
                    <input
                        type="number"
                        id="month"
                        name="month"
                        value={salaryReportData.month}
                        onChange={handleChange}
                        placeholder="Nhập tháng (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="year">Năm:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={salaryReportData.year}
                        onChange={handleChange}
                        placeholder="Nhập năm (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="workDaysInMonth">Ngày công:</label>
                    <input
                        type="number"
                        id="workDaysInMonth"
                        name="workDaysInMonth"
                        value={salaryReportData.workDaysInMonth}
                        onChange={handleChange}
                        placeholder="Nhập số ngày công (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="totalOverTimeHours">Giờ tăng ca:</label>
                    <input
                        type="number"
                        id="totalOverTimeHours"
                        name="totalOverTimeHours"
                        value={salaryReportData.totalOverTimeHours}
                        onChange={handleChange}
                        placeholder="Nhập số giờ tăng ca (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="totalDeduction">Tổng khấu trừ:</label>
                    <input
                        type="number"
                        id="totalDeduction"
                        name="totalDeduction"
                        value={salaryReportData.totalDeduction}
                        onChange={handleChange}
                        placeholder="Nhập tổng khấu trừ (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="bonusInMonth">Thưởng trong tháng:</label>
                    <input
                        type="number"
                        id="bonusInMonth"
                        name="bonusInMonth"
                        value={salaryReportData.bonusInMonth}
                        onChange={handleChange}
                        placeholder="Nhập số tiền thưởng (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="netSalary">Lương thực lãnh:</label>
                    <input
                        type="number"
                        id="netSalary"
                        name="netSalary"
                        value={salaryReportData.netSalary}
                        onChange={handleChange}
                        placeholder="Nhập lương thực lãnh (mặc định 0)"
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="payDate">Ngày trả lương:</label>
                    <input
                        type="date"
                        id="payDate"
                        name="payDate"
                        value={salaryReportData.payDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={cx('btn-submit')}>
                    Tạo Báo Cáo
                </button>
            </form>
            
            <ToastContainer />
        </div>
    );
}

export default CreateSalaryReport;
