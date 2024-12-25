import httpRequest from "~/utils/httpRequest";

export const getDeductionCosts = () => {
    try {
        const token = localStorage.getItem("token");
        const res = httpRequest.get('/deductionCost/',{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    return res;

    } catch (error) {
        console.error(error);
    }
};

export const updateDeductionCost = (deductionCostId, data) => {
    try {
        const token = localStorage.getItem("token");
        const res = httpRequest.put(`/deductionCost/${deductionCostId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};