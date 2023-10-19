import React, { useEffect, useState } from 'react'
import '../styles/FundriserDetails.css'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom';
import {BiSolidShareAlt} from 'react-icons/bi'


const FundriserDetails = () => {

  const [fundriser, setFundriser] = useState();

  const navigate = useNavigate();

  const params = useParams();


  useEffect(()=>{
    fetchFundriser();
  }, [])

  const fetchFundriser = async() =>{
    await axios.get(`http://localhost:6001/fetch-fundriser/${params['id']}`).then(
      (response)=>{
        setFundriser(response.data);
        console.log(response.data);
      }
    )
  }


  const [donationAmount, setDonationAmount] = useState(0);
  const [remark, setRemark] = useState('');

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const handleDonation = async() =>{
    await axios.post(`http://localhost:6001/make-donation`, {donarId: userId, donarName: username, donarEmail: email, donationAmount, remark, fundriserId: fundriser._id, fundriserPurpose: fundriser.fundriserPurpose}).then(
        (response)=>{
            alert('donation successful')
          setFundriser(response.data);
          console.log(response.data);
          setDonationAmount(0);
          setRemark('');
          fetchFundriser();
          fetchDonations();
          
        }
      )
  }


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
 

  const shareURL = async () => {
    try {
      await navigator.share({
        title: 'Share this fundriser',
        text: 'Contribute to the nobel cause',
        url: window.location.href, // Replace with your actual URL
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="fundriser-page">

        {fundriser ? 
        
        <div className="fundriser-data-container">
            
            <img className='fundriser-banner-image' src={fundriser.bannerImage} alt="" />
            
            <div className="fundriser-title-desc">
                <h4>{fundriser.title}</h4>
                <p>{fundriser.description}</p>
            </div>

            <div className="fundriser-applicant-data">
                <span>
                    <b>Fundriser Need: </b>
                    <p>{fundriser.fundriserPurpose}</p>
                </span>
                <span>
                    <b>Applicant Name: </b>
                    <p>{fundriser.applicantName}</p>
                </span>
                <span>
                    <b>Applicant Email: </b>
                    <p>{fundriser.applicantEmail}</p>
                </span>
                <span>
                    <b>Applicant Mobile: </b>
                    <p>{fundriser.applicantMobile}</p>
                </span>
                <span>
                    <b>Deadline: </b>
                    <p>{fundriser.deadline}</p>
                </span>
                <div className="fundriser-amount-status">
                    <b>Amount Collected: </b>
                    <span>
                        <p>&#8377; {fundriser.collectedAmount}</p>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${parseInt((fundriser.collectedAmount/fundriser.targetAmount)*100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{parseInt((fundriser.collectedAmount/fundriser.targetAmount)*100)}%</div>
                        </div>
                        <p>&#8377; {fundriser.targetAmount}</p>
                    </span>
                </div>
                <button className='share-btn OrangeBtn' onClick={shareURL} >Share <BiSolidShareAlt /> </button>
            </div>

            <div className="fundriser-images">
                <img src={fundriser.extraImg1} alt="" />
                <img src={fundriser.extraImg2} alt="" />
                <img src={fundriser.extraImg3} alt="" />
            </div>

            <hr />
        </div>
        
        :<></>}

        <div className="fundriser-recent-transactions">
            <h3>Donations</h3>
            <div className="input-group mb-3 fundriser-donate-form">
                <input type="number" className="form-control" placeholder="Enter amount" aria-label="Enter amount" aria-describedby="button-addon2" onChange={(e)=> setDonationAmount(e.target.value)} value={donationAmount} />
                <input type="text" className="form-control" placeholder="Remarks" aria-label="Remarks" aria-describedby="button-addon2" onChange={(e)=> setRemark(e.target.value)} value={remark} />
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={handleDonation} >Donate</button>
            </div>

            <div className="recent-donations-container">
                <h4>Recent Donations</h4>
                <div className="recent-donations">

                    {donations.filter(donation=> donation.fundriserId === fundriser._id ).map((donation)=>{
                        return(
                            <div className="recent-donation">
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
                            </div>
                        )
                    })}


                </div>
            </div>
        </div>

    </div>
  )
}

export default FundriserDetails