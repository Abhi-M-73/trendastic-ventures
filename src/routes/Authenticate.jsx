import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from '../screen/user/UserDashboard';
import DashboardMain from '../layout/DashboardMain';
import AdminDashboard from '../screen/admin/AdminDashboard';
import { useSelector } from 'react-redux';
import { AuthenticatedRoutes, AuthRoutes } from '../routes/Routes';
import UserDirectTeam from '../screen/user/team/UserDirectTeam';
import UserLevelTeam from '../screen/user/team/UserLevelTeam';
import UserReferralIncome from '../screen/user/income/UserReferralIncome';
import UserLevelIncome from '../screen/user/income/UserLevelIncome';
import UserRoiIncome from '../screen/user/income/UserRoiIncome';
import UserDeposit from '../screen/user/payment/UserDeposit';
import UserPackageActivationHistory from '../screen/user/investment/UserPackageActivationHistory';
import UserProfile from '../screen/user/profile/UserProfile';
import UserRaiseTicket from '../screen/user/support/UserRaiseTicket';
import UserRaiseTicketHistory from '../screen/user/support/UserRaiseTicketHistory';
import AdminAllTeam from '../screen/admin/team/AdminAllTeam';
import UserWithdraw from '../screen/user/payment/UserWithdraw';
import UserWithdrawHistory from '../screen/user/payment/UserWithdrawHistory';
import AdminReferralIncome from '../screen/admin/income/AdminReferralIncome';
import AdminRoiIncome from '../screen/admin/income/AdminRoiIncome';
import AdminLevelIncome from '../screen/admin/income/AdminLevelIncome';
import AdminWithdrawalRequests from '../screen/admin/withdrwal/AdminWithdrawalRequests';
import UploadPaymentInfo from '../screen/admin/Payment/UploadPaymentInfo';
import DepositHistory from '../screen/admin/income/DepositHistory';
import UserRankRewardIncome from '../screen/user/income/UserRankRewardIncome';
import RankReward from '../screen/admin/income/RankReward';
import UserActivationPackages from '../screen/user/investment/UserActivationPackages';
import AdminActivateUserPin from '../screen/admin/topup/AdminActivateUserPin';
import AdminPinTopupHistory from '../screen/admin/topup/AdminPinTopupHistory';
import AdminPinTopup from '../screen/admin/topup/AdminPinTopup';
import AdminAssignedPayHelpHistory from '../screen/admin/AdminAssignedPayHelpHistory';
import UserGetHelpQueues from '../screen/user/UserGetHelpQueues';
import UserPayHelpQueues from '../screen/user/UserPayHelpQueues';
import AdminGHPHQueues from '../screen/admin/AdminGHPHQueues';
import Admin5PhCompletionReward from '../screen/admin/Admin5PhCompletionReward';
import AdminActivatedPinHistory from '../screen/admin/topup/AdminActivatedPinHistory';
import UserPinTransfer from '../screen/user/transfer/UserPinTransfer';
import UserPinTransferHistory from '../screen/user/transfer/UserPinTransferHistory';
import AdminAssignedGetHelpHistory from '../screen/admin/AdminAssignedGetHelpHistory';
import AdminRaiseTicketList from '../screen/admin/AdminRaiseTicketList';

const Authenticate = () => {
    const { user } = useSelector((state) => state.auth);
    const role = user?.role;

    return (
        <Routes>
            {role === "user" && (
                <>
                    <Route
                        path={AuthenticatedRoutes.USER_DASHBOARD}
                        element={
                            <DashboardMain inner={<UserDashboard />} name="User Dashboard" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_DIRECT_TEAM}
                        element={
                            <DashboardMain inner={<UserDirectTeam />} name="User Direct Team" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_LEVEL_TEAM}
                        element={
                            <DashboardMain inner={<UserLevelTeam />} name="User Level Team" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_REFERRAL_INCOME}
                        element={
                            <DashboardMain inner={<UserReferralIncome />} name="User Referral Income" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_LEVEL_INCOME}
                        element={
                            <DashboardMain inner={<UserLevelIncome />} name="User Level Income" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_ROI_INCOME}
                        element={
                            <DashboardMain inner={<UserRoiIncome />} name="User ROI Income" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_DEPOSIT}
                        element={
                            <DashboardMain inner={<UserDeposit />} name="User Deposit" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_INVESTMENT_HISTORY}
                        element={
                            <DashboardMain inner={<UserPackageActivationHistory />} name="User Investment History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_ACTIVATION_PACKAGES}
                        element={
                            <DashboardMain inner={<UserActivationPackages />} name="User Activation Packages" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_WITHDRAWAL_REQUESTS}
                        element={
                            <DashboardMain inner={<UserWithdraw />} name="User Withdraw" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_WITHDRAWAL_HISTORY}
                        element={
                            <DashboardMain inner={<UserWithdrawHistory />} name="User Withdraw History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_RAISE_TICKET}
                        element={
                            <DashboardMain inner={<UserRaiseTicket />} name="Raise Ticket" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_RAISE_TICKET_HISTORY}
                        element={
                            <DashboardMain inner={<UserRaiseTicketHistory />} name="Raise Ticket History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_RANK_REWARD_INCOME}
                        element={
                            <DashboardMain inner={<UserRankRewardIncome />} name="Rank Reward Income" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_PROFILE}
                        element={
                            <DashboardMain inner={<UserProfile />} name="User Profile" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_PAY_HELP_QUEUES}
                        element={
                            <DashboardMain inner={<UserPayHelpQueues />} name="Pay Help Queues" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_GET_HELP_QUEUES}
                        element={
                            <DashboardMain inner={<UserGetHelpQueues />} name="Get Help Queues" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_PIN_TRANSFER}
                        element={
                            <DashboardMain inner={<UserPinTransfer />} name="Pin Transfer" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.USER_PIN_TRANSFER_HISTORY}
                        element={
                            <DashboardMain inner={<UserPinTransferHistory />} name="Pin Transfer History" />
                        }
                    />

                    <Route
                        path="*"
                        element={
                            role === "user"
                                ? <Navigate to={AuthenticatedRoutes.USER_DASHBOARD} />
                                : <Navigate to={AuthRoutes.USER_LOGIN} />
                        }
                    />
                </>
            )}


            {role === "admin" && (
                <>
                    <Route
                        path={AuthenticatedRoutes.LANDING}
                        element={<Navigate to={AuthenticatedRoutes.ADMIN_DASHBOARD} replace />}
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_DASHBOARD}
                        element={
                            <DashboardMain inner={<AdminDashboard />} name="Admin Dashboard" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_TEAM}
                        element={
                            <DashboardMain inner={<AdminAllTeam />} name="All Team" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_PIN_TOPUP}
                        element={
                            <DashboardMain inner={<AdminPinTopup />} name="Pin Topup" />
                        }
                    />
                   
                    <Route
                        path={AuthenticatedRoutes.ADMIN_PIN_TOPUP_HISTORY}
                        element={
                            <DashboardMain inner={<AdminPinTopupHistory />} name="Admin Pin Topup History" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_ACTIVATE_USER_PIN}
                        element={
                            <DashboardMain inner={<AdminActivateUserPin />} name="Activate User Pin" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_ACTIVATE_USER_PIN_HISTORY}
                        element={
                            <DashboardMain inner={<AdminActivatedPinHistory />} name="Pin Activation History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_REFERRAL_INCOME}
                        element={
                            <DashboardMain inner={<AdminReferralIncome />} name="Admin Referral Income" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_ROI_INCOME}
                        element={
                            <DashboardMain inner={<AdminRoiIncome />} name="Admin ROI Income" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_LEVEL_INCOME}
                        element={
                            <DashboardMain inner={<AdminLevelIncome />} name="Admin Level Income" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_WITHDRAWAL_REQUESTS}
                        element={
                            <DashboardMain inner={<AdminWithdrawalRequests />} name="Admin Withdrawal Requests" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_UPLOAD_PAYMENT_INFO}
                        element={
                            <DashboardMain inner={<UploadPaymentInfo />} name="Upload Payment Info" />
                        }
                    />
                    <Route
                        path={AuthenticatedRoutes.ADMIN_DEPOSIT_HISTORY}
                        element={
                            <DashboardMain inner={<DepositHistory />} name="Upload Payment Info" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_RANK_REWARD}
                        element={
                            <DashboardMain inner={<RankReward />} name="Rank Reward Income" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_GH_PH_QUEUES}
                        element={
                            <DashboardMain inner={<AdminGHPHQueues />} name="GH & PH Queues" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_ASSIGNED_PAY_HELP_HISTORY}
                        element={
                            <DashboardMain inner={<AdminAssignedPayHelpHistory />} name="Assigned Pay Help History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_ASSIGNED_GET_HELP_HISTORY}
                        element={
                            <DashboardMain inner={<AdminAssignedGetHelpHistory />} name="Assigned Get Help History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_5PH_COMPLETION_REWARD}
                        element={
                            <DashboardMain inner={<Admin5PhCompletionReward />} name="5PH Completion Reward" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.ADMIN_ALL_RAISE_TICKET_LIST}
                        element={
                            <DashboardMain inner={<AdminRaiseTicketList />} name="Raise Ticket List" />
                        }
                    />
                </>
            )}

            <Route
                path="*"
                element={
                    role === "admin"
                        ? <Navigate to={AuthenticatedRoutes.ADMIN_DASHBOARD} />
                        : <Navigate to={AuthRoutes.ADMIN_LOGIN} />
                }
            />
        </Routes>
    );
};

export default Authenticate;
