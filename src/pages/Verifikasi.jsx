import React ,{useEffect} from 'react'
import Layout from '../componets/Layout'
import VerifikasiUser from '../componets/Users/VerifikasiUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError , user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError) {
      navigate("/");
    }
    if(user && user.role !== "Admin") {
      navigate("/dashboard");
    }
  }, [isError, user , navigate]);
  return (
  <Layout>
    <VerifikasiUser />
  </Layout> 
  )
}

export default Users