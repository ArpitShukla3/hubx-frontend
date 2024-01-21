import { Button } from '@mui/material'
import React from 'react'
import { apiLogout } from '../../apiList'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const navigateTo = useNavigate();
  async function Logout()
  {
    try {
      await axios.post(apiLogout,{name:"name"},{withCredentials:true});
      toast.success("Logout")
      navigateTo("/");
    } catch (error) {
      toast.dismiss()
      toast.error(error.message)
    }
  }
  return (
    <div className='bg-slate-900 w-full flex justify-between p-2' >
      <FontAwesomeIcon icon={faFire} size="2xl" style={{color: "#e60a4c",cursor:"pointer"}} />
        <Button variant="contained" color="error" onClick={Logout} >
        Logout </Button> 
    <Toaster/>
   
    </div>
  )
}

export default Navbar