import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRoiIncome } from "../../../api/user.api";
import ReusableDataTable from "../../../components/ui/ReusableDataTable";
import { dateFormatter, formatCurrency } from "../../../utils/additionalFn";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const UserRoiIncome = () => {
  const [searchParams] = useSearchParams();
  const investmentId = searchParams.get("investmentId");

  const { data, isLoading } = useQuery({
    queryKey: ["roiIncome", investmentId],
    queryFn: () => getRoiIncome(investmentId),
  });

  const rows = data?.data || [];

  const columns = [
    {
      label: "#",
      key: "sr",
      render: (value, row, rowIndex) => rowIndex + 1,
    },
    {
      label: "ROI Amount",
      key: "roiAmount",
      render: (value) =>
        formatCurrency(value?.toFixed(2) ?? 0),
    },
    {
      label: "ROI (%)",
      key: "percentage",
      render: (value) => `${value || 0} %`,
    },
    {
      label: "Base Amount",
      key: "investmentAmount",
      render: (value) =>
        formatCurrency(value?.toFixed(2) ?? 0),
    },
    {
      label: "Status",
      key: "status",
      render: () => {
        const value = "COMPLETED";
        const statusStyles = {
          SUCCESS: "bg-green-100 text-green-800",
          ACTIVE: "bg-green-100 text-green-800",
          COMPLETED: "bg-blue-100 text-blue-800",
          CANCELLED: "bg-red-100 text-red-800",
        };

        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[value] || "bg-gray-100 text-gray-800"
              }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      label: "Distribution Date",
      key: "creditedOn",
      render: (value) => dateFormatter(value),
    },
  ];

  return (
    <div className="w-full">
      <ReusableDataTable
        title="Roi Income"
        loading={isLoading}
        data={rows}
        columns={columns}
      />
    </div>
  );
};

export default UserRoiIncome;
