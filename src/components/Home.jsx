import React from 'react'
import Navbar from './Navbar'
import AddNote from './AddNote'
import Notes from './Notes'
import Modal from './Modal'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Modal />
  
      <Notes />
    </div>
  )
}

export default Home
