import React ,{useEffect} from 'react'
import Layout from '../../componets/Layout'
import FormAddSapi from '../../componets/Sapi/FormAddSapi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'
const AddSapi = () => {
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
      <FormAddSapi />
    </Layout>
  )
}

export default AddSapi