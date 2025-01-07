import React, { useEffect, useState } from 'react';
import { getAllTeachers, updateTeacher, deleleTeacher } from '~/services/AdminService/TeacherService';
import classNames from 'classnames/bind';
import styles from './GetTeacher.module.scss';

const cx = classNames.bind(styles);

function GetTeacher() {
    const [teachers, setTeachers] = useState([]);
    const [editTeacher, setEditTeacher] = useState(null);
    const [error, setError] = useState(null);

    // Fetch all teachers when component mounts
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const result = await getAllTeachers();
            setTeachers(result);
            setError(null);
        } catch (err) {
            setError('Lỗi khi lấy danh sách giáo viên.');
        }
    };

    const handleDelete = async (teacherCode) => {
        try {
            await deleleTeacher(teacherCode);
            setTeachers((prevTeachers) => prevTeachers.filter((t) => t.teacherCode !== teacherCode));
        } catch (err) {
            setError('Lỗi khi xóa giáo viên.');
        }
    };

    const handleEdit = (teacher) => {
        setEditTeacher(teacher);
    };

    const handleSave = async () => {
        try {
            // Gọi API để cập nhật thông tin giáo viên
            await updateTeacher(editTeacher.teacherCode, editTeacher);
            setEditTeacher(null); // Reset trạng thái sau khi lưu
            fetchTeachers(); // Refresh danh sách giáo viên
        } catch (err) {
            setError('Lỗi khi cập nhật giáo viên.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditTeacher({ ...editTeacher, [name]: value });
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('heading')}>Quản lý thông tin giáo viên</h2>

            {error && <div className={cx('error')}>{error}</div>}

            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Mã giáo viên</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ</th>
                        <th className={cx('nameColumn')}>Tên</th>
                        <th>Ngày sinh</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Vị trí</th>
                        <th>Bằng cấp</th>
                        <th className={cx('expColumn')}>Kinh nghiệm</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.teacherCode}>
                            {editTeacher?.teacherCode === teacher.teacherCode ? (
                                <>
                                    <td>{teacher.teacherCode}</td>
                                    <td><input name="username" value={editTeacher.username} onChange={handleChange} /></td>
                                    <td><input name="firstName" value={editTeacher.firstName} onChange={handleChange} /></td>
                                    <td><input name="lastName" value={editTeacher.lastName} onChange={handleChange} /></td>
                                    <td><input name="dob" value={editTeacher.dob} onChange={handleChange} /></td>
                                    <td><input name="email" value={editTeacher.email} onChange={handleChange} /></td>
                                    <td><input name="address" value={editTeacher.address} onChange={handleChange} /></td>
                                    <td><input name="phone" value={editTeacher.phone} onChange={handleChange} /></td>
                                    <td><input name="position" value={editTeacher.position} onChange={handleChange} /></td>
                                    <td><input name="qualificationOfTeacher" value={editTeacher.qualificationOfTeacher} onChange={handleChange} /></td>
                                    <td><input name="experience" value={editTeacher.experience} onChange={handleChange} /></td>
                                    <td>
                                        <button onClick={handleSave} className={cx('button', 'save')}>Lưu</button>
                                        <button onClick={() => setEditTeacher(null)} className={cx('button', 'cancel')}>Hủy</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{teacher.teacherCode}</td>
                                    <td>{teacher.username}</td>
                                    <td>{teacher.firstName}</td>
                                    <td>{teacher.lastName}</td>
                                    <td>{teacher.dob}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.address}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.position}</td>
                                    <td>{teacher.qualificationOfTeacher}</td>
                                    <td>{teacher.experience}</td>
                                    <td>
                                        <button onClick={() => handleEdit(teacher)} className={cx('button', 'edit')}>Sửa</button>
                                        <button onClick={() => handleDelete(teacher.teacherCode)} className={cx('button', 'delete')}>Xóa</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetTeacher;
