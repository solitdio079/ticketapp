import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  avatar: {
    type: String,
  },
  fullName: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isArtist: {
    type: Boolean,
    default: false,
  },
  phone: {
    unique: true,
    type: String,
  },
  isOrganizer: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.model('User', userSchema)