import React, { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { NoteContext } from "../context/NoteContext";
import DeleteIcon from '@mui/icons-material/Delete';

function EditNode(props) {
  function autoExpand(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  const [noteTitle, setNoteTitle] = useState(props.title);
  const [notedescription, setNoteDescription] = useState(props.description);
  const [noteImage, setNoteImage] = useState(props.image);
  const [color, setColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(null)

  const {updateTheDoc} = useContext(NoteContext)


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setNoteImage(file);

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateNote =async()=>{
    await updateTheDoc(props.ide, noteTitle, notedescription, color, noteImage)
    props.setEditNoteOpen(false);

  }
  const handleEditClear =()=>{
    props.setEditNoteOpen(false);
    
   if(props.editNoteOpen === false){
    document.body.scroll = 'no'
    document.body.style.overflow = 'hidden'
  }else{
    document.body.scroll = 'unset'
    document.body.style.overflow = 'visible'
  }
  }

  const selectColor = (e) => {
    setColor(e.id);
    document.querySelector(".select").classList.remove("select");
    e.classList.add("select");
  };
  console.log(props.colori);
  return (
    <div className="editNote">
      <div
        className="editNoteContainer"
        style={
          color === "" || color === "default"
            ? { backgroundColor: "white" }
            : { backgroundColor: color, color: "white" }
        }
      >
        <div
          className="close"
          style={
            color === "" || color === "default"
              ? { backgroundColor: "white" }
              : { color: "white" }
          }
        >
          <span
            style={
              color === "" || color === "default"
                ? { backgroundColor: "white" }
                : { color: "white" }
            }
          >
            Edit the Note
          </span>
          <ClearIcon
            style={
              color === "" || color === "default"
                ? { backgroundColor: "white" }
                : { backgroundColor: color, color: "white" }
            }
            onClick={() => {
              handleEditClear()
            }}
          />
        </div>
        <input
        onChange={e=>{setNoteTitle(e.target.value)}}
          style={
            color === "" || color === "default"
              ? { backgroundColor: "transparent" }
              : { color: "white" }
          }
          type="text"
          value={noteTitle}
        />
        <textarea
        onChange={e=>{setNoteDescription(e.target.value)}}
          style={
            color === "" || color === "default"
              ? { backgroundColor: "transparent" }
              : { color: "white" }
          }
          onInput={(e) => {
            autoExpand(e.target);
          }}
          type="text"
          value={notedescription}
          cols={5}
        />

        <input
          type="file"
          id="noteImg"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <div className="imageDisplay">

{typeof(noteImage) === 'string' ?
 <div className="imageDisplay"> <img src={noteImage} width={30}/> 
 <DeleteIcon onClick={()=>{setNoteImage(null)}} />
  </div>:  ( selectedImage === null ?  
  <label htmlFor="noteImg">
          <AddPhotoAlternateIcon /> Add a image
        </label> :
        <div className="imageDisplay"> 
        <img src={selectedImage} width={30}/>
        <DeleteIcon onClick={()=>{setSelectedImage(null)}} />
        
        </div>)
         }

        
        </div>


       

        <div className="colorsInput">
          <div
            className="default select"
            onClick={(e) => {
              selectColor(e.target);
            }}
          ></div>
          <div
            id="rgb(255 70 70)"
            className="red"
            onClick={(e) => {
              selectColor(e.target);
            }}
          ></div>
          <div
            id="rgb(59 59 255)"
            className="blue"
            onClick={(e) => {
              selectColor(e.target);
            }}
          ></div>
          <div
            id="green"
            className="green"
            onClick={(e) => {
              selectColor(e.target);
            }}
          ></div>
          <div
            id="rgb(231 149 0)"
            className="orange"
            onClick={(e) => {
              selectColor(e.target);
            }}
          ></div>
          <div
            className="pruple"
            onClick={(e) => {
              selectColor(e.target);
            }}
          ></div>
        </div>
        <button onClick={()=>{handleUpdateNote(); handleEditClear()}}> Update </button>
      </div>
    </div>
  );
}

export default EditNode;
