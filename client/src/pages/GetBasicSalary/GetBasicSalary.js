import React, { useState, useEffect } from 'react';
import { getMyBasicSalary } from '~/services/basicSalaryService'; 

function GetBasicSalary() {
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
        <div>
            {loading && <p>Đang tải...</p>} {/* Hiển thị khi đang tải */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
            
            {salaryData && (
                <div>
                    <h1>Thông tin lương cơ bản của bạn</h1>
                    <ul>
                        <li><strong>Lương cơ bản:</strong> {salaryData.basicSalary} VND</li>
                        <li><strong>Phụ cấp cố định:</strong> {salaryData.fixed_allowances} VND</li>
                        <li><strong>Tỉ lệ tăng ca:</strong> {salaryData.overtimeRate}</li>
                        <li><strong>Hình thức thanh toán:</strong> {salaryData.paymentType}</li>
                        <li><strong>Tiền tăng ca mỗi giờ:</strong> {salaryData.overtimePayPerHour} VND</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GetBasicSalary;
