import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PiCowFill } from "react-icons/pi";
import { MdVaccines, MdOutlineAddTask } from "react-icons/md";
import { FaCow } from "react-icons/fa6";

const HasilGenerate = () => {
  const { earTag } = useParams();
  const [sapi, setSapi] = useState(null);
  const [error, setError] = useState('');

  
  const fetchSapiData = useCallback(async () => {
    try {
      const response = await axios.get(`https://fabric-ternak-backend.my.to/TernakSapi/${earTag}`);
      setSapi(response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  }, [earTag]);

  useEffect(() => {
    fetchSapiData();
  }, [fetchSapiData]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!sapi) {
    return <p>Loading...</p>;
  }



  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-center">Data Sapi</h1>
      <div className="flex justify-between items-center mb-8">
        <div className="relative flex flex-col items-center text-center">
          <PiCowFill className="w-12 h-12 text-green-500" />
          <div className="absolute top-0 left-0 mt-6 ml-12 w-full border-t-2 border-green-500"></div>
          <p className="mt-4 font-bold">Data sapi disimpan ke database</p>
          <p className="text-sm text-gray-600">{formatDate(sapi.tanggalMasuk)}</p>
        </div>

        <div className="relative flex flex-col items-center text-center">
          <MdVaccines className="w-12 h-12 text-green-500" />
          <div className="absolute top-0 left-0 mt-6 ml-12 w-full border-t-2 border-green-500"></div>
          <p className="mt-4 font-bold">Konfirmasi vaksinasi oleh dinas</p>
          <p className="text-sm text-gray-600">{formatDate(sapi.konfirmasiVaksinasiUpdatedAt)}</p>
        </div>

        <div className="relative flex flex-col items-center text-center">
          <FaCow className="w-12 h-12 text-green-500" />
          <div className="absolute top-0 left-0 mt-6 ml-12 w-full border-t-2 border-green-500"></div>
          <p className="mt-4 font-bold">Pembaruan data sapi oleh peternak</p>
          <p className="text-sm text-gray-600">{formatDate(sapi.waktuPembaruan)}</p>
        </div>

        <div className="relative flex flex-col items-center text-center">
          <MdOutlineAddTask className="w-12 h-12 text-green-500" />
          <p className="mt-4 font-bold">Cek kelayakan oleh dinas</p>
          <p className="text-sm text-gray-600">{formatDate(sapi.konfirmasiKelayakanUpdatedAt)}</p>
        </div>
      </div>
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
