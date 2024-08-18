import React ,{useEffect} from 'react'
import Layout from '../../componets/Layout'
import FormPembaruanVaksinasi from '../../componets/Sapi/FormPembaruanVaksinasi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'

const PembaruanSapi = () => {
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
    <FormPembaruanVaksinasi/>
  </Layout>
  )
}

export default PembaruanSapi