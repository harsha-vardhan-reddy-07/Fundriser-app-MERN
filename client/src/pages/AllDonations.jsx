import '../styles/AllDonations.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom';
import {BiSolidShareAlt} from 'react-icons/bi'

const AllDonations = () => {

    const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  
  useEffect(()=>{
    fetchDonations();
  }, [])

  const fetchDonations = async() =>{
    await axios.get(`http://localhost:6001/fetch-donations`).then(
      (response)=>{
        setDonations(response.data);
        console.log(response.data);
            
      }
    )
  }

  return (
    <div className="all-donations-page">
        <h3>All Donations</h3>

        <div className="all-donations">

                {donations.map((donation)=>{
                    return(
                        <div className="all-donation-card">
                        <span>
                            <b>Fundriser Type</b>
                            <p>{donation.fundriserPurpose}</p>
                        </span>
                        <span>
                            <b>Donor name</b>
                            <p>{donation.donarName}</p>
                        </span>
                        <span> 
                            <b>Donor mail</b>
                            <p>{donation.donarEmail}</p>
                        </span>
                        <span>
                            <b>Amount</b>
                            <p>&#8377; {donation.donationAmount}</p>
                        </span>
                        <span>
                            <b>Remarks</b>
                            <p>{donation.remark}</p>
                        </span>
                        <button className='btn btn-outline-primary' onClick={()=> navigate(`/fundriser/${donation.fundriserId}`)}  >View fundriser</button>
                    </div>
                    )
                })}



                </div>
    </div>
  )
}

export default AllDonations