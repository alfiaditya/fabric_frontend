import React ,{useEffect} from 'react'
import Layout from '../../componets/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'
import UserEdit from '../../componets/Users/UserEdit'
const EditUser = () => {
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
      <UserEdit />
    </Layout>
  )
}

export default EditUser