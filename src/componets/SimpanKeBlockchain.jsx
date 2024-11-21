import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SimpanKeBlockchain = () => {
  const [sapi, setSapi] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [blockchainEarTags, setBlockchainEarTags] = useState([]);

  useEffect(() => {
    getSapi();
    fetchBlockchainData();
  }, []);

  const getSapi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/sapi');
      setSapi(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlockchainData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/TernakSapi');
      const earTags = response.data.map(item => item.earTag);
      setBlockchainEarTags(earTags);
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSave = async (sapi) => {
    Swal.fire({
      title: "Data tidak bisa diubah, periksa ulang data sebelum disimpan. Apakah Anda yakin ingin menyimpan?",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const sapiStringified = {
            earTag: sapi.earTag,
            jenisSapi: sapi.jenisSapi,
            tanggalMasuk: sapi.tanggalMasuk ? sapi.tanggalMasuk.toString() : '',
            beratAwal: sapi.beratAwal ? sapi.beratAwal.toString() : '',
            umurMasuk: sapi.umurMasuk ? sapi.umurMasuk.toString() : '',
            beratSekarang: sapi.beratSekarang ? sapi.beratSekarang.toString() : '',
            umurSekarang: sapi.umurSekarang ? sapi.umurSekarang.toString() : '',
            waktuPembaruan: sapi.waktuPembaruan ? sapi.waktuPembaruan.toString() : '',
            konfirmasiVaksinasi: sapi.konfirmasiVaksinasi,
            konfirmasiVaksinasiUpdatedAt: sapi.konfirmasiVaksinasiUpdatedAt ? sapi.konfirmasiVaksinasiUpdatedAt.toString() : '',
            konfirmasiKelayakan: sapi.konfirmasiKelayakan,
            konfirmasiKelayakanUpdatedAt: sapi.konfirmasiKelayakanUpdatedAt ? sapi.konfirmasiKelayakanUpdatedAt.toString() : '',
            arsipSapi: sapi.arsipSapi,
            arsipSertifikat: sapi.arsipSertifikat
          };
  
          console.log('Data yang dikirim ke backend:', sapiStringified);
  
          setIsLoading(true);
          const response = await axios.post('http://localhost:5000/simpan', sapiStringified);
          console.log('Response:', response.data);
  
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data sapi berhasil disimpan ke blockchain',
            icon: 'success',
            confirmButtonText: 'OK'
          });
  
          fetchBlockchainData(); 
          getSapi();
        } catch (error) {
          console.error('Error saving data to blockchain:', error);
  
          Swal.fire({
            title: 'Gagal!',
            text: 'Gagal menyimpan data ke blockchain',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  };
  

  const filteredSapi = sapi
    .filter((sapi) =>
      sapi.earTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sapi.jenisSapi.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((sapi) => 
      sapi.konfirmasiVaksinasi !== 'Belum Dikonfirmasi' && sapi.konfirmasiKelayakan !== 'Belum Dikonfirmasi'
    );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className='font-bold grid justify-items-center text-3xl mt-6 mb-7'> SIMPAN KE BLOCKCHAIN </h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p className="text-gray-500">Loading...</p>}

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
                <td className="px-6 py-4">
                  <button 
                    type="button" 
                    className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${blockchainEarTags.includes(sapi.earTag) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}`} 
                    onClick={() => handleSave(sapi)}
                    disabled={blockchainEarTags.includes(sapi.earTag)}
                  >
                    Simpan
                  </button>
                </td>
              </tr>
            ))}
            {filteredSapi.length === 0 && (
              <tr>
                <td colSpan="11" className="px-4 py-2 text-center text-gray-500">Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SimpanKeBlockchain;
