import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
        default:''
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        User:{
            type:Number,
            default:2001
        },
        Editor:Number,
        Admin:Number
    },
    refreshToken:{
        type:String
    }
});

export default mongoose.model('User', userSchema);
