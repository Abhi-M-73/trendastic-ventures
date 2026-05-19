import Axios from "../utils/Axios";

const API = "/users"

export const userRegister = async (payload) => {
    const response = await Axios.post(`${API}/register`, payload);
    return response.data;
}

export const userLogin = async (payload) => {
    const response = await Axios.post(`${API}/login`, payload);
    return response.data;
}

export const sendOtpForResetPassword = async (payload) => {
    const response = await Axios.post(`${API}/send-password-otp`, payload);
    return response.data;
}

export const resetPassword = async (payload) => {
    const response = await Axios.post(`${API}/reset-password`, payload);
    return response.data;
}

export const getUserProfile = async () => {
    const response = await Axios.get(`${API}/get-profile`);
    return response.data;
}

export const updateUserProfile = async (payload) => {
    const response = await Axios.put(`${API}/update-profile`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}

export const buyPlanPackage = async (payload) => {
    const response = await Axios.post(`${API}/buy-package`, payload);
    return response.data;
}

export const makeInvestment = async (payload) => {
    const response = await Axios.post(`${API}/buy-package`, payload);
    return response.data;
}

export const activatePinApi = async (payload) => {
    const response = await Axios.post(`${API}/activate-user-pin`, payload);
    return response.data;
}

export const getActivatedPinHistory = async () => {
    const response = await Axios.get(`${API}/get-activate-pin-users-history`);
    return response.data;
}

export const userDepositApi = async (payload) => {
    const response = await Axios.post(`${API}/make-investment`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}

export const getDepositDetails = async () => {
    const response = await Axios.get(`${API}/get-qr`);
    return response.data;
}

export const getActivationPackages = async () => {
    const response = await Axios.get(`${API}/get-pin-packages`);
    return response.data;
}

export const getDirectTeam = async () => {
    const response = await Axios.get(`${API}/get-direct-team`);
    return response.data;
}

export const getLevelTeam = async () => {
    const response = await Axios.get(`${API}/get-level-team`);
    return response.data;
}

export const getReferralIncome = async () => {
    const response = await Axios.get(`${API}/get-referral-income`);
    return response.data;
}

export const getLevelIncome = async () => {
    const response = await Axios.get(`${API}/get-level-income`);
    return response.data;
}

export const getRoiIncome = async () => {
    const response = await Axios.get(`${API}/get-roi-income`);
    return response.data;
}

export const withdrawalRequest = async (payload) => {
    const response = await Axios.post(`${API}/withdrawal-request`, payload);
    return response.data;
}

export const getWithdrawalHistory = async () => {
    const response = await Axios.get(`${API}/withdrawals-history`);
    return response.data;
}


export const raiseTicket = async (payload) => {
    const response = await Axios.post(`${API}/support/create`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}

export const getRaiseTicketHistory = async () => {
    const response = await Axios.get(`${API}/support/messages`);
    return response.data;
}

export const deleteRaiseTicket = async (ticketId) => {
    const response = await Axios.delete(`${API}/delete-raise-ticket/${ticketId}`);
    return response.data;
}

export const getRankRewardIncome = async () => {
    const response = await Axios.get(`${API}/get-reward-history`);
    return response.data;
}

export const getUserPayHelpQueues = async () => {
    const response = await Axios.get(`${API}/get-pay-help-queue-history`);
    return response.data;
}
export const getUserGetHelpQueues = async () => {
    const response = await Axios.get(`${API}/get-help-queue-history`);
    return response.data;
}

export const payToAssignedUser = async (payload) => {
    const response = await Axios.post(`${API}/pay-help`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
}


export const approveGetHelp = async (id) => {
    const response = await Axios.get(`${API}/approve-payment/${id}`);
    return response.data;
}

export const rejectGetHelp = async (id) => {
    const response = await Axios.get(`${API}/reject-payment/${id}`);
    return response.data;
}

export const findUserByUsernameApi = async (payload) => {
    const response = await Axios.post(`${API}/get-info`, payload);
    return response.data;
}


export const transferPin = async (payload) => {
    const response = await Axios.post(`${API}/transfer-pin`, payload);
    return response.data;
}


export const getTransferPinHistory = async () => {
    const response = await Axios.get(`${API}/get-transfer-pin-history`);
    return response.data;
}
