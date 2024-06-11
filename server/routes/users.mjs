import express from 'express'
import path from 'node:path'
import User from '../schemas/users.mjs'
import { checkSchema, matchedData, validationResult } from 'express-validator'
import userSchema from '../validators/userValidator.mjs'
import multer from 'multer'

const __dirname = path.resolve()
console.log(path.join(__dirname, '/uploads/users'))
// Business photos storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       
    cb(null, path.join(__dirname, '/uploads/users/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) + 
      '.' +
      file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

const upload = multer({ storage: storage })

const router = express.Router()



router.patch("/:id", upload.single("avatar"), (req, res, next) => {
    console.log(req.body, req.file, req)
    next()
    
}, checkSchema(userSchema), async (req, res) => {
   
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.send(result.array())
    }
    const { id } = req.params
    const data = matchedData(req)
    const avatar = req.file.filename
    try {
        const oldUser = await User.findById(id)
        const newUser = { ...oldUser, ...data, avatar }
        const replacing = await User.findByIdAndUpdate(id, newUser)
        return res.send({msg:"Mis a jour!",data:[newUser]})

    } catch (error) {
        
    }
    
})

export default router