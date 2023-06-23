// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StatusCodes } from "http-status-codes"
import connectDb from "../../../db/DbConfig.js"
import UserModel from "../../../models/UserModel.js"
import bcrypt from 'bcrypt'
import multer from "multer"
import path from 'path';


connectDb()
 
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, "public/images")
  },

  filename:function(req,file,cb){
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

// const upload = multer({storage:storage})

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//    const destinationPath =  path.join(process.cwd(), 'public', 'images');
//   console.log("dfdfa",destinationPath)
//     cb(null, destinationPath);
//   },
//   // Set the destination folder for uploaded images
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const extension = file.originalname.split('.').pop(); // Get the file extension
//     const filename = path.join(`${file.fieldname}-${uniqueSuffix}.${extension}`);
//     cb(null, filename);
//   },
// });

const upload = multer({ storage: storage });




export default async function savedata(req, res) {
  try {
    if (req.method === 'POST') {
      console.log('req.methods', req.method)

      upload.single('image')(req,res,async(err)=>{
        if(err){
          console.log("errrorr", err)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in uploading image",err})
        }
        try {
          const encryptedPassword = await bcrypt.hashSync(req.body.password, 10)
        req.body['password'] = encryptedPassword

        const image = req?.file?req?.file?.filename:''
        const { name, email, phone, age, password, gender } = req.body
        const user = UserModel({ name, email, phone, age, password, gender, image })

        const savedUser = await user.save()
        res.status(StatusCodes.CREATED).json({ data: savedUser })

        } catch (error) {
          console.log("error in post data", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in post data" })
        }
        
      })
     
    }

    else if (req.method === 'GET') {
      try {

        const user = await UserModel.find()
        res.status(StatusCodes.OK).json({ data: user, message: "data find successfully", success: true })
      } catch (error) {
        console.log("error in get all the data", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetch all user" })
      }
    }

    else if (req.method === 'GET') {
      try {

        console.log(req.params)
        const user = await UserModel.findById(req.query.id)
        res.status(StatusCodes.OK).json(user)
      } catch (error) {
        console.log("error in fetching user by id", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in fetching user by id" })
      }
    }

    else if (req.method === 'DELETE') {
      try {

        console.log(req.query.id)

        const user = await UserModel.findByIdAndDelete(req.query.id)
        res.status(StatusCodes.OK).json(user)
      } catch (error) {
        console.log("error in deleting user ", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in delete user bu id" })
      }
    }


    else if (req.method === "PUT") {
      try {
        const { id } = req.query

        const user = await UserModel.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email }, { new: true })
        res.status(StatusCodes.OK).json(user)

      } catch (error) {
        console.log("error in user update", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in update user" })
      }
    }

  } catch (error) {
    console.log('error in creating user')
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in creating user" })
  }
}

export const config = {
  api: { bodyParser: false },
};