
import React, { useContext, useState } from "react";

import { NoteContext } from "../context/NoteContext";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from '@mui/icons-material/Delete';

// Add a new document with a generated id.

const AddNote = (props) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [noteImage, setNoteImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null)

  const { addTheNote } = useContext(NoteContext);

  const handleAddNote = async () => {
    handleOpenModal()

    await addTheNote(title, description, color, noteImage);
    props.setOpenModal(false);
 
  };

  function autoExpand(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  const selectColor = (e) => {
    setColor(e.id);
    document.querySelector(".select").classList.remove("select");
    e.classList.add("select");
  };
  const handleImageChange =(e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    setNoteImage(file)
  

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleOpenModal =()=>{
  props.setOpenModal(false)
  if(props.openModal === false){
    document.body.scroll = 'no'
    document.body.style.overflow = 'hidden'
  }else{
    document.body.scroll = 'unset'
    document.body.style.overflow = 'visible'
  }
  }

  return (
    <div className="addnote">
      <div
        className="modalBody"
        style={
          color === "" || color === "default"
            ? { backgroundColor: "white" }
            : { backgroundColor: color, color: "white" }
        }
      >
        <div className="close">
          <span
            style={
              color === "" || color === "default"
                ? { backgroundColor: "white" }
                : { color: "white" }
            }
          >
           Add a Note
          </span>
          <button
            style={
              color === "" || color === "default"
                ? { backgroundColor: "white" }
                : { backgroundColor: color, color: "white" }
            }
            onClick={() => {
              handleOpenModal()
              
            }}
          >
            <ClearIcon />
          </button>
        </div>
        
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={
            color === "" || color === "default"
              ? { backgroundColor: "transparent" }
              : { color: "white" }
          }
        />
        <textarea
          cols="3"
          type="text"
          placeholder="description"
          value={description}
          style={
            color === "" || color === "default"
              ? { backgroundColor: "transparent" }
              : { color: "white" }
          }
          onChange={(e) => setDescription(e.target.value)}
          onInput={(e) => {
            autoExpand(e.target);
          }}
        />
        <input
          type="file"
          id="noteImg"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

{noteImage !== null ?<div> <img src={selectedImage} width={100}/> <DeleteIcon onClick={()=>{setNoteImage(null)}} /> </div>  :   <label htmlFor="noteImg">
          <AddPhotoAlternateIcon /> Add a image
        </label>}

      
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
        <button onClick={handleAddNote}>add note</button>
      </div>
    </div>
  );
};

export default AddNote;
