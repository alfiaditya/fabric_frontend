import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { validatePassword } from '../../features/passwordValidation';

const UserEdit = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`https://fabric-ternak-backend.my.to/users/${id}`);
        setNama(response.data.nama);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMsg(passwordError);
      return;
    }

    if (password !== confPassword) {
      setMsg("Password dan Confirm Password tidak cocok");
      return;
    }

    Swal.fire({
      title: "Apakah Anda yakin ingin menyimpan?",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://fabric-ternak-backend.my.to/users/${id}`, {
            nama,
            email,
            password,
            confPassword,
            role
          });
          navigate('/users');
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
    });
  };

  return (
    <div>
      <h1 className='font-bold grid justify-items-center text-3xl mt-6'> EDIT DATA PENGGUNA </h1>
      {msg && <p className="text-red-500">{msg}</p>}
      <form onSubmit={updateUser}>
        <div className="mb-4">
          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name </label>
          <input type="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="name" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Email" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Enter your password" required />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm password</label>
          <input type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Enter your password" required />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" disabled>Pilih role anda</option>
            <option value="Peternak">Peternak</option>
            <option value="DKPP">DKPP</option>
          </select>
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">Edit</button>
      </form>
    </div>
  )
}

export default UserEdit;
