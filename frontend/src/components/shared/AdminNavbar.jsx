import React from 'react'
import logo from '../../assets/image/logo/logo.png'

const AdminNavbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full h-auto flex items-center py-8 px-8 bg-transparent z-50">
                {/* Logo */}
                <div className="p-5 text-2xl font-bold">
                   <img src={logo} alt="" className='w-15 h-15'  />
                </div>
   </nav>
  )
}

export default AdminNavbar