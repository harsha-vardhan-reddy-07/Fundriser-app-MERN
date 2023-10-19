import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const AllFundrisers = () => {

  const [fundrisers, setFundrisers] = useState([]);

  const navigate = useNavigate();

 
  useEffect(()=>{
    fetchFundrisers();
  }, [])

  const fetchFundrisers = async() =>{
    await axios.get('http://localhost:6001/fetch-fundrisers').then(
      (response)=>{
        setFundrisers(response.data);
        console.log(response.data);
      }
    )
  }


  return (
    <div className="homepage">

      <div className="all-fundrisers">

        {fundrisers.map((fundriser)=>{
          return(
            <div className="fundriser-card">
                <img src={fundriser.bannerImage} alt="" />
                <div className="fundriser-card-data">
                  
                    <h5>{fundriser.title}</h5>
                    <span>
                      <b>Applicant: </b>
                      <p>{fundriser.applicantName}</p>
                    </span>
                    <span>
                      <b>Fundriser cause: </b>
                      <p>{fundriser.fundriserPurpose}</p>
                    </span>
                    <span>
                      <b>Fund collected: </b>
                      <p>&#8377; {fundriser.collectedAmount} / &#8377; {fundriser.targetAmount} </p>
                    </span>
                    <button className='OrangeBtn' onClick={()=> navigate(`/fundriser/${fundriser._id}`)} >View</button>
                </div>
            </div>
          )
        })} 


      </div>

    </div>
  )
}

export default AllFundrisers