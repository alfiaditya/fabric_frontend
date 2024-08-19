import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormPembaruanVaksinasi = () => {
  const [arsipSertifikat, setArsipSertifikat] = useState(null);
  const [konfirmasiVaksinasi, setKonfirmasiVaksinasi] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPembaruanById = async () => {
      try {
        const response = await axios.get(`https://fabric-ternak-backend.my.too/sapi/${id}`);
        setKonfirmasiVaksinasi(response.data.konfirmasiVaksinasi);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPembaruanById();
  }, [id]);

  const handleUpload = async () => {
    if (!arsipSertifikat) {
      setMsg('No file selected');
      return null;
    }

    const formData = new FormData();
    formData.append('file', arsipSertifikat);

    const metadata = JSON.stringify({
      name: arsipSertifikat.name,
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

  const updatePembaruan = async (e) => {
    e.preventDefault();

    const ipfsHash = await handleUpload();
    if (!ipfsHash) return;

    Swal.fire({
      title: 'Data tidak bisa diubah, periksa ulang data sebelum disimpan. Apakah Anda yakin ingin menyimpan?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Simpan',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://fabric-ternak-backend.my.too/sapi/${id}`, {
            arsipSertifikat: ipfsHash,
            konfirmasiVaksinasi: konfirmasiVaksinasi,
            konfirmasiVaksinasiUpdatedAt: new Date(),
          });
          Swal.fire('Data Tersimpan!', '', 'success');
          navigate('/vaksinasi');
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
          Swal.fire('Error!', 'An error occurred while saving data', 'error');
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  return (
    <div>
      <h1 className='font-bold grid justify-items-center text-3xl mt-6'>KONFIRMASI VAKSINASI</h1>
      {msg && <p className="text-red-500">{msg}</p>}
      <form onSubmit={updatePembaruan} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="arsipSertifikat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Arsip Surat Vaksinasi</label>
          <input type="file" onChange={(e) => setArsipSertifikat(e.target.files[0])} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="konfirmasiVaksinasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Konfirmasi Vaksinasi</label>
          <select value={konfirmasiVaksinasi} onChange={(e) => setKonfirmasiVaksinasi(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" required>
            <option value="">Pilih Status</option>
            <option value="Belum dikonfirmasi">Belum dikonfirmasi</option>
            <option value="Sudah dikonfirmasi">Sudah dikonfirmasi</option>
          </select>
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">Perbarui Data</button>
      </form>
    </div>
  );
};

export default FormPembaruanVaksinasi;
