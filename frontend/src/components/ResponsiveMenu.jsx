import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const { isAuthenticated, user } = useAuth()
    // No Clerk, so always show Guest
    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
            <div>
                <div className='flex items-center justify-start gap-3'>
                    <FaUserCircle size={50} />
                    <div>
                        <h1>Hello, Guest</h1>
                        <h1 className='text-sm text-slate-500'>Guest</h1>
                    </div>
                </div>
                <nav className='mt-12'>
                    <ul className='flex flex-col gap-7 text-2xl font-semibold'>
                        <NavLink to={'/'} onClick={()=>setOpenNav(false)} className="cursor-pointer"><li>Home</li></NavLink>
                        <NavLink to={"/products"} onClick={()=>setOpenNav(false)} className="cursor-pointer"><li>Products</li></NavLink>
                        <NavLink to={"/about"} onClick={()=>setOpenNav(false)} className="cursor-pointer"><li>About</li></NavLink>
                        <NavLink to={"/contact"} onClick={()=>setOpenNav(false)} className="cursor-pointer"><li>Contact</li></NavLink>
                        {isAuthenticated && user?.isAdmin && (
                            <NavLink to={"/admin/add-product"} onClick={()=>setOpenNav(false)} className="cursor-pointer"><li className='flex items-center gap-2'><Plus size={24} />Add Product</li></NavLink>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default ResponsiveMenu
