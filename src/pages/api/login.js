import { StatusCodes } from "http-status-codes"
import connectDb from "../../../db/DbConfig.js"
import UserModel from "../../../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDb()

export default async function userLogin(req, res) {
    if (req.method === 'POST') {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({email:email})
            const isPasswordMatch = await bcrypt.compare(password, user.password)


            if(!email || !password){
                return res.status(StatusCodes.BAD_REQUEST).json({message:"please fill all field carefully"})
            }
            else if(!isPasswordMatch){
                return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid credentials"})
            }
            else{
                // const token = await user.generateAuthToken()
                // console.log(process.env.SECRET_KEY)
                const token = await jwt.sign("_id:user._id", process.env.SECRET_KEY)
                res.status(StatusCodes.OK).json({data:user, token:token})
            }
        } catch (error) {
            console.log("error in login", error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in login user"})
        }
    }
}