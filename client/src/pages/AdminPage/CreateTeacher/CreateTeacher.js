import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./CreateTeacher.module.scss";
import { createTeacher } from "~/services/AdminService/TeacherService";

const cx = classNames.bind(styles);

function CreateTeacher() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    address: "",
    phone: "",
    position: "TEACHER",
    qualificationOfTeacher: "MASTER",
    experience: "",
  });

  const [responseMessage, setResponseMessage] = useState("");  // To display success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const isValid = Object.values(formData).every((value) => value.trim() !== "");
    if (!isValid) {
      setResponseMessage("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      const result = await createTeacher(formData);
      console.log("Tạo giáo viên thành công:", result);
      setResponseMessage("Tạo giáo viên thành công!");
      alert("Tạo giáo viên thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo giáo viên:", error);
      setResponseMessage("Không thể tạo giáo viên. Vui lòng thử lại.");
    }
  };

  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      address: "",
      phone: "",
      position: "TEACHER",
      qualificationOfTeacher: "MASTER",
      experience: "",
    });
    setResponseMessage(""); 
  };

  return (
    <div className={cx("container")}>
      <h2 className={cx("heading")}>Nhập thông tin giáo viên</h2>

      {/* Display Response Message */}
      {responseMessage && <div className={cx("responseMessage")}>{responseMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className={cx("formGroup")}>
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="firstName">Họ:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nhập họ"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="lastName">Tên:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Nhập tên"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="dob">Ngày sinh:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="position">Vị trí:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          >
            <option value="TEACHER">Giáo viên</option>
            <option value="ASSISTANT">Tro giang</option>
          </select>
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="qualificationOfTeacher">Bằng cấp:</label>
          <select
            id="qualificationOfTeacher"
            name="qualificationOfTeacher"
            value={formData.qualificationOfTeacher}
            onChange={handleChange}
            required
          >
            <option value="MASTER">Thạc sĩ</option>
            <option value="BACHELOR">Cu nhan</option>
          </select>
        </div>

        <div className={cx("formGroup")}>
          <label htmlFor="experience">Kinh nghiệm (năm):</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Nhập số năm kinh nghiệm"
            required
          />
        </div>

        <div className={cx("buttons")}>
          <button type="submit">Lưu</button>
          <button type="button" onClick={handleReset}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTeacher;
