import React from 'react'
import AdminSettingsDashboard from '../../components/AdminSection/AdminSettingsDashboard'
import AdminHero from '../../components/reusable/AdminHero'


const AdminSettingsPage = () => {
  return (
    <div>
      <AdminHero 
                title="Manage Settings" 
                link="/admin/destination/new"
                button=""
            />
      <AdminSettingsDashboard />
    </div>
  )
}

export default AdminSettingsPage