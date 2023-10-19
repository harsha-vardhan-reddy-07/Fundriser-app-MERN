import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Donation, Fundriser, User } from './Schemas.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const PORT = 6001;

mongoose.connect('mongodb://localhost:27017/Fundriser',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{

    app.post('/register', async (req, res) =>{
        try{
    
            const {username, email, password, usertype} = req.body;
    
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
    
            const newUser = new User({
                username, 
                email,
                password: passwordHash,
                usertype
            });
    
            const user = await newUser.save();
    
            res.status(200).json(user);
    
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });


    app.post('/login', async (req, res) =>{
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email:email});
            if(!user) return res.status(400).json({msg: "User does not exist"});
    
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
                 
            res.status(200).json(user);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    });


    app.post('/new-fundriser', async(req, res)=>{
        const {applicantId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3, collectedAmount} = req.body;
        try{

            const fundDetails = new Fundriser({applicantId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3, collectedAmount});
            await fundDetails.save();

            res.status(200).json(fundDetails);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    app.post('/update-fundriser', async(req, res)=>{
        const {fundriserId, applicantId, applicantName, applicantEmail, applicantMobile, fundriserPurpose, title, description, bannerImage, deadline, targetAmount, extraImg1, extraImg2, extraImg3} = req.body;
        try{
            const fundDetails = await Fundriser.findById(fundriserId); 
            
            fundDetails.applicantName = applicantName;
            fundDetails.applicantEmail = applicantEmail;
            fundDetails.applicantMobile = applicantMobile;
            fundDetails.fundriserPurpose = fundriserPurpose;
            fundDetails.title = title;
            fundDetails.description = description;
            fundDetails.bannerImage = bannerImage;
            fundDetails.deadline = deadline;
            fundDetails.targetAmount = targetAmount;
            fundDetails.extraImg1 = extraImg1;
            fundDetails.extraImg2 = extraImg2;
            fundDetails.extraImg3 = extraImg3;

            await fundDetails.save();

            res.status(200).json(fundDetails);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    app.get('/fetch-fundrisers', async(req, res)=>{
        try{

            const fundrisers = await Fundriser.find();

            res.status(200).json(fundrisers);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    app.get('/fetch-fundriser/:id', async(req, res)=>{
        try{

            const fundriser = await Fundriser.findById(req.params.id)
            console.log(fundriser);
            res.status(200).json(fundriser);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })


    app.get('/fetch-donations', async(req, res)=>{
        try{

            const donations = await Donation.find()
            console.log(donations);
            res.status(200).json(donations);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })

    app.post('/make-donation', async(req, res)=>{
        const {donarId, donarName, donarEmail, donationAmount, remark, fundriserId, fundriserPurpose} = req.body;
        try{

            const donation = new Donation({donarId, donarName, donarEmail, donationAmount, remark, fundriserId, fundriserPurpose});
            await donation.save();

            const fundriser = await Fundriser.findById(fundriserId);
            fundriser.collectedAmount = parseInt(fundriser.collectedAmount) + parseInt(donationAmount);
            await fundriser.save()

            console.log(donation);
            res.status(200).json(donation);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })

    app.get('/fetch-users', async(req, res)=>{
        try{

            const users = await User.find()
            console.log(users);
            res.status(200).json(users);

        }catch(err){
            res.status(500).json({error: err.message});
        }
    })



    app.listen(PORT, ()=>{
        console.log(`Running @ ${PORT}`);
    });
}).catch((e)=> console.log(`Error in db connection ${e}`));