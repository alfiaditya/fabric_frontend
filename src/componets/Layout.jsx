import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';
import { PiCowFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaCow } from "react-icons/fa6";
import { IoQrCode } from "react-icons/io5";
import { MdVaccines } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      {user && (user.role === 'Admin' || user.role === 'Peternak' || user.role === 'DKPP') && (
        <>
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
          </button>
          <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <NavLink to="/" className="flex items-center ps-2.5 mb-5">
                <img src={logo} className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dinas Peternakan</span>
              </NavLink>
              <ul className="space-y-2 font-medium">
                <li>
                  <NavLink to={"/dashboard"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <MdDashboard className='w-7 h-7' />
                    <span className="ms-3">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/sapi"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <PiCowFill className='w-7 h-7' />
                    <span className="flex-1 ms-3 whitespace-nowrap">Data Sapi</span>
                  </NavLink>
                </li>
                {user && user.role === 'Admin' && (
                  <>
                    <li>
                      <NavLink to={"/users"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <FaUsers className='w-7 h-7 ' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Data Pengguna</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/verifikasi"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <FaUserCheck className='w-7 h-7' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Verifikasi Pengguna</span>
                      </NavLink>
                    </li>
                  </>
                )}
                {user && user.role === 'Peternak' && (
                  <>
                    <li>
                      <NavLink to={"/Pembaruan"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <FaCow className='w-7 h-7' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Pembaruan Data Sapi</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/upload"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IoMdCloudUpload className='w-7 h-7' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Simpan Ke Blockchain</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/generate"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <IoQrCode className='w-7 h-7' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Generate Qr Code</span>
                      </NavLink>
                    </li>
                  </>
                )}
                {user && user.role === 'DKPP' && (
                  <>
                    <li>
                      <NavLink to={"/vaksinasi"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdVaccines className='w-7 h-7' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Konfirmasi Vaksinasi</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/kelayakan"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <MdOutlineAddTask className='w-7 h-7' />
                        <span className="flex-1 ms-3 whitespace-nowrap">Konfirmasi Kelayakan</span>
                      </NavLink>
                    </li>
                  </>
                )}
                <hr />
                <li>
                  <div onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <RiLogoutBoxFill className='w-7 h-7' />
                    <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </>
      )}
      <div className="p-4 sm:ml-64">
        {children}
      </div>
    </div>
  );
}

export default Layout;
