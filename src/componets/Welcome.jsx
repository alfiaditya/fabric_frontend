import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const fetchData = async () => {
    try {
      const usersData = await axios.get('http://localhost:5000/users');
      const sapiData = await axios.get('http://localhost:5000/sapi');

      const unconfirmedVaksinasiData = sapiData.data.filter(
        (sapi) => sapi.konfirmasiVaksinasi !== 'Sudah Dikonfirmasi'
      );
      const unconfirmedKelayakanData = sapiData.data.filter(
        (sapi) => sapi.konfirmasiKelayakan !== 'Sudah Dikonfirmasi'
      );
      const unverifiedUsersData = usersData.data.filter(
        (user) => user.statusPengguna === 'belum ter-verifikasi'
      );

      return {
        users: usersData.data,
        sapi: sapiData.data,
        unconfirmedVaksinasi: unconfirmedVaksinasiData,
        unconfirmedKelayakan: unconfirmedKelayakanData,
        unverifiedUsers: unverifiedUsersData,
      };
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const fetchedData = await fetchData();
      if (fetchedData) {
        setData(fetchedData);
      }
    };
    fetchDataAndSetState();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { users, sapi, unconfirmedVaksinasi, unconfirmedKelayakan, unverifiedUsers } = data;

  const isAdmin = user?.role === 'Admin';
  const isPeternak = user?.role === 'Peternak';
  const isDKPP = user?.role === 'DKPP';

  return (

    <div className="container mx-auto p-4">


      <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
   <div className="relative p-4 w-full max-w-2xl max-h-full">
  {/* Modal content */}
  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    {/* Modal header */}
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Static modal
      </h3>
      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
    </div>
    {/* Modal body */}
    <div className="p-4 md:p-5 space-y-4">
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
      </p>
      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
      </p>
    </div>
    {/* Modal footer */}
    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
      <button data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
      <button data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
    </div>
  </div>
</div>

</div>

      <div className="bg-slate-300 p-4 rounded-lg">
        <div className="text-3xl font-bold mb-4">Dashboard</div>
        <div className="text-xl mb-6">Selamat Datang, <span className="font-semibold">{user ? user.nama : "loading..."}</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {(isAdmin || isPeternak || isDKPP) && (
          <div className="bg-slate-300 p-4 rounded-lg">
            <div className="text-lg flex justify-center font-bold">Total Sapi</div>
            <div className="text-3xl font-bold flex justify-center mt-2">{sapi.length}</div>
          </div>
        )}
        {(!isAdmin && (isPeternak || isDKPP)) && (
          <>
            <div className="bg-slate-300 p-4 rounded-lg">
              <div className="text-lg flex justify-center font-bold">Total Sapi yang belum dikonfirmasi vaksinasi</div>
              <div className="text-3xl font-bold flex justify-center mt-2">{unconfirmedVaksinasi.length}</div>
            </div>
            <div className="bg-slate-300 p-4 rounded-lg">
              <div className="text-lg flex justify-center font-bold">Total Sapi yang belum cek kelayakan</div>
              <div className="text-3xl font-bold flex justify-center mt-2">{unconfirmedKelayakan.length}</div>
            </div>
          </>
        )}
        {isAdmin && (
          <>
            <div className="bg-slate-300 p-4 rounded-lg">
              <div className="text-lg flex justify-center font-bold">Total Pengguna</div>
              <div className="text-3xl font-bold flex justify-center mt-2">{users.length}</div>
            </div>
            <div className="bg-slate-300 p-4 rounded-lg">
              <div className="text-lg flex justify-center font-bold">Total Pengguna yang belum diverifikasi</div>
              <div className="text-3xl font-bold flex justify-center mt-2">{unverifiedUsers.length}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Welcome;

