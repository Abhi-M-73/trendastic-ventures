import { ArrowBigDownDash, Award, BadgeDollarSign, BanknoteArrowUp, Book, ChartGantt, CircleDollarSign, CircleUser, Coins, HandCoins, HelpCircle, LayoutDashboard, MessageCircleQuestionMark, Pin, Sparkles, User, Users } from "lucide-react";
import { AuthenticatedRoutes } from "../routes/Routes";

const SidebarContent = {
    User: [
        {
            id: "Dashboard",
            icon: <LayoutDashboard className="text-red-500" />,
            name: "Dashboard",
            link: AuthenticatedRoutes.USER_DASHBOARD,
        },
        {
            id: "Team",
            icon: <User className="text-blue-400" />,
            name: "Team",
            options: [
                {
                    id: "Direct Team",
                    name: "Direct Team",
                    link: AuthenticatedRoutes.USER_DIRECT_TEAM,
                },
                {
                    id: "Level Team",
                    name: "Level Team",
                    link: AuthenticatedRoutes.USER_LEVEL_TEAM,
                },
            ],
        },
        {
            id: "Pay Help Queue",
            name: "Pay Help Queue",
            icon: <Coins className="text-purple-500" />,
            link: AuthenticatedRoutes.USER_PAY_HELP_QUEUES,
        },
        {
            id: "Get Help Queue",
            name: "Get Help Queue",
            icon: <HandCoins className="text-green-500" />,
            link: AuthenticatedRoutes.USER_GET_HELP_QUEUES,
        },
        // {
        //     id: "Income",
        //     icon: <Coins className="text-green-400" />,
        //     name: "Income",
        //     options: [
        //         {
        //             id: "Referral Income",
        //             name: "Referral Income",
        //             link: AuthenticatedRoutes.USER_REFERRAL_INCOME,
        //         },
        //         {
        //             id: "Level Income",
        //             name: "Level Income",
        //             link: AuthenticatedRoutes.USER_LEVEL_INCOME,
        //         },
        //         {
        //             id: "ROI Income",
        //             name: "ROI Income",
        //             link: AuthenticatedRoutes.USER_ROI_INCOME,
        //         },
        //         {
        //             id: "Rank Reward Income",
        //             name: "Rank Reward Income",
        //             link: AuthenticatedRoutes.USER_RANK_REWARD_INCOME,
        //         },
        //     ],
        // },
        {
            id: "Pin Activation",
            icon: <BanknoteArrowUp className="text-yellow-400" />,
            name: "Pin Activation",
            options: [
                {
                    id: "Activation Packages",
                    name: "Activation Packages",
                    link: AuthenticatedRoutes.USER_ACTIVATION_PACKAGES,
                },
                // {
                //     id: "Make Investment",
                //     name: "Deposit ",
                //     link: AuthenticatedRoutes.USER_MAKE_INVESTMENT,
                // },
                {
                    id: "Activation History",
                    name: "Activation History",
                    link: AuthenticatedRoutes.USER_INVESTMENT_HISTORY,
                },

                // {
                //     id: "Deposit",
                //     name: "Deposit",
                //     link: AuthenticatedRoutes.USER_DEPOSIT,
                // },
            ],
        },
        // {
        //     id: "Withdraw",
        //     icon: <ArrowBigDownDash className="text-red-400" />,
        //     name: "Withdraw",
        //     options: [
        //         {
        //             id: "Withdraw",
        //             name: "Withdraw",
        //             link: AuthenticatedRoutes.USER_WITHDRAWAL_REQUESTS,
        //         },
        //         {
        //             id: "Withdraw History",
        //             name: "Withdraw History",
        //             link: AuthenticatedRoutes.USER_WITHDRAWAL_HISTORY,
        //         },
        //     ],
        // },
        {
            id: "Support",
            icon: <MessageCircleQuestionMark className="text-blue-400" />,
            name: "Support",
            options: [
                {
                    id: "Raise Ticket",
                    name: "Raise Ticket",
                    link: AuthenticatedRoutes.USER_RAISE_TICKET,
                },
                {
                    id: "Raise Ticket History",
                    name: "Raise Ticket History",
                    link: AuthenticatedRoutes.USER_RAISE_TICKET_HISTORY,
                },
            ],
        },

        {
            id: "Transfer",
            icon: <User className="text-red-600" />,
            name: "Transfer",
            options: [
                {
                    id: "Pin Transfer",
                    name: "Pin Transfer",
                    link: AuthenticatedRoutes.USER_PIN_TRANSFER,
                },
                {
                    id: "Pin Transfer History",
                    name: "Pin Transfer History",
                    link: AuthenticatedRoutes.USER_PIN_TRANSFER_HISTORY,
                },
            ],
        },

        {
            id: "Profile",
            icon: <CircleUser className="text-orange-400" />,
            name: "Profile",
            link: AuthenticatedRoutes.USER_PROFILE,
        },
    ],

    Admin: [
        {
            id: "Dashboard",
            icon: <LayoutDashboard className="text-red-500" />,
            name: "Dashboard",
            link: AuthenticatedRoutes.ADMIN_DASHBOARD,
        },
        {
            id: "Team",
            icon: <User className="text-blue-500" />,
            name: "Team",
            options: [
                {
                    id: "All Team",
                    name: "All Team",
                    link: AuthenticatedRoutes.ADMIN_TEAM,
                },
            ],
        },
        {
            id: "GH & PH Queues",
            name: "GH & PH Queues",
            icon: <HandCoins className="text-green-500" />,
            link: AuthenticatedRoutes.ADMIN_GH_PH_QUEUES,
        },
        {
            id: "PH Assigned Users List",
            name: "PH Assigned User List",
            icon: <Book className="text-purple-500" />,
            link: AuthenticatedRoutes.ADMIN_ASSIGNED_PAY_HELP_HISTORY,
        },
        {
            id: "GH Assigned Users List",
            name: "GH Assigned User List",
            icon: <Users className="text-lime-500" />,
            link: AuthenticatedRoutes.ADMIN_ASSIGNED_GET_HELP_HISTORY,
        },
        {
            id: "5PH Completion User",
            name: "5PH Completion User",
            icon: <Award className="text-teal-500" />,
            link: AuthenticatedRoutes.ADMIN_5PH_COMPLETION_REWARD,
        },
        // {
        //     id: "Income Reports",
        //     icon: <CircleDollarSign className="text-green-500" />,
        //     name: "Income Reports",
        //     options: [
        //         {
        //             id: "Deposit History",
        //             name: "Deposit History",
        //             link: AuthenticatedRoutes.ADMIN_DEPOSIT_HISTORY,
        //         },
        //         {
        //             id: "Referral Income",
        //             name: "Referral Income",
        //             link: AuthenticatedRoutes.ADMIN_REFERRAL_INCOME,
        //         },
        //         {
        //             id: "Level Income",
        //             name: "Level Income",
        //             link: AuthenticatedRoutes.ADMIN_LEVEL_INCOME,
        //         },
        //         {
        //             id: "ROI Income",
        //             name: "ROI Income",
        //             link: AuthenticatedRoutes.ADMIN_ROI_INCOME,
        //         },
        //         {
        //             id: "Rank Reward Income",
        //             name: "Rank Reward Income",
        //             link: AuthenticatedRoutes.ADMIN_RANK_REWARD,
        //         },
        //     ],
        // },
        // {
        //     id: "Withdraw",
        //     icon: <ArrowBigDownDash />,
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
        //     icon: <User className="text-blue-400" />,
        //     name: "Admin Control",
        //     options: [
        //         {
        //             id: "Upload Payment Info",
        //             name: "Upload Payment Info",
        //             link: AuthenticatedRoutes.ADMIN_UPLOAD_PAYMENT_INFO,
        //         },

        // ],
        // },
        {
            id: "Pin Topup",
            icon: <Pin className="text-yellow-500" />,
            name: "Pin Topup",
            options: [
                {
                    id: "Pin Topup",
                    name: "Pin Topup",
                    link: AuthenticatedRoutes.ADMIN_PIN_TOPUP,
                },
                {
                    id: "Pin Topup History",
                    name: "Pin Topup History",
                    link: AuthenticatedRoutes.ADMIN_PIN_TOPUP_HISTORY,
                },
            ]
        },
        {
            id: "Activate User Pin",
            icon: <Sparkles className="text-orange-500" />,
            name: "Activate User Pin",
            options: [
                {
                    id: "Activate User Pin",
                    name: "Activate User Pin",
                    link: AuthenticatedRoutes.ADMIN_ACTIVATE_USER_PIN,
                },
                {
                    id: "Activate Pin History",
                    name: "Activate Pin History",
                    link: AuthenticatedRoutes.ADMIN_ACTIVATE_USER_PIN_HISTORY,
                },
            ]
        },
        {
            id: "Ticket List",
            name: "Ticket List",
            icon: <HelpCircle className="text-green-500" />,
            link: AuthenticatedRoutes.ADMIN_ALL_RAISE_TICKET_LIST,
        },
    ],
};

export default SidebarContent;
