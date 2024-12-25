import React, { useState } from 'react';
import classNames from 'classnames/bind'; 
import styles from './GetDeduction.module.scss'; 
import { getDeduction } from '~/services/AdminService/deductionService'; 

const cx = classNames.bind(styles); 

function GetDeduction() {
    const [deductionCode, setDeductionCode] = useState(""); 
    const [deductionData, setDeductionData] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSearch = async () => {
        if (!deductionCode) {
            setError("Vui lòng nhập mã khấu trừ.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await getDeduction(deductionCode); 
            if (data.code === 1000) {
                setDeductionData(data.result); 
            } else {
                setError(data.message); 
                setDeductionData(null);
            }
        } catch (err) {
            setError("Không thể lấy dữ liệu. Vui lòng thử lại.");
            setDeductionData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx("container")}>
            <h1>Tra cứu khấu trừ</h1>
            <div className={cx("search-input")}>
                <input
                    type="text"
                    placeholder="Nhập mã khấu trừ"
                    value={deductionCode}
                    onChange={(e) => setDeductionCode(e.target.value)}
                    className={cx("input")}
                />
                <button
                    onClick={handleSearch}
                    className={cx("search-button")}
                >
                    Tra cứu
                </button>
            </div>

            {/* Hiển thị thông báo khi đang tải dữ liệu */}
            {loading && <p>Đang tải dữ liệu...</p>}

            {/* Hiển thị thông báo lỗi */}
            {error && <p className={cx("error-message")}>{error}</p>}

            {/* Hiển thị kết quả khấu trừ khi có dữ liệu */}
            {deductionData && (
                <div className={cx("result")}>
                    <h2>Kết quả khấu trừ:</h2>
                    <table className={cx("result-table")}>
                        <thead>
                            <tr>
                                <th>Mã Khấu Trừ</th>
                                <th>Ngày</th>
                                <th>Loại Khấu Trừ</th>
                                <th>Số Lần</th>
                                <th>Mô Tả</th>
                                <th>Tổng Khấu Trừ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{deductionData.deductionId}</td>
                                <td>{deductionData.date}</td>
                                <td>{deductionData.deductionType}</td>
                                <td>{deductionData.amount}</td>
                                <td>{deductionData.description}</td>
                                <td>{deductionData.sumOfDeduction}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default GetDeduction;
