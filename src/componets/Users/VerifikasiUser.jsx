import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const VerifikasiUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://fabric-ternak-backend.my.too/users');
        setUsers(usersResponse.data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (userId) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data tidak dapat diubah setelah verifikasi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Ya, verifikasi!",
      cancelButtonText: "Batal"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://fabric-ternak-backend.my.too/users/${userId}`, {
            statusPengguna: 'sudah ter-verifikasi',
          });

          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.uuid === userId ? { ...user, statusPengguna: 'sudah ter-verifikasi' } : user
            )
          );

          Swal.fire(
            'Terverifikasi!',
            'Status pengguna telah diperbarui.',
            'success'
          );
        } catch (error) {
          setError(error.message);
          console.error('Error updating status:', error.response?.data || error.message);
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.statusPengguna.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((user) => 
    user.statusPengguna !== 'sudah ter-verifikasi' 
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="font-bold grid justify-items-center text-3xl mt-6 mb-7">DATA PENGGUNA</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end items-center mt-3 mb-5">
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#24292F]/50 focus:border-[#24292F]/50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#24292F]/50 dark:focus:border-[#24292F]/50" 
            placeholder="Cari Data Pengguna..." 
            required 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">Cari</button>
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full min-w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.uuid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </th>
              <td className="px-6 py-4">
                {user.nama}
              </td>
              <td className="px-6 py-4">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {user.role}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 ${user.statusPengguna === 'belum ter-verifikasi' ? 'bg-red-700' : 'bg-green-700'} text-white rounded`}>
                  {user.statusPengguna}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => updateStatus(user.uuid)}
                  type="button"
                  className={`focus:outline-none text-white ${user.statusPengguna === 'belum ter-verifikasi' ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'} focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                  disabled={user.statusPengguna !== 'belum ter-verifikasi'}
                >
                  Verifikasi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default VerifikasiUser;
