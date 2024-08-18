import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const HasilGenerate = () => {
  const { earTag } = useParams();
  const [sapi, setSapi] = useState(null);
  const [error, setError] = useState('');

  
  const fetchSapiData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/TernakSapi/${earTag}`);
      setSapi(response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  }, [earTag]);

  useEffect(() => {
    fetchSapiData();
  }, [fetchSapiData]);



  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!sapi) {
    return <p>Loading...</p>;
  }



  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-center">Data Sapi</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Ear Tag:</label>
        <input type="text" value={sapi.earTag || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Jenis Sapi:</label>
        <input type="text" value={sapi.jenisSapi || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tanggal Masuk:</label>
        <input type="text" value={sapi.tanggalMasuk || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Berat Awal:</label>
        <input type="text" value={sapi.beratAwal || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Umur Masuk:</label>
        <input type="text" value={sapi.umurMasuk || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Foto Sapi:</label>
        {sapi.arsipSapi ? (
          <img src={`https://ipfs.io/ipfs/${sapi.arsipSapi}`} alt="Foto Sapi" className="w-full h-auto border rounded" />
        ) : (
          <p>Foto tidak tersedia</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Berat Sekarang:</label>
        <input type="text" value={sapi.beratSekarang || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Umur Sekarang:</label>
        <input type="text" value={sapi.umurSekarang || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Waktu Pembaruan:</label>
        <input type="text" value={sapi.waktuPembaruan || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Konfirmasi Vaksinasi:</label>
        <input type="text" value={sapi.konfirmasiVaksinasi || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Waktu Konfirmasi Vaksinasi:</label>
        <input type="text" value={sapi.konfirmasiVaksinasiUpdatedAt || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Foto Surat Vaksinasi:</label>
        {sapi.arsipSertifikat ? (
          <img src={`https://ipfs.io/ipfs/${sapi.arsipSertifikat}`} alt="Foto Surat Vaksinasi" className="w-full h-auto border rounded" />
        ) : (
          <p>Foto tidak tersedia</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Konfirmasi Kelayakan:</label>
        <input type="text" value={sapi.konfirmasiKelayakan || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Waktu Konfirmasi Kelayakan:</label>
        <input type="text" value={sapi.konfirmasiKelayakanUpdatedAt || 'N/A'} disabled className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100" />
      </div>
    </div>
  );
};

export default HasilGenerate;
