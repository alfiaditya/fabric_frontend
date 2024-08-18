import React ,{useEffect} from 'react'
import Layout from '../../componets/Layout'
import UserCreate from '../../componets/Users/UserCreate'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'

const UserFormCreate = () => {
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
    <UserCreate/>
  </Layout>
  )
}

export default UserFormCreate;