// import styles from './GetSalaryReport.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(styles);
import React, { useState } from 'react';
import { getSalaryReport } from '~/services/salaryReportService';

function GetSalaryReport() {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [salaryData, setSalaryData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        const teacherCode = localStorage.getItem('teacherCode');

        if (!teacherCode || !month || !year) {
            setError('Vui lòng nhập đủ thông tin');
            return;
        }

        try {
            const data = await getSalaryReport(teacherCode, month, year);
            console.log(data);
            setSalaryData(data);
            setError('');
        } catch (err) {
            setError('Không thể lấy báo cáo lương, vui lòng thử lại');
            setSalaryData(null);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="number"
                    placeholder="Nhập tháng"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nhập năm"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button onClick={handleSubmit}>Xem bảng lương</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {salaryData && (
                <div>
                    <h1>Bảng lương của bạn</h1>
                    <ul>
                        <li><strong>Tháng/Năm:</strong> {salaryData.month}/{salaryData.year}</li>
                        <li><strong>Số ngày làm việc:</strong> {salaryData.workDaysInMonth} ngày</li>
                        <li><strong>Số giờ tăng ca:</strong> {salaryData.totalOverTimeHours} giờ</li>
                        <li><strong>Khấu trừ:</strong> {salaryData.totalDeduction} VND</li>
                        <li><strong>Thưởng trong tháng:</strong> {salaryData.bonusInMonth} VND</li>
                        <li><strong>Lương thực nhận:</strong> {salaryData.netSalary} VND</li>
                        <li><strong>Ngày thanh toán:</strong> {salaryData.payDate}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GetSalaryReport;