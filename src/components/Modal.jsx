import React, { useContext, useState } from "react";
import AddNote from "./AddNote";
import AddIcon from '@mui/icons-material/Add';
import { NoteContext } from "../context/NoteContext";

const Modal = () => {

  const {openModal, setOpenModal} = useContext(NoteContext)

  const handleOpenModal =()=>{
    setOpenModal(!openModal)
    if(openModal === false){
      document.body.scroll = 'no'
      document.body.style.overflow = 'hidden'
    }else{
      document.body.scroll = 'unset'
      document.body.style.overflow = 'visible'
    }
  }

  return (
<>

 <div className="button"><button onClick={()=>{handleOpenModal()}}> <AddIcon/> </button> <span>Add a Note</span> </div> 

{openModal && 
<AddNote mode={'Add a note'}  setOpenModal = {setOpenModal}/>
}

</>
   
      
  );
};

export default Modal;
