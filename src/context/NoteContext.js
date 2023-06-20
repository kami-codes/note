import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { db, storage } from "../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {

  

  const noteRef = collection(db, "userNotes");
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addTheNote = async (title, description, color, noteImage) => {
    if (noteImage === null) {
      setNotes([
        ...notes,
        { title: title, description: description, color: color },
      ]);
      await addDoc(noteRef, {
        title: title,
        description: description,
        color: color,
        userId: user.uid,
      });
    } else {
    
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, noteImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            setNotes([
              ...notes,
              {
                title: title,
                description: description,
                image: downloadURL,
                color: color,
              },
            ]);
            
            await addDoc(noteRef, {
              title: title,
              description: description,
              color: color,
              userId: user.uid,
              image: downloadURL,
            });
          });
        }
      );
    }
    // -----------------------------------
  };

  const fetchAllNotes = async () => {
    try {
     
      if (user.uid) {
        console.log("this is the user id ⭐⭐" + user.uid);
        const q = query(
          collection(db, "userNotes"),
          where("userId", "==", user.uid)
        );
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(filteredData);
        console.log(notes);
      }
   
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTheNote = async (id) => {
    setNotes(
      notes.filter((e) => {
        return e.id !== id;
      })
    );
    await deleteDoc(doc(db, "userNotes", id));
  };

  const updateTheDoc = async (id, title, description, color, image) => {
    if (typeof image === "string") {
      setNotes(
        notes.map((e) => {
          if (e.id === id) {
            return {
              title: title,
              description: description,
              color: color,
              userId: user.uid,
              image: image
            };
          } else{
            return e
          }
        })
      );

      const noteDoc = doc(db, "userNotes", id);
      await updateDoc(noteDoc, {
        title: title,
        description: description,
        color: color,
        userId: user.uid,
      });
    } else if(image === null){

      setNotes(
        notes.map((e) => {
          if (e.id === id) {
            return {
              title: title,
              description: description,
              color: color,
              userId: user.uid,
              image: null
            };
          } else{
            return e
          }
        })
      );


      const noteDoc = doc(db, "userNotes", id);
      await updateDoc(noteDoc, {
        title: title,
        description: description,
        color: color,
        userId: user.uid,
        image: null
      }); 
    }
    else {
    
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            setNotes(
              notes.map((e) => {
                if (e.id === id) {
                  return {
                    title: title,
                    description: description,
                    color: color,
                    userId: user.uid,
                    image: downloadURL
                  };
                } else{
                  return e
                }
              })
            );
    

            const noteDoc = doc(db, "userNotes", id);
            await updateDoc(noteDoc, {
              title: title,
              description: description,
              image: downloadURL,
              color: color,
              userId: user.uid,
            });
            
          });
        }
      );
      // -----------------------------------
    }
  };

  return (
    <NoteContext.Provider
      value={{
        openModal,
        setOpenModal,
        addTheNote,
        fetchAllNotes,
        notes,
        deleteTheNote,
        updateTheDoc,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
