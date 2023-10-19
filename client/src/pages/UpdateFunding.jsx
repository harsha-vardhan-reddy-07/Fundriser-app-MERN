import React, { useEffect, useState } from 'react'
import '../styles/NewFunding.css'
import {ImArrowLeft2, ImArrowRight2} from 'react-icons/im'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const UpdateFunding = () => {
    const navigate = useNavigate();
    const [updateFundCard, setupdateFundCard] = useState(1);

    const userId = localStorage.getItem('userId');

    const [fundriserPurpose, setFundriserPurpose] = useState('');
    const [applicantName, setApplicantName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [applicantMobile, setApplicantMobile] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [deadline, setDeadline] = useState('');
    const [targetAmount, setTargetAmount] = useState(0);
    const [extraImg1, setExtraImg1] = useState("");
    const [extraImg2, setExtraImg2] = useState("");
    const [extraImg3, setExtraImg3] = useState("");


  const [fundriser, setFundriser] = useState();

  const params = useParams();

  useEffect(()=>{
    fetchFundriser();
  }, [])

  const fetchFundriser = async() =>{
    await axios.get(`http://localhost:6001/fetch-fundriser/${params['id']}`).then(
      (response)=>{
        setFundriser(response.data);
        setFundriserPurpose(response.data.fundriserPurpose);
        setApplicantName(response.data.applicantName);
        setApplicantEmail(response.data.applicantEmail);
        setApplicantMobile(response.data.applicantMobile);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setBannerImage(response.data.bannerImage);
        setDeadline(response.data.deadline);
        setTargetAmount(response.data.targetAmount);
        setExtraImg1(response.data.extraImg1);
        setExtraImg2(response.data.extraImg2);
        setExtraImg3(response.data.extraImg3);
      }
    )
  }



    const handleUpdateFundriser = async ()=>{

      await axios.post('http://localhost:6001/update-fundriser', {fundriserId: params['id'] ,applicantId: userId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3, collectedAmount: 0}).then(
        (response)=>{

          alert("Fundriser updated!!");
 
          setFundriserPurpose('');
          setApplicantName('');
          setApplicantEmail('');
          setApplicantMobile('');
          setTitle('');
          setDescription('');
          setBannerImage('');
          setDeadline('');
          setTargetAmount(0);
          setExtraImg1('');
          setExtraImg2('');
          setExtraImg3('');

          navigate('/my-fundrisers');

          
        }
      ).catch((err)=>{
        alert("Error occured!!");
      })
  }


  
    return (
      <div className="new-fundriser-page">
  
          
  
            {/* step 1 */}
  
            {updateFundCard === 1 ?
  
              <div className="new-fundriser-card">
                <h3>Update Fundriser Details</h3>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              
                <div className="new-fundriser-form">
  
                <div className="form-floating mb-3">
                    <select className="form-select form-select-md mb-3" id='new-fund-type-select' aria-label=".form-select-lg example" onChange={(e)=> setFundriserPurpose(e.target.value)} value={fundriserPurpose} >
                      <option selected>Choose the need for the fundriser</option>
                      <option value="Personal Education">Personal Education</option>
                      <option value="Personal Health">Personal Health</option>
                      <option value="Orphanages/Oldagehomes">Orphanages/Oldagehomes</option>
                      <option value="Disaster Relief">Disaster Relief</option>
                    </select>
                    <label htmlFor="new-fund-type-select">Need for Fundriser</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="new-fund-applicant-name" placeholder="Name" onChange={(e)=> setApplicantName(e.target.value)} value={applicantName} />
                    <label htmlFor="new-fund-applicant-name">Applicant Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="new-fund-applicant-email" placeholder="Email" onChange={(e)=> setApplicantEmail(e.target.value)} value={applicantEmail} />
                    <label htmlFor="new-fund-applicant-email">Applicant Email</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="new-fund-applicant-mobile" placeholder="mobile" onChange={(e)=> setApplicantMobile(e.target.value)} value={applicantMobile} />
                    <label htmlFor="new-fund-applicant-mobile">Applicant Mobile number</label>
                  </div>
  
                    <span className='new-fundriser-btns' >
                      <button className='new-fundriser-blueBtn' onClick={()=> navigate('/')}> <ImArrowLeft2 /> Home</button>
                      <button className='new-fundriser-orangeBtn' onClick={()=> setupdateFundCard(2)} >Next <ImArrowRight2 /> </button>
                    </span>
  
                </div>
  
              </div>
            :
            
            ""}
            
   
            {/* step 2 */}
  
            {updateFundCard === 2 ?
  
              <div className="new-fundriser-card">
                <h3>Update Fundriser Details</h3>
                <div class="progress">
                  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
  
                <div className="new-fundriser-form">
  
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="new-fund-title" placeholder="Name" onChange={(e)=> setTitle(e.target.value)} value={title} />
                    <label htmlFor="new-fund-title">Fundriser title</label>
                  </div>

                  <span className='new-fund-span-2'>

                      <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="new-fund-applicant-name" placeholder="Name" onChange={(e)=> setTargetAmount(e.target.value)} value={targetAmount} />
                        <label htmlFor="new-fund-applicant-name">Required amount</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input type="date" className="form-control" id="new-fund-applicant-name" placeholder="Name" onChange={(e)=> setDeadline(e.target.value)} value={deadline} />
                        <label htmlFor="new-fund-applicant-name">Deadline</label>
                      </div>

                  </span>

                  <div className="form-floating mb-3">
                    <textarea className="form-control" id="new-fund-description" rows="5" placeholder='description' onChange={(e)=> setDescription(e.target.value)} value={description} ></textarea>
                    <label htmlFor="new-fund-description">Description</label>
                  </div>

                  <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="new-fund-applicant-mobile" placeholder="mobile" onChange={(e)=> setBannerImage(e.target.value)} value={bannerImage} />
                        <label htmlFor="new-fund-applicant-mobile">Add Banner Image url</label>
                  </div>

                  <span className='new-fund-span-3'>

                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="new-fund-applicant-mobile" placeholder="mobile" onChange={(e)=> setExtraImg1(e.target.value)} value={extraImg1} />
                        <label htmlFor="new-fund-applicant-mobile">Add Image url</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="new-fund-applicant-mobile" placeholder="mobile" onChange={(e)=> setExtraImg2(e.target.value)} value={extraImg2}/>
                        <label htmlFor="new-fund-applicant-mobile">Add Image url</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="new-fund-applicant-mobile" placeholder="mobile" onChange={(e)=> setExtraImg3(e.target.value)} value={extraImg3}/>
                        <label htmlFor="new-fund-applicant-mobile">Add Image url</label>
                      </div>
                  </span>
  
                    <span className='new-fundriser-btns' >
                      <button className='new-fundriser-blueBtn' onClick={()=> setupdateFundCard(1)}> <ImArrowLeft2 /> Back</button>
                      <button className='new-fundriser-orangeBtn' onClick={handleUpdateFundriser} >Update <ImArrowRight2 /> </button>
                    </span>
  
                </div>
  
              </div>
              :
  
              ""}
  
          
  
  
      </div>
    )
  }

export default UpdateFunding