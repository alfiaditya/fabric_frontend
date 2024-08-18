import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormKonfirmasiKelayakan = () => {
  const [sapi, setSapi] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getSapi();
  }, []);

  const getSapi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sapi');
      setSapi(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateKelayakan = async (sapiUuid) => {
    try {
      await axios.patch(`http://localhost:5000/sapi/${sapiUuid}`, {
        konfirmasiKelayakan: 'Sudah Dikonfirmasi',
        konfirmasiKelayakanUpdatedAt: new Date(),
      });
      setSapi((prevSapi) => prevSapi.map((sapi) => 
        (sapi.uuid === sapiUuid ? { ...sapi, konfirmasiKelayakan: 'Sudah Dikonfirmasi' } : sapi)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirm = (sapiUuid) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data tidak bisa diubah, mohon dicek kembali!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, konfirmasi!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateKelayakan(sapiUuid);
        Swal.fire({
          title: 'Terkonfirmasi!',
          text: 'Data sapi telah dikonfirmasi.',
          icon: 'success',
        });
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSapi = sapi.filter((sapi) =>
    sapi.earTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sapi.jenisSapi.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((sapi) => 
  sapi.konfirmasiKelayakan !== 'Sudah Dikonfirmasi' &&  
  sapi.umurSekarang !== '' && 
  sapi.umurSekarang !== null
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className='font-bold grid justify-items-center text-3xl mt-6 mb-7'> KONFIRMASI KELAYAKAN </h1>
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
            placeholder="Cari Data Sapi..." 
            required 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">Cari</button>
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">No</th>
            <th scope="col" className="px-6 py-3">Ear Tag</th>
            <th scope="col" className="px-6 py-3">Jenis Sapi</th>
            <th scope="col" className="px-6 py-3">Tanggal Masuk</th>
            <th scope="col" className="px-6 py-3">Berat Awal</th>
            <th scope="col" className="px-6 py-3">Umur Masuk</th>
            <th scope="col" className="px-6 py-3">Berat sekarang</th>
            <th scope="col" className="px-6 py-3">Umur sekarang</th>
            <th scope="col" className="px-6 py-3">Status Vaksinasi</th>
            <th scope="col" className="px-6 py-3">Status Kelayakan</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSapi.map((sapi, index) => (
            <tr key={sapi.uuid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </th>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.earTag}>{sapi.earTag}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.jenisSapi}>{sapi.jenisSapi}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.tanggalMasuk}>{sapi.tanggalMasuk}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.beratAwal}>{sapi.beratAwal}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.umurMasuk}>{sapi.umurMasuk}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.beratSekarang}>{sapi.beratSekarang}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <div className="truncate" title={sapi.umurSekarang}>{sapi.umurSekarang}</div>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <span className={`truncate px-2 py-1 ${sapi.konfirmasiVaksinasi === 'Belum Dikonfirmasi' ? 'bg-red-700' : 'bg-green-700'} text-white rounded`}>
                  {sapi.konfirmasiVaksinasi}
                </span>
              </td>
              <td className="px-4 py-2 text-ellipsis overflow-hidden max-w-xs">
                <span className={`truncate px-2 py-1 ${sapi.konfirmasiKelayakan === 'Belum Dikonfirmasi' ? 'bg-red-700' : 'bg-green-700'} text-white rounded`}>
                  {sapi.konfirmasiKelayakan}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleConfirm(sapi.uuid)}
                  type="button"
                  className={`focus:outline-none text-white ${sapi.konfirmasiKelayakan === 'Belum Dikonfirmasi' ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-400 cursor-not-allowed'} focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                  disabled={sapi.konfirmasiKelayakan !== 'Belum Dikonfirmasi'}
                >
                  Konfirmasi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormKonfirmasiKelayakan;
