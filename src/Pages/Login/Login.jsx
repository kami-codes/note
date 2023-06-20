import React, { useContext, useEffect, useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { auth, googleProvider } from "../../config/firebase";
import {  signInWithEmailAndPassword , signInWithPopup } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';
import spinner from '../../assets/loading.gif'


function Login() {
  const navigate = useNavigate()
  const {user, loading, setLoading} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(false)


  const handleLoginClick = async()=>{
    setLoading(true)
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
      
    } catch (error) {
      setErr(true)
    }
    setLoading(false)
 
    if (user) {
      navigate('/')
      setErr(false)
    }
   
  }
  const handleGoogleClick = async()=>{
    setLoading(true)
    try {
      const data = await signInWithPopup(auth, googleProvider)
      
    } catch (error) {
      setErr(true)
    }
    setLoading(false)
    
    if (user) {
      navigate('/')
      setErr(false)
    }

  }
  useEffect(()=>{
    if (user) {
      setLoading(false)
      setErr(false)
      navigate('/')
    }
  }, [user])
  
  return (
    <div className='login'>
      
      <div className="loginContainer">
        <span>Note-app Login</span>
        <input type="email" placeholder='email address' value={email} onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/>
        <button onClick={handleLoginClick}>{loading ?  <img src={spinner} /> : "Login"}</button>
        <hr />
        <div onClick={handleGoogleClick} className='google'> <img src="https://img.freepik.com/free-icon/search_318-265146.jpg" alt="" /> <p>
        Login in with Google
        </p> 
         </div>
        <Link to='/register'> <p>don't have an account? Create new one</p></Link>
        {err && <p style={{color: 'red'}}>Something went wrong try again</p>}
      </div>
    </div>
  )
}

export default Login
