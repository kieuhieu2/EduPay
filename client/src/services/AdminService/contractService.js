import httpRequest from "~/utils/httpRequest";

export const getContract = async (contractId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await httpRequest.get(`/contract/${contractId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        
    }
};

export const CreateContract = async (teacherCode ,contract) => {
    try {
        const token = localStorage.getItem('token');
        const res = await httpRequest.post(`/contract/${teacherCode}`, contract,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        
    }
};

export const updateContract = async (contractId, contract) => {
    try {
        const token = localStorage.getItem('token');
        const res = await httpRequest.put(`/contract/${contractId}`, contract,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        
    }
};