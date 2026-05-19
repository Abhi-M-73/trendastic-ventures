import React from 'react'
import AdminGetHelpQueues from './AdminGetHelpQueues'
import AdminPayHelpQueues from './AdminPayHelpQueues'

const AdminGHPHQueues = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminGetHelpQueues />
          <AdminPayHelpQueues />
      </div>
  )
}

export default AdminGHPHQueues
