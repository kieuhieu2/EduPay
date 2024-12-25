import styles from './GetMySalaryReport.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { getSalaryReport, createCustomerFeedback } from '~/services/salaryReportService';

const cx = classNames.bind(styles);

function GetSalaryReport() {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [salaryData, setSalaryData] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async () => {
        const teacherCode = localStorage.getItem('teacherCode');

        if (!teacherCode || !month || !year) {
            setError('Vui lòng nhập đủ thông tin');
            return;
        }

        try {
            const data = await getSalaryReport(teacherCode, month, year);
            setSalaryData(data);
            setError('');
            setSuccessMessage('');
        } catch (err) {
            setError('Không thể lấy báo cáo lương, vui lòng thử lại');
            setSalaryData(null);
        }
    };

    const handleSendFeedback = async () => {
        if (!feedback) {
            setError('Vui lòng nhập nội dung phản hồi');
            return;
        }

        try {
            const body = { "customerFeedback": feedback };
            await createCustomerFeedback(salaryData.salaryReportId, body);
            setSuccessMessage('Phản hồi của bạn đã được gửi thành công!');
            setError('');
            setFeedback('');
        } catch (err) {
            setError('Không thể gửi phản hồi, vui lòng thử lại');
        }
    };

    return (
        <div className={cx('container')}>
            <h1>Bảng lương của bạn</h1>

            {/* Input Section */}
            <div className={cx('inputGroup')}>
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

            {/* Hiển thị bảng lương */}
            {salaryData && (
                <div className={cx('salaryReport')}>
                    <table>
                        <thead>
                            <tr>
                                <th>Tháng/Năm</th>
                                <th>Số ngày làm việc</th>
                                <th>Số giờ tăng ca</th>
                                <th>Khấu trừ</th>
                                <th>Thưởng</th>
                                <th>Lương thực nhận</th>
                                <th>Ngày thanh toán</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{salaryData.month}/{salaryData.year}</td>
                                <td>{salaryData.workDaysInMonth} ngày</td>
                                <td>{salaryData.totalOverTimeHours} giờ</td>
                                <td>{salaryData.totalDeduction} VND</td>
                                <td>{salaryData.bonusInMonth} VND</td>
                                <td>{salaryData.netSalary} VND</td>
                                <td>{salaryData.payDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Feedback Section */}
            <div className={cx('feedbackSection')}>
                <textarea
                    placeholder="Nhập phản hồi của bạn"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <button onClick={handleSendFeedback}>Gửi phản hồi</button>
                {successMessage && <p className={cx('success')}>{successMessage}</p>}
                {error && <p className={cx('error')}>{error}</p>}
            </div>
        </div>
    );
}

export default GetSalaryReport;
