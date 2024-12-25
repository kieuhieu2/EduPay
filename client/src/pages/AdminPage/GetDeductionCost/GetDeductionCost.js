import React, { useState, useEffect } from "react";
import { getDeductionCosts, updateDeductionCost } from "~/services/AdminService/deductionCostService";
import classNames from "classnames/bind";
import styles from "./GetDeductionCost.module.scss";

const cx = classNames.bind(styles);

function DeductionCost() {
    const [deductionData, setDeductionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(null); 
    const [formData, setFormData] = useState({ deductionCost: "", deductionType: "" });

    const fetchDeductionCosts = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getDeductionCosts();
            if (response) {
                setDeductionData(response.data.result);
            } else {
                setError("Không tìm thấy thông tin chi phí khấu trừ.");
            }
        } catch (err) {
            console.error(err);
            setError("Có lỗi xảy ra khi tải dữ liệu.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        setEditing(item.deductionCostId);
        setFormData({ deductionCost: item.deductionCost, deductionType: item.deductionType });
    };

    const handleCancelEdit = () => {
        setEditing(null);
        setFormData({ deductionCost: "", deductionType: "" });
    };

    const handleSave = async () => {
        try {
            const response = await updateDeductionCost(editing, formData);
            if (response.status === 200) {
                // Cập nhật lại danh sách sau khi sửa
                fetchDeductionCosts();
                handleCancelEdit();
            } else {
                setError("Không thể cập nhật chi phí khấu trừ.");
            }
        } catch (err) {
            console.error(err);
            setError("Có lỗi xảy ra khi cập nhật.");
        }
    };

    useEffect(() => {
        fetchDeductionCosts();
    }, []);

    return (
        <div className={cx("container")}>
            <h1 className={cx("title")}>Thông tin chi phí khấu trừ</h1>
            {loading && <p className={cx("loading")}>Đang tải...</p>}
            {error && <p className={cx("error")}>{error}</p>}
            {deductionData && deductionData.length > 0 ? (
                <table className={cx("deductionTable")}>
                    <thead>
                        <tr>
                            <th>ID Chi phí khấu trừ</th>
                            <th>Chi phí khấu trừ (VND)</th>
                            <th>Loại khấu trừ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deductionData.map((item) => (
                            <tr key={item.deductionCostId}>
                                <td>{item.deductionCostId}</td>
                                <td>
                                    {editing === item.deductionCostId ? (
                                        <input
                                            type="number"
                                            value={formData.deductionCost}
                                            onChange={(e) =>
                                                setFormData({ ...formData, deductionCost: e.target.value })
                                            }
                                        />
                                    ) : (
                                        item.deductionCost
                                    )}
                                </td>
                                <td>
                                    {editing === item.deductionCostId ? (
                                        <select
                                            value={formData.deductionType}
                                            onChange={(e) =>
                                                setFormData({ ...formData, deductionType: e.target.value })
                                            }
                                        >
                                            <option value="LATE">LATE</option>
                                            <option value="UNAPPROVED_ABSENCE">UNAPPROVED_ABSENCE</option>
                                        </select>
                                    ) : (
                                        item.deductionType
                                    )}
                                </td>
                                <td>
                                    {editing === item.deductionCostId ? (
                                        <>
                                            <button className={cx("saveButton")} onClick={handleSave}>
                                                Lưu
                                            </button>
                                            <button className={cx("cancelButton")} onClick={handleCancelEdit}>
                                                Hủy
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className={cx("editButton")}
                                            onClick={() => handleEditClick(item)}
                                        >
                                            Sửa
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={cx("noData")}>Không có thông tin chi phí khấu trừ.</p>
            )}
        </div>
    );
}

export default DeductionCost;
