import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from '../screen/user/UserDashboard';
import DashboardMain from '../layout/DashboardMain';
import AdminDashboard from '../screen/admin/AdminDashboard';
import { useSelector } from 'react-redux';
import { AuthenticatedRoutes, AuthRoutes } from '../routes/Routes';
import UserProfile from '../screen/user/profile/UserProfile';
import AdminAllTeam from '../screen/admin/team/AdminAllTeam';
import AdminWithdrawalRequests from '../screen/admin/withdrwal/AdminWithdrawalRequests';
import UploadPaymentInfo from '../screen/admin/Payment/UploadPaymentInfo';
import AdminRaiseTicketList from '../screen/admin/AdminRaiseTicketList';
import UserWithdrawDetails from '../screen/user/transaction/UserWithdrawDetails';
import UserAccountStatement from '../screen/user/transaction/UserAccountStatement';
import UserDepositWithdrawHistory from '../screen/user/transaction/UserDepositWithdrawHistory';
import UserActiveBetsHistory from '../screen/user/transaction/UserActiveBetsHistory';
import UserEditStake from '../screen/user/transaction/UserEditStake';
import UserNotifications from '../screen/user/UserNotifications';

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
                        path={AuthenticatedRoutes.USER_PROFILE}
                        element={
                            <DashboardMain inner={<UserProfile />} name="User Profile" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_WITHDRAW_DETAILS}
                        element={
                            <DashboardMain inner={<UserWithdrawDetails />} name="User Withdraw Details" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_ACCOUNT_STATEMENT}
                        element={
                            <DashboardMain inner={<UserAccountStatement />} name="User Account Statement" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_DEPOSIT_WITHDRAW_HISTORY}
                        element={
                            <DashboardMain inner={<UserDepositWithdrawHistory />} name="User Deposit Withdraw History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_ACTIVE_BETS_HISTORY}
                        element={
                            <DashboardMain inner={<UserActiveBetsHistory />} name="User Active Bets History" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_EDIT_STAKE}
                        element={
                            <DashboardMain inner={<UserEditStake />} name="User Edit Stake" />
                        }
                    />

                    <Route
                        path={AuthenticatedRoutes.USER_NOTIFICATIONS}
                        element={
                            <DashboardMain inner={<UserNotifications />} name="User Notifications" />
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
