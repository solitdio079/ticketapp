import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        unique: true,
        required: true,
        type: String
    },
    avatar: {
        type: String
    },
    fullName: {
        type: String,
       
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isArtist: {
        type: String,
        default: false
    },
    phone: {
       
        unique: true,
        type: String
    }
})

export default mongoose.model('User', userSchema)