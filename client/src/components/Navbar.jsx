import React, { useContext } from 'react'
import '../styles/Navbar.css'
import {useNavigate} from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {

  const userId = localStorage.getItem('userId');

  const usertype = localStorage.getItem('usertype');

  const navigate = useNavigate();

  const {logout} = useContext(GeneralContext);


  return (

    <>
        
        {usertype === 'user' ?
          <div className="navbar">
            <h3 onClick={()=> navigate('/')} >SB Funds</h3>
            <div className="nav-options">
              <p onClick={()=> navigate('/')}>Home</p>
              <p onClick={()=> navigate('/my-fundrisers')}>My fundrisers</p>
              <p onClick={()=> navigate('/new-fundriser')}>New fundriser</p>
              <p onClick={()=>logout()} >logout</p>
            </div>
          </div>
        :
        <></>}
        

        {usertype === 'admin' ?
        <div className="navbar">
          <h3 onClick={()=> navigate('/admin')} >SB Funds (admin)</h3>
          <div className="nav-options">
            <p onClick={()=> navigate('/admin')}>Home</p>
            <p onClick={()=> navigate('/all-users')}>All users</p>
            <p onClick={()=> navigate('/fundrisers')}>Fundrisers</p>
            <p onClick={()=> navigate('/donations')}>Donations</p>
            <p onClick={()=>logout()} >logout</p> 
          </div>
        </div>
        :
        <></>}
    </>
  )
}

export default Navbar