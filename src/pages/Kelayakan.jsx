import React ,{useEffect} from 'react'
import Layout from '../componets/Layout'
import FormKonfirmasiKelayakan from '../componets/Sapi/FormKonfirmasiKelayakan'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Kelayakan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
  <Layout>
    <FormKonfirmasiKelayakan/>
  </Layout>
  )
}

export default Kelayakan;