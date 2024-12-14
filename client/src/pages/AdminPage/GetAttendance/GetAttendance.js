import React, { useState } from 'react';
import { getAttendance, getAttendanceByTeacherCode_Month_yaer, 
            updateAttendance, deleteAttendance } from '~/services/AdminService/attendanceService';
import { getDeductions, updateDeduction, deleteDeduction } from '~/services/AdminService/deductionService';
import classNames from 'classnames/bind';
import styles from './GetAttendance.module.scss';

const cx = classNames.bind(styles);

function GetAttendance() {
    const [attendanceId, setAttendanceId] = useState('');
    const [attendanceData, setAttendanceData] = useState(null);
    // const [deductionData, setDeductionData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setAttendanceId(e.target.value);
    };

    const handleSearch = async () => {
        try {
            let attendanceResponse, deductionsResponse;
    
            if (attendanceId.includes('/')) {
                const [teacherCode, month, year] = attendanceId.split('/');
                [attendanceResponse, deductionsResponse] = await Promise.all([
                    getAttendanceByTeacherCode_Month_yaer(teacherCode, parseInt(month), parseInt(year)),
                    getDeductions(teacherCode, parseInt(month), parseInt(year)),
                ]);
            } else {
                attendanceResponse = await getAttendance(attendanceId);
            }
    
            if (attendanceResponse?.code === 1000 && deductionsResponse?.code === 1000) {
                const attendanceData = attendanceResponse.result;
                const deductionData = deductionsResponse.result;
    
                // Tạo map từ dữ liệu deductions theo ngày
                const deductionMap = deductionData.reduce((map, deduction) => {
                    map[deduction.date] = deduction;
                    return map;
                }, {});
    
                const combinedData = attendanceData.map(attendance => ({
                    date: attendance.date,
                    attendance: attendance,
                    deduction: deductionMap[attendance.date] || null,
                }));
    
                deductionData.forEach(deduction => {
                    if (!combinedData.find(item => item.date === deduction.date)) {
                        combinedData.push({
                            date: deduction.date,
                            attendance: null,
                            deduction: deduction,
                        });
                    }
                });

                console.log('Dữ liệu kết hợp:', combinedData);
                setAttendanceData(combinedData);
                setError(null);
            } else {
                setAttendanceData(null);
                setError("Không thể lấy dữ liệu từ API.");
            }
        } catch (err) {
            console.error("Error fetching attendance or deductions:", err);
            setAttendanceData(null);
            setError("Lỗi khi lấy thông tin điểm danh.");
        }
    };

    const handleUpdateField = (index, fieldPath, value) => {
        setAttendanceData((prevData) => {
            if (Array.isArray(prevData)) {
                return prevData.map((item, i) => {
                    if (i !== index) return item;
    
                    const updatedItem = { ...item };
                    const [parentField, subField] = fieldPath.split('.');
    
                    if (subField) {
                        updatedItem[parentField] = {
                            ...updatedItem[parentField],
                            [subField]: value,
                        };
                    } else {
                        updatedItem[parentField] = value;
                    }
    
                    return updatedItem;
                });
            }
            return prevData;
        });
    };

    const handleSave = async (index) => {
        try {
            const dataToSave = attendanceData[index];

            for(let key in dataToSave.attendance) {
                if (!dataToSave.attendance[key]) {
                    dataToSave.attendance[key] = null;
                }
            };

            for( let key in dataToSave.deduction) {
                if (!dataToSave.deduction[key]) {
                    dataToSave.deduction[key] = null;
                }
            };
            
            const attendanceRes = await updateAttendance(
                dataToSave.attendance.attendanceId,
                dataToSave.attendance
            );
            console.log('Attendance Save Response:', attendanceRes);
    
            if (dataToSave.deduction) {
                const deductionRes = await updateDeduction(
                    dataToSave.deduction.deductionId,
                    dataToSave.deduction
                );
                console.log('Deduction Save Response:', deductionRes);
            }
    
            alert('Cập nhật thành công!');
            await handleSearch();
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Lỗi khi cập nhật!');
        }
    };
    
    const handleDelete = async (deductionId, attendanceId) => {
        if (!deductionId && !attendanceId) {
            alert('ID giảm trừ hoặc ID điểm danh không hợp lệ!');
            return;
        }
    
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa các thông tin này?');
        if (!confirmDelete) return;
    
        try {
            const promises = [];
            if (deductionId) {
                promises.push(deleteDeduction(deductionId));
            }
            if (attendanceId) {
                promises.push(deleteAttendance(attendanceId));
            }
    
            const responses = await Promise.all(promises);
    
            const success = responses.every(res => res.code === 1000);
            if (success) {
                alert('Xóa thành công!');
                await handleSearch(); 
            } else {
                const errorMessage = responses
                    .filter(res => res.code !== 1000)
                    .map(res => res.message || 'Lỗi khi xóa!')
                    .join('\n');
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('Lỗi khi gọi API xóa!');
        }
    };
    
    
    
    return (
        <div className={cx('container')}>
            <h2 className={cx('heading')}>Tìm kiếm thông tin điểm danh</h2>
            <div className={cx('searchContainer')}>
                <label>Mã điểm danh:</label>
                <input
                    type="text"
                    value={attendanceId}
                    onChange={handleChange}
                    className={cx('input')}
                />
                <button onClick={handleSearch} className={cx('button')}>Tìm</button>
            </div>

            {error && <div className={cx('error')}>{error}</div>}

            {attendanceData ? (
    <div className={cx('combinedInfo')}>
        <h3>Thông tin chi tiết:</h3>
        <table className={cx('combinedTable')}>
            <thead>
                <tr>
                    <th>Ngày</th>
                    <th>ID điểm danh</th>
                    <th>Giờ vào</th>
                    <th>Giờ ra</th>
                    <th>Số giờ làm thêm</th>
                    <th>Loại nghỉ phép</th>
                    <th>ID giảm trừ</th>
                    <th>Loại giảm trừ</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {attendanceData.map((data, index) => (
                    <tr key={data.attendance.attendanceId || index}>
                        {/* Attendance Data */}
                        <td>{data.date}</td>
                        <td>{data.attendance.attendanceId}</td>
                        <td>
                            <input
                                type="time"
                                value={data.attendance.checkIn}
                                onChange={(e) =>
                                    handleUpdateField(index, 'attendance.checkIn', e.target.value)
                                }
                                className={cx('input')}
                            />
                        </td>
                        <td>
                            <input
                                type="time"
                                value={data.attendance.checkOut}
                                onChange={(e) =>
                                    handleUpdateField(index, 'attendance.checkOut', e.target.value)
                                }
                                className={cx('input')}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={data.attendance.overTimeHours}
                                onChange={(e) =>
                                    handleUpdateField(index, 'attendance.overTimeHours', e.target.value)
                                }
                                className={cx('input')}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={data.attendance.leaveType || ''}
                                onChange={(e) =>
                                    handleUpdateField(index, 'attendance.leaveType', e.target.value)
                                }
                                className={cx('input')}
                            />
                        </td>
                        
                        {/* Deduction Data */}
                        <td>{data.deduction?.deductionId || 'N/A'}</td>
                        <td>
                            <input
                                type="text"
                                value={data.deduction?.deductionType || ''}
                                onChange={(e) =>
                                    handleUpdateField(index, 'deduction.deductionType', e.target.value)
                                }
                                className={cx('input')}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={data.deduction?.description || ''}
                                onChange={(e) =>
                                    handleUpdateField(index, 'deduction.description', e.target.value)
                                }
                                className={cx('input')}
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => handleSave(index)}
                                className={cx('button')}
                            >
                                Lưu
                            </button>
                        </td>
                        <td>
                            {(data.deduction?.deductionId || data.attendance?.attendanceId) && (
                                <button
                                    onClick={() => handleDelete(data.deduction?.deductionId, data.attendance?.attendanceId)}
                                    className={cx('button', 'delete')}
                                >
                                    Xóa
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <div className={cx('error')}>Không có dữ liệu</div>
)}

        </div>
    );
}

export default GetAttendance;