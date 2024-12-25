import React, { useState, useEffect } from 'react';
import { getMyBasicSalary } from '~/services/basicSalaryService'; 

import classNames from 'classnames/bind';
import style from './GetMyBasicSalary.module.scss';

const cx = classNames.bind(style);

function GetMyBasicSalary() {
    const [salaryData, setSalaryData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSalaryData = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getMyBasicSalary(); 
                setSalaryData(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalaryData();
    }, []);

    return (
        <div className={cx('container')}>
            {loading && <p className={cx('loading')}>Đang tải...</p>}
            {error && <p className={cx('error')}>{error}</p>}
            
            {salaryData && (
                <div>
                    <h1 className={cx('title')}>Thông tin lương cơ bản của bạn</h1>
                    <table className={cx('salaryTable')}>
                        <thead>
                            <tr>
                                <th>Lương cơ bản</th>
                                <th>Phụ cấp cố định</th>
                                <th>Tỉ lệ tăng ca</th>
                                <th>Hình thức thanh toán</th>
                                <th>Tiền tăng ca mỗi giờ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{salaryData.basicSalary} VND</td>
                                <td>{salaryData.fixed_allowances} VND</td>
                                <td>{salaryData.overtimeRate}</td>
                                <td>{salaryData.paymentType}</td>
                                <td>{salaryData.overtimePayPerHour} VND</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default GetMyBasicSalary;
