import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    usertype:{
        type: String,
        require: true
    }
})


const fundriserSchema = mongoose.Schema({
    applicantId:{
        type: String
    },
    applicantName:{
        type: String
    },
    applicantEmail:{
        type: String
    },
    applicantMobile:{
        type: String
    },
    title:{
        type: String
    },
    description:{
        type: String
    },
    bannerImage:{
        type: String
    },
    fundriserPurpose:{
        type: String
    },
    deadline:{
        type: String
    },
    targetAmount:{
        type: Number
    },
    collectedAmount:{
        type: Number
    },
    extraImg1:{
        type: String
    },
    extraImg2:{
        type: String
    },
    extraImg3:{
        type: String
    }
})


const donationsSchema = mongoose.Schema({

    donarId:{
        type: String
    },
    donarName:{
        type: String
    },
    donarEmail:{
        type: String
    },
    donationAmount:{
        type: Number
    },
    remark:{
        type: String
    },
    fundriserId:{
        type: String
    },
    fundriserPurpose:{
        type: String
    }
})

export const User = mongoose.model('users', userSchema);
export const Fundriser = mongoose.model('fundrisers', fundriserSchema);
export const Donation = mongoose.model('donations', donationsSchema);