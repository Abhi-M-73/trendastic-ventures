import { useQuery } from '@tanstack/react-query'
import ReusableDataTable from '../../../components/ui/ReusableDataTable'
import { getActivatedPinHistory } from '../../../api/user.api'
import { dateFormatter, formatCurrency } from '../../../utils/additionalFn'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const UserPackageActivationHistory = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, isLoading } = useQuery({
        queryKey: ['getActivatedPinHistory'],
        queryFn: getActivatedPinHistory,
    });

    const navigate = useNavigate();

    const columns = [
        { label: '#', key: 'sr', render: (value, row, rowIndex) => rowIndex + 1 },
        { label: 'Activated By', key: "senderId", render: (value) => value?.name || 'N/A' },
        { label: 'Activated By', key: "senderId", render: (value) => value?.username || 'N/A' },
        { label: 'Activated To', key: "receiverId", render: (value) => value?.name || 'N/A' },
        { label: 'Activated To', key: "receiverId", render: (value) => value?.username || 'N/A' },
        { label: 'Pin Type', key: "pinType"},
        { label: 'Activation Date', key: 'createdAt', render: (value) => dateFormatter(value) },
    ]

    return (
        <div>
            <ReusableDataTable
                title="Package Activation History"
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
            />

            {imagePreview && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={() => setImagePreview(null)}
                >
                    {/* Modal Box */}
                    <div
                        className="relative max-w-4xl w-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // 👈 important
                    >
                        {/* ❌ Close Button */}
                        <button
                            onClick={() => setImagePreview(null)}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-all"
                        >
                            ✕
                        </button>

                        {/* Image */}
                        <img
                            src={imagePreview}
                            alt="Proof"
                            className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPackageActivationHistory
