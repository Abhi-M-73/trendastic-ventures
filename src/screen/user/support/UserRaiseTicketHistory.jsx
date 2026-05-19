import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRaiseTicket, getRaiseTicketHistory } from "../../../api/user.api";
import ReusableDataTable from "../../../components/ui/ReusableDataTable";
import { dateFormatter } from "../../../utils/additionalFn";
import toast from "react-hot-toast";

const UserRaiseTicketHistory = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState(null);

  const { data } = useQuery({
    queryKey: ["raiseTicketHistory"],
    queryFn: getRaiseTicketHistory,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload) => deleteRaiseTicket(payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Ticket deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["raiseTicketHistory"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Ticket delete failed!");
    },
  });

  const tickets = data?.data || [];

  const statusTemplate = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-600",
      Approved: "bg-green-100 text-green-500",
      Rejected: "bg-red-100 text-red-500",
    };

    const safeStatus = status || "open";

    return (
      <span
        className={`${styles[safeStatus] || styles.open
          } py-1 px-3 font-medium text-xs rounded-full`}
      >
        {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
      </span>
    );
  };

  const handleDelete = (id) => {
    if (!id) return;
    mutate({ id });
  };

  const columns = [
    {
      label: "#",
      key: "sr",
      render: (value, row, rowIndex) => rowIndex + 1,
    },
    {
      label: "Subject",
      key: "subject",
    },
    {
      label: "Message",
      key: "message",
      render: (value) =>
        value ? (value.length > 50 ? value.slice(0, 50) + "..." : value) : "-",
    },
    {
      label: "Status",
      key: "status",
      render: (value) => statusTemplate(value),
    },
    {
      label: "Date",
      key: "createdAt",
      render: (value) => dateFormatter(value),
    },
    {
      label: "Action",
      key: "_id",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedTicket(row);
              setOpenModal(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            View
          </button>
          {/* <button onClick={() => mutate(row?._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
            Delete
          </button> */}
        </div>
      ),
    },
  ];



  return (
    <>
      <ReusableDataTable data={tickets} columns={columns} />

      {/* Popup Modal */}
      {openModal && selectedTicket && (
        <div className="fixed inset-0 min-h-screen overflow-y-auto bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full mx-auto shadow-lg relative">
            <h2 className="text-xl font-bold mb-3">Ticket Details</h2>
            <hr className="border mb-4 text-gray-300" />

            <div className="space-y-2">
              <p>
                <strong>Subject:</strong> {selectedTicket.subject || "-"}
              </p>
              <p>
                <strong>Message:</strong>{" "}
                {selectedTicket.message || "No message"}
              </p>
              <p className="flex items-center gap-1">
                <strong>Status:</strong> {statusTemplate(selectedTicket.status)}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {dateFormatter(selectedTicket.createdAt)}
              </p>
            </div>

            {/* Attachments Section */}
            <hr className="border my-4 text-gray-200" />

            <div>
              <h3 className="text-lg font-semibold mb-2">Attachments</h3>

              {selectedTicket?.proofImage?.url ? (
                <div className="flex flex-col">
                  <a
                    href={selectedTicket.proofImage.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={selectedTicket.proofImage.url}
                      alt="attachment"
                      className="w-full max-h-40 object-contain rounded border border-gray-300 mb-1"
                    />
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No attachments added for this ticket.
                </p>
              )}
            </div>

            {/* Admin Response Section (Static for now) */}
            <hr className="border my-4 text-gray-200" />
            <div>
              <h3 className="text-lg font-semibold">Admin Response:</h3>
              <p className="text-sm text-gray-700">
                {selectedTicket?.response ? selectedTicket.response : "We will get back to you soon."} 
              </p>
            </div>

            <button
              onClick={() => setOpenModal(false)}
              className="mt-4 bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRaiseTicketHistory;
