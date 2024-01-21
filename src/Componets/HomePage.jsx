// import { AddOutlinedIcon, CloseOutlinedIcon } from '@mui/icons-material';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { Button, Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImageUpload from './ImageUpload';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Facebook from './Facebook';
import { ListState } from '../Context/ContextProvider';
import axios from "axios";
import { apiImages } from "../../apiList";
import "./face.css"
const HomePage = () => {
  const [show, setShow] = useState(false);
 
  const { list ,setList,page,setPage} = ListState();
  async function download(){
    try{
      const val= await axios.get(`${apiImages}/${page}`,{withCredentials:true});
        setList( val.data.data );
        toast.dismiss();
    } catch(err) {
      toast.dismiss()
      toast.error(err.message)
    }
  }
  function handlePrev()
  {
    if(page>0)
   { 
    setPage(page-1);
    }
    else{
      toast.error("Already on 1st page")
    }
  }
  function handleNext()
  {
    if(list.length>0)
     {toast.loading("Loading")
    setPage(page+1);}
    else{
      toast.error("Last page reached")
    }
  }
  function getBackground()
  {
    if(show)
    {
      return `bg-slate-800 `;
    }
    else
    {
      return `bg-slate-600`;
    }
  }
  function overlayCSS()
  {
    if(show)
    {
      return  `overlay`
    }
  }
  useEffect(()=>{
    download();
  },[page])
  return (
    <div className={`h-full ${getBackground()} min-h-screen z-0 ${overlayCSS()}}`}  >
      <div className='fixed top-0 bg-slate-100 w-full'>
        <Navbar />
      </div>
     {list &&list.map((t)=> t&&<div className='flex justify-center pt-7 z-0' key={t._id}>
      <Facebook img={t.imageUrl} topic={t.title} desc={t.description} key={t.imageUrl} views={t.views} _id={t._id}   />
    </div>) }
   
      <div className='fixed bottom-0 m-2 z-20 opacity-100' onClick={() => {setShow(!show)}}>
        <Fab color='primary' aria-label='add'>
          {show ? <CloseOutlinedIcon /> : <AddOutlinedIcon />}
        </Fab>
      </div>
    <div>

    </div>
      {show && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'>
          <div className='bg-white rounded-md'>
            <ImageUpload setShow={setShow} />
          </div>
        </div>
      )}
      <div className="  flex justify-center h-11  mb-2 ">  
       <div className="p-2" onClick={handlePrev}> <Button variant="contained">Prev</Button></div>
       <div className="p-2 " onClick={handleNext}> <Button variant="contained">Next</Button></div>
      </div>
      <Toaster />
    </div>
  );
};

export default HomePage;
