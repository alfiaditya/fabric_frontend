import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormPembaruanData = () => {
  const [beratSekarang, setBeratSekarang] = useState('');
  const [beratSekarangError, setBeratSekarangError] = useState('');
  const [umurSekarang, setUmurSekarang] = useState('');
  const [umurSekarangError, setUmurSekarangError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPembaruanById = async () => {
      try {
        const response = await axios.get(`https://fabric-ternak-backend.my.to/sapi/${id}`);
        setBeratSekarang(response.data.beratSekarang);
        setUmurSekarang(response.data.umurSekarang);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPembaruanById();
  }, [id]);

  const handleBeratSekarangChange = (e) => {
    const value = e.target.value;
    setBeratSekarang(value);

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setBeratSekarangError('Berat harus berupa angka yang valid');
    } else {
      setBeratSekarangError('');
    }
  };

  const handleUmurSekarangChange = (e) => {
    const value = e.target.value;
    setUmurSekarang(value);

    const numericValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numericValue)) {
      setUmurSekarangError('Umur harus berupa angka yang valid');
    } else {
      setUmurSekarangError('');
    }
  };

  const updatePembaruan = async (e) => {
    e.preventDefault();

    if (beratSekarangError || umurSekarangError) {
      setMsg('Please fix the errors before submitting');
      return;
    }

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Perubahan tidak dapat dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, perbarui!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://fabric-ternak-backend.my.to/sapi/${id}`, {
            beratSekarang: `${beratSekarang} KG`,
            umurSekarang: `${umurSekarang.replace(',', '.')} Tahun`,
            waktuPembaruan: new Date(),
          });
          Swal.fire('Data Tersimpan!', '', 'success');
          navigate('/Pembaruan');
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
          Swal.fire('Error!', 'Terjadi kesalahan saat memperbarui data', 'error');
        }
      }
    });
  };

  return (
    <div>
      <h1 className='font-bold grid justify-items-center text-3xl mt-6'>Pembaruan Data Sapi</h1>
      {msg && <p className="text-red-500">{msg}</p>}
      <form onSubmit={updatePembaruan}>
        <div className="mb-4">
          <label htmlFor="beratSekarang" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Berat Sekarang</label>
          <div className="relative">
            <input
              type="number"
              value={beratSekarang}
              onChange={handleBeratSekarangChange}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700"
              placeholder="Berat Sekarang (contoh: 350)"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">KG</span>
          </div>
          {beratSekarangError && <p className="text-red-500">{beratSekarangError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="umurSekarang" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Umur Sekarang</label>
          <div className="relative">
            <input
              type="number"
              value={umurSekarang}
              onChange={handleUmurSekarangChange}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700"
              placeholder="Umur Sekarang (contoh: 2,5)"
              required
            />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">Tahun</span>
          </div>
          {umurSekarangError && <p className="text-red-500">{umurSekarangError}</p>}
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">Perbarui Data</button>
      </form>
    </div>
  );
};

export default FormPembaruanData;
