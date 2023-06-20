import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NoteContext } from "../context/NoteContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditNode from "./EditNode";
import spinner from "../assets/loading.gif"

const Notes = () => {

  const {notes, fetchAllNotes, deleteTheNote} = useContext(NoteContext)
  const [editNoteOpen, setEditNoteOpen] = useState(false)


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [color, setColor] = useState('')
  const [notId, setNoteId] = useState('')

  const handleEditNote=(title,description, image,id, color)=>{
    setEditNoteOpen(true)
   setTitle(title)
   setDescription(description)
   setImage(image)
   setColor(color)
   setNoteId(id)

   if(editNoteOpen === false){
    document.body.scroll = 'no'
    document.body.style.overflow = 'hidden'
  }else{
    document.body.scroll = 'unset'
    document.body.style.overflow = 'visible'
  }
  }
 

  
  useEffect(() => {
    fetchAllNotes()
  }, []);
  
  return (
    <>
{editNoteOpen && <EditNode editNoteOpen={editNoteOpen} setEditNoteOpen={setEditNoteOpen} ide={notId}  title={title} description={description} image={image} colori={color} />}
<div className="notes">
    <div className="notesContainer">
      
    
        {notes.map((e) => {
          return (
            <div className="noteItem" key={e.id} style={
              e.color === "" || e.color === "default"
              ? { backgroundColor: "white" }
              : { backgroundColor: e.color, color: "white" }
            }>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <img src={e.image} />
              <div className="options">

              <EditIcon className="editicon" onClick={()=>{handleEditNote(e.title, e.description, e.image, e.id, e.color)}} />
              <DeleteIcon className="deleteicon"  onClick={()=>{deleteTheNote(e.id)}} />
              </div>
            
            </div>
          );
        })}
      </div>
    </div> 

   
    </>
  );
};

export default Notes;
