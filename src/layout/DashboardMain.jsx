import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const DashboardMain = ({ inner, name = "user", }) => {
    const { email, username, role, profileImage } = useSelector((state) => state?.auth?.user) || {};
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="">
                <div className="">
                    <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen}  />
                    <main>
                        {inner}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;
