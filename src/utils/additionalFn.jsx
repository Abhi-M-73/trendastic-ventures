export const dateFormatter = (dateString) => {
    if (!dateString) return "N/A"; // 👈 important
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `${day} ${month} ${year}, ${time}`;
};

export const maskEmail = (email = "") => {
    if (typeof email !== "string" || !email.includes("@")) return email;
    const [local, domain] = email.split("@");
    const visibleCount = Math.min(local.length, 3);
    const visible = local.slice(0, visibleCount);
    const masked = "*".repeat(local.length - visibleCount);
    return `${visible}${masked}@${domain}`;
};


export const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length < 4) return phoneNumber;
    const startDigits = phoneNumber.slice(0, 2);
    const endDigits = phoneNumber.slice(-2);
    const maskedSection = "*".repeat(phoneNumber.length - 4);
    return `${startDigits}${maskedSection}${endDigits}`;
};

export const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

export const formatPercentage = (value) => {
    return `${value}%`;
}

export const legButton = (leg) => {
    return (
        <button className={`${leg === "left" ? "bg-blue-600" : leg === "right" ? "bg-green-600" : "bg-red-500"} text-white px-3 py-1 rounded-full capitalize text-xs`}>
            {leg ? leg : "N/A"}
        </button>
    )
}

export const statusButton = (status) => {
    return (
        <button className={`${status === true ? "bg-green-600" : "bg-red-500"} text-white px-3 py-1 rounded-full capitalize text-xs`}>
            {status === true ? "Verified" : "Not Verified"}
        </button>
    )
}


export const statusButton2 = (status) => {
    return (
        <button className={`${status === "completed" ? "bg-green-600" : status === "pending" ? "bg-yellow-500" : status === "processing" ? "bg-blue-600" : "bg-red-500"} text-white px-3 py-1 rounded-full capitalize text-xs`}>
            {status}
        </button>
    )
}

export const levelButton = (level) => {
    if (!level) return null;
    let bgColor = 'bg-gray-500';
    if (level === '1') return bgColor = 'bg-gray-600';
    if (level === '2') return bgColor = 'bg-blue-500';
    if (level === '3') return bgColor = 'bg-green-500';
    if (level === '4') return bgColor = 'bg-yellow-500';
    if (level === '5') return bgColor = 'bg-purple-500';
    if (level === '6') return bgColor = 'bg-pink-500';
    if (level === '7') return bgColor = 'bg-indigo-500';
    if (level === '8') return bgColor = 'bg-red-500';
    if (level === '9') return bgColor = 'bg-teal-500';
    if (level === '10') return bgColor = 'bg-orange-500';
    return (
        <button className={`${bgColor} text-white px-3 py-1 rounded-full capitalize text-xs`}>
            Level {level}
        </button>
    )
}
