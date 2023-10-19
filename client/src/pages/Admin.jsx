import React, { useEffect, useState } from 'react'
import '../styles/Admin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Admin = () => {

    const navigate = useNavigate();

    const [usersCount, setUsersCount] = useState(0);
    const [donationsCount, setDonationsCount] = useState(0);
    const [fundrisersCount, setFundrisersCount] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0);

    useEffect(()=>{
        fetchUsersCount();
        fetchDonationsCount();
        fetchFundrisersCount();
    },[])

    const fetchUsersCount = async() =>{
        await axios.get('http://localhost:6001/fetch-users').then(
            (response)=>{
                setUsersCount(response.data.length);
            }
        )
    }

    const fetchDonationsCount = async() =>{
        await axios.get('http://localhost:6001/fetch-donations').then(
            (response)=>{
                setDonationsCount(response.data.length);

                const donationAmount = response.data.reduce((sum, obj) => sum + obj.donationAmount, 0);
                setTotalDonations(donationAmount);
            }
        )   
    }

    const fetchFundrisersCount = async() =>{
        await axios.get('http://localhost:6001/fetch-fundrisers').then(
            (response)=>{
                setFundrisersCount(response.data.length);
            }
        )
    }

  return (
    <div className="admin-page">

        <div className="admin-cards">

            <div className="admin-card">
                <h5>All Users</h5>
                <p>{usersCount}</p>
                <button className='btn btn-outline-primary' onClick={()=> navigate('/all-users')} >View all</button>
            </div>

            <div className="admin-card">
                <h5>Total donations</h5>
                <p>{donationsCount}</p>
                <button className='btn btn-outline-primary' onClick={()=> navigate('/donations')} >View all</button>
            </div>

            <div className="admin-card">
                <h5>Total fund rised</h5>
                <p>&#8377; {totalDonations}</p>
                <button className='btn btn-outline-primary' onClick={()=> navigate('/donations')} >View all</button>
            </div>

            <div className="admin-card">
                <h5>All Fundrisers</h5>
                <p>{fundrisersCount}</p>
                <button className='btn btn-outline-primary' onClick={()=> navigate('/fundrisers')} >View all</button>
            </div>

        </div>
    </div>
  )
}

export default Admin