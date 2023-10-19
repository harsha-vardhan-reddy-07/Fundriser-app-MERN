import '../styles/MyFundrisers.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const MyFundrisers = () => {


  const [fundrisers, setFundrisers] = useState([]);

  const navigate = useNavigate();


  const userId = localStorage.getItem('userId');

 
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
    <div className="my-fundrisers-page">

      <div className="all-fundrisers">

        

        {fundrisers.filter(fundriser=> fundriser.applicantId === userId).map((fundriser)=>{
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
                    <span>
                      <button className='OrangeBtn' onClick={()=> navigate(`/fundriser/${fundriser._id}`)} >View</button>
                      <button className='BlueBtn' onClick={()=> navigate(`/update-fundriser/${fundriser._id}`)} >Update</button>
                    </span>
                </div>
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default MyFundrisers