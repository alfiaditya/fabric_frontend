import React ,{useEffect} from 'react'
import HasilGenerate from '../componets/HasilGenerate'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Sapi = () => {

  const navigate = useNavigate();
  const { isError} = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <HasilGenerate/>
  )
}

export default Sapi;