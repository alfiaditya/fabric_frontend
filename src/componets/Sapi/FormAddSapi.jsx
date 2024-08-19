import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormAddSapi = () => {
  const [eartag, setEartag] = useState('');
  const [jenissapi, setJenissapi] = useState('');
  const [tanggalmasuk, setTanggalmasuk] = useState('');
  const [beratawal, setBeratawal] = useState('');
  const [beratAwalError, setBeratAwalError] = useState('');
  const [umurMasuk, setUmurMasuk] = useState('');
  const [umurMasukError, setUmurMasukError] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleBeratAwalChange = (e) => {
    const value = e.target.value;
    setBeratawal(value);

    
    const regex = /^\d+\s*KG$/i; 
    if (!regex.test(value)) {
      setBeratAwalError('Berat harus dalam format "XXX KG"');
    } else {
      setBeratAwalError(''); 
    }
  };

  const handleUmurMasukChange = (e) => {
    const value = e.target.value;
    setUmurMasuk(value);

    
    const regex = /^\d+,\d{1,2} tahun$/; 
    if (!regex.test(value)) {
      setUmurMasukError('Umur harus dalam format "X,XX tahun"');
    } else {
      setUmurMasukError(''); 
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMsg('No file selected');
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', options);

    try {
      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2Y2NkNmYyMS0yMTBiLTQ0NDEtYmU4Yy1hYTBlYWMxZDQxNmMiLCJlbWFpbCI6ImFsZmlhZGl0eWExMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDIyNGEzNTQ2ZmQwYzQ3YWI5ZGYiLCJzY29wZWRLZXlTZWNyZXQiOiIyYWZmNWYwNWMzOWM1NzE4YzBhYTM2ZjVhMzA0Y2QyNDEzMjY4MjU5NWRiMjMzNzU2YmEzMjZhY2E2ZDQ2MmIyIiwiaWF0IjoxNzIwNjE3Mzc3fQ.-yp7rpe8OZ2oMMsa55pcC0Ils_3sUzkhIXFlkB8mvvY`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const resData = await res.json();
      return resData.IpfsHash;
    } catch (error) {
      console.error('Error uploading file:', error);
      setMsg('Error uploading file');
      return null;
    }
  };

  const saveSapi = async (e) => {
    e.preventDefault();
    setMsg('');
    if (beratAwalError || umurMasukError) {
      setMsg('Please fix the errors before submitting');
      return;
    }

    Swal.fire({
      title: "Data tidak bisa diubah, periksa ulang data sebelum disimpan. Apakah Anda yakin ingin menyimpan?",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      isConfirmedColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsUploading(true);
        try {
          const ipfsHash = await handleUpload();
          if (!ipfsHash) {
            setIsUploading(false);
            return;
          }

          const response = await axios.post('https://fabric-ternak-backend.my.to/sapi', {
            earTag: eartag,
            jenisSapi: jenissapi,
            tanggalMasuk: tanggalmasuk,
            beratAwal: beratawal,
            umurMasuk: umurMasuk,
            arsipSapi: ipfsHash,
          });

          setMsg(response.data.msg);
          Swal.fire("Data Tersimpan!", "", "success");
          navigate('/sapi');
        } catch (error) {
          setMsg(error.response?.data?.msg || 'An error occurred');
          Swal.fire("Error!", "An error occurred while saving data", "error");
        } finally {
          setIsUploading(false);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <h1 className='font-bold grid justify-items-center text-3xl mt-6'> TAMBAH DATA SAPI </h1>
      {msg && <p className="text-red-500">{msg}</p>}
      <form onSubmit={saveSapi}>
        <div className="mb-4">
          <label htmlFor="eartag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ear Tag </label>
          <input type="text" value={eartag} onChange={(e) => setEartag(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Ear Tag" required />
        </div>
        <div className="mb-4">
          <label htmlFor="jenissapi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenis Sapi</label>
          <select value={jenissapi} onChange={(e) => setJenissapi(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700" required>
            <option value="">Pilih Jenis sapi</option>
            <option value="Pegon">Pegon</option>
            <option value="Simental">Simental</option>
            <option value="Limousin">Limousin</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="tanggalmasuk" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Masuk</label>
          <input type="date" value={tanggalmasuk} onChange={(e) => setTanggalmasuk(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="beratawal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Berat Awal</label>
          <input type="text" value={beratawal} onChange={handleBeratAwalChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Berat Awal" required />
          {beratAwalError && <p className="text-red-500">{beratAwalError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="umurMasuk" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Umur Masuk</label>
          <input type="text" value={umurMasuk} onChange={handleUmurMasukChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Umur Masuk" required />
          {umurMasukError && <p className="text-red-500">{umurMasukError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="arsipSapi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foto Sapi</label>
          <input type="file" onChange={handleFileChange} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" required />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="max-h-40" />
            </div>
          )}
        </div>
        <div className="mb-4">
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Simpan'}
        </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddSapi;
