import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SapiList = () => {
  const [sapi, setSapi] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedSapi, setSelectedSapi] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getSapi();
  }, []);

  const getSapi = async () => {
    try {
      const response = await axios.get('http://fabric-ternak-backend.my.to/sapi');
      setSapi(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteSapi = async (sapiId) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data tidak bisa kembali, periksa ulang data sebelum dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancalButtonText: "Tidak"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://fabric-ternak-backend.my.to/sapi/${sapiId}`).then(() => {
            getSapi();
            Swal.fire({
              title: "Terhapus!",
              text: "Data berhasil dihapus!",
              icon: "success"
            });
          });
        } catch (error) {
          setError(error.message);
        }
      }
    });
  };
  
  

  const openModal = (sapi) => {
    setSelectedSapi(sapi);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSapi = sapi.filter((sapi) =>
    sapi.earTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sapi.jenisSapi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <h1 className='font-bold grid justify-items-center text-3xl mt-6 mb-7'> DATA SAPI </h1>
  {error && <p className="text-red-500">{error}</p>}

  <div className="flex justify-between items-center mt-3 mb-5">
    {user.role === 'Peternak' && (
      <Link to='/sapi/tambah'>
        <button
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
        >
          Tambah Sapi
        </button>
      </Link>
    )}
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

  <div className="overflow-x-auto">
    <table className="w-full min-w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <td className="px-4 py-2 flex flex-col space-y-2">
              <button onClick={() => openModal(sapi)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detail</button>
              {user.role === 'Peternak' && (
                <button onClick={() => deleteSapi(sapi.uuid)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Modal */}
  <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`fixed inset-0 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
  <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>
  <div className="z-10 bg-white w-96 max-h-[60vh] overflow-y-auto rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Detail Sapi</h2>
    {selectedSapi && (
      <form disabled>
        <div className="mb-4">
          <label className="block text-gray-700">Ear Tag:</label>
          <input type="text" value={selectedSapi.earTag} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Jenis Sapi:</label>
          <input type="text" value={selectedSapi.jenisSapi} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal Masuk:</label>
          <input type="text" value={selectedSapi.tanggalMasuk} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Berat Awal:</label>
          <input type="text" value={selectedSapi.beratAwal} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Umur Masuk:</label>
          <input type="text" value={selectedSapi.umurMasuk} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Foto Sapi:</label>
          <img src={`https://ipfs.io/ipfs/${selectedSapi.arsipSapi}`} alt="Foto Sapi" className="w-full h-auto border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Berat Sekarang:</label>
          <input type="text" value={selectedSapi.beratSekarang} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Umur Sekarang:</label>
          <input type="text" value={selectedSapi.umurSekarang} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Waktu Pembaruan:</label>
          <input type="text" value={selectedSapi.waktuPembaruan} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Konfirmasi Vaksinasi:</label>
          <input type="text" value={selectedSapi.konfirmasiVaksinasi} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Waktu Konfirmasi Vaksinasi:</label>
          <input type="text" value={selectedSapi.konfirmasiVaksinasiUpdatedAt} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Foto Surat Vaksinasi:</label>
          <img src={`https://ipfs.io/ipfs/${selectedSapi.arsipSertifikat}`} alt="Foto Surat Vaksinasi" className="w-full h-auto border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Konfirmasi Kelayakan:</label>
          <input type="text" value={selectedSapi.konfirmasiKelayakan} className="w-full p-2 border rounded" readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Waktu Konfirmasi Kelayakan:</label>
          <input type="text" value={selectedSapi.konfirmasiKelayakanUpdatedAt} className="w-full p-2 border rounded" readOnly />
        </div>
      </form>
    )}
    <button onClick={closeModal} className="mt-4 bg-gray-500 text-white px-5 py-2.5 rounded-md">Close</button>
  </div>
</div>
</div>

  );
};

export default SapiList;
