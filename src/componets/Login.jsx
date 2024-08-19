import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import { LoginUser, reset } from '../features/authSlice';
import { validatePassword } from '../features/passwordValidation';
import logo from '../logo.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: 'Error!',
        text: message || "Akun Anda belum terverifikasi, silakan hubungi admin untuk verifikasi",
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#4b5563' 
      }).then(() => {
        dispatch(reset()); 
      });
    }
  }, [isError, message, dispatch]);

  const Auth = (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      Swal.fire({
        title: 'Error!',
        text: passwordError,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#4b5563' 
      });
      return;
    }
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Fabric-ternak   
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form onSubmit={Auth} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb=2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Email" required />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb=2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-700 focus:border-gray-700" placeholder="Masukan password" required />
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isLoading ? "Loading..." : 'Masuk'}</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Belum punya akun? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Daftar disini</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
