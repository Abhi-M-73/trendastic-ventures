import Axios from "../utils/Axios";
const API = "/admin"

export const adminLogin = async (payload) => {
    const response = await Axios.post(`${API}/login`, payload);
    return response.data;
}

export const changeUserPasswordApi = async (payload) => {
    const response = await Axios.post(`${API}/edit-password`, payload);
    return response.data;
}

export const getAllIncome = async (payload) => {
    const response = await Axios.get(`${API}/getAllIncomes`, payload);
    return response.data;
}

export const getAllTeam = async () => {
    const response = await Axios.get(`${API}/getAllUsers`);
    return response.data;
}

export const toggleLoginBlock = async (userId) => {
    const response = await Axios.get(`${API}/block-user/${userId}`);
    return response.data;
}

export const getUserByUsername = async (payload) => {
    const response = await Axios.post(`${API}/get-info`, payload);
    return response.data;
}

export const topupUser = async (payload) => {
    const response = await Axios.post(`${API}/admin-topup`, payload);
    return response.data;
}

export const getTopupHistory = async () => {
    const response = await Axios.get(`${API}/get-topup-history`);
    return response.data;
}
export const getQr = async () => {
    const response = await Axios.get(`${API}/get-qr`);
    return response.data;
}

export const uploadQr = async (payload) => {
    const response = await Axios.post(`${API}/upload-qr`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}

export const getAllDeposits = async (payload) => {
    const response = await Axios.get(`${API}/get-all-deposits`, payload);
    return response.data;
}

export const approveDeposit = async (id) => {
  if (!id) throw new Error("approveDeposit: id is required");
  const response = await Axios.post(`${API}/approve-deposit`, { id });
  return response.data;
};

export const rejectDeposit = async (id, reason) => {
  if (!id) throw new Error("rejectDeposit: id is required");
  const response = await Axios.post(`${API}/reject-deposit`, { id, reason });
  return response.data;
};



export const getAllWithdraw = async (payload) => {
    const response = await Axios.get(`${API}/withdrawal-reports`, payload);
    return response.data;
}

export const getAllLevelIncome = async (payload) => {
    const response = await Axios.get(`${API}/getAllLevelIncome-history`, payload);
    return response.data;
}

export const getAllReferalIncome = async (payload) => {
    const response = await Axios.get(`${API}/get-referalBonus-history`, payload);
    return response.data;
}

export const getAllRoi = async (payload) => {
    const response = await Axios.get(`${API}/get-roi-history`, payload);
    return response.data;
}

export const getAllReward = async (payload) => {
    const response = await Axios.get(`${API}/get-reward-history`, payload);
    return response.data;
}


export const approveWithdraw = async (id) => {
  if (!id) throw new Error("approveDeposit: id is required");
  const response = await Axios.post(`${API}/withdrawal-approve`, { id });
  return response.data;
};

export const rejectWithdraw = async (id, reason) => {
  if (!id) throw new Error("rejectDeposit: id is required");
  const response = await Axios.post(`${API}/withdrawal-reject`, { id, reason });
  return response.data;
};


export const pinTopupUser = async (payload) => {
    const response = await Axios.post(`${API}/activate-pin`, payload);
    return response.data;
}

export const getPinTopupHistory = async () => {
    const response = await Axios.get(`${API}/get-activate-pin-history`);
    return response.data;
}


export const activateUserPinByAdmin = async (payload) => {
    const response = await Axios.post(`${API}/activate-pin-by-admin`, payload);
    return response.data;
}

export const activateUserPinByAdminHistory = async () => {
    const response = await Axios.get(`${API}/get-admin-pin-activation-history`);
    return response.data;
}


export const getPayHelpQueueHistory = async () => {
    const response = await Axios.get(`${API}/pay-help-history`);
    return response.data;
}


export const getHelpQueueHistory = async () => {
    const response = await Axios.get(`${API}/get-help-users-list`);
    return response.data;
}


export const assignHelpToUser = async (payload) => {
    const response = await Axios.post(`${API}/assign-pay-help`, payload);
    return response.data;
}

export const getAssignedPayHelpUserList = async () => {
    const response = await Axios.get(`${API}/get-assigned-pay-help-users-list`);
    return response.data;
}

export const getAssignedGetHelpUserList = async () => {
    const response = await Axios.get(`${API}/get-manually-get-help-users-list`);
    return response.data;
}

export const getAll5PHUsers = async () => {
    const response = await Axios.get(`${API}/get-eligible-users`);
    return response.data;
}

export const assignUserToGH = async (payload) => {
    const response = await Axios.post(`${API}/assign-in-get-help`, payload);
    return response.data;
}


export const getAllUserTicketList = async () => {
    const response = await Axios.get(`${API}/support-in-process`);
    return response.data;
}

export const approveTicket = async (payload) => {
    const response = await Axios.post(`${API}/support/status/approve/${payload.id}`, payload);
    return response.data;
}

export const rejectTicket = async (payload) => {
    const response = await Axios.post(`${API}/support/status/reject/${payload.id}`, payload);
    return response.data;
}

