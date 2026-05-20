import { ArrowBigDownDash, Award, BadgeDollarSign, Banknote, BanknoteArrowUp, Bell, Book, ChartGantt, CircleDollarSign, CircleUser, ClipboardClock, Coins, Contact, HandCoins, HelpCircle, Landmark, LayoutDashboard, MessageCircleQuestionMark, Pin, ShieldCheck, Sparkles, User, Users } from "lucide-react";
import { AuthenticatedRoutes } from "../routes/Routes";
import { AiFillNotification } from "react-icons/ai";

const SidebarContent = {
    User: [
        {
            id: "Dashboard",
            icon: <LayoutDashboard size={18} className="text-yellow-500" />,
            name: "Dashboard",
            link: AuthenticatedRoutes.USER_DASHBOARD,
        },
        {
            id: "Profile",
            icon: <CircleUser size={18} className="text-orange-400" />,
            name: "Profile",
            link: AuthenticatedRoutes.USER_PROFILE,
        },
        {
            id: "Withdraw Details",
            icon: <Landmark size={18} className="text-pink-400" />,
            name: "Withdraw Details",
            link: AuthenticatedRoutes.USER_WITHDRAW_DETAILS,
        },
        {
            id: "Account Statement",
            icon: <Contact size={18} className="text-green-400" />,
            name: "Account Statement",
            link: AuthenticatedRoutes.USER_ACCOUNT_STATEMENT,
        },
        {
            id: "Deposit/Withdraw History",
            icon: <ClipboardClock size={18} className="text-red-400" />,
            name: "Deposit/Withdraw History",
            link: AuthenticatedRoutes.USER_DEPOSIT_WITHDRAW_HISTORY,
        },
        {
            id: "Active Bets History",
            icon: <ShieldCheck size={18} className="text-blue-400" />,
            name: "Active Bets History",
            link: AuthenticatedRoutes.USER_ACTIVE_BETS_HISTORY,
        },
        {
            id: "Edit Stake",
            icon: <ShieldCheck size={18} className="text-yellow-400" />,
            name: "Edit Stake",
            link: AuthenticatedRoutes.USER_EDIT_STAKE,
        },
        {
            id: "Notifications",
            icon: <Bell size={18} className="text-red-400" />,
            name: "Notifications",
            link: AuthenticatedRoutes.USER_NOTIFICATIONS,
        },
    ],

    Admin: [
        {
            id: "Dashboard",
            icon: <LayoutDashboard size={18} className="text-teal-500" />,
            name: "Dashboard",
            link: AuthenticatedRoutes.ADMIN_DASHBOARD,
        },
        {
            id: "Team",
            icon: <User size={18} className="text-blue-500" />,
            name: "Team",
            options: [
                {
                    id: "All Team",
                    name: "All Team",
                    link: AuthenticatedRoutes.ADMIN_TEAM,
                },
            ],
        },



        // {
        //     id: "Withdraw",
        //     icon: <ArrowBigDownDash size={18} />,
        //     name: "Withdraw",
        //     options: [
        //         {
        //             id: "Withdraw Requests",
        //             name: "Withdraw Requests",
        //             link: AuthenticatedRoutes.ADMIN_WITHDRAWAL_REQUESTS,
        //         },
        //     ]
        // },
        // {
        //     id: "Admin Control",
        //     icon: <User size={18} className="text-blue-400" />,
        //     name: "Admin Control",
        //     options: [
        //         {
        //             id: "Upload Payment Info",
        //             name: "Upload Payment Info",
        //             link: AuthenticatedRoutes.ADMIN_UPLOAD_PAYMENT_INFO,
        //         },

        // ],
        // },


        // {
        //     id: "Ticket List",
        //     name: "Ticket List",
        //     icon: <HelpCircle size={18} className="text-green-500" />,
        //     link: AuthenticatedRoutes.ADMIN_ALL_RAISE_TICKET_LIST,
        // },
    ],
};

export default SidebarContent;
