import React from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const DashboardMain = ({ inner, name = "user", }) => {
    const { email, username, role, profileImage } = useSelector((state) => state?.auth?.user) || {};

    return (
        <div className="min-h-screen mainBgColor text-white">
            <Sidebar />
            <div className="lg:ml-64">
                <div className="">
                    <DashboardHeader name={name} email={email} username={username} role={role} profileImage={profileImage} />
                    <main className="p-5">
                        {inner}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;
