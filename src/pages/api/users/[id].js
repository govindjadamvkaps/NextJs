// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StatusCodes } from "http-status-codes"
import connectDb from "../../../../db/DbConfig.js"
import UserModel from "../../../../models/UserModel.js"

connectDb()

export default async function savedata(req, res) {
    try {
        console.log('req.methods', req.method)

        if (req.method === 'DELETE') {
            try {
                const { id } = req.query
                console.log(id)
                const user = await UserModel.findByIdAndDelete(id)
                return res.status(StatusCodes.OK).json({ message: "delete successfully" })

            } catch (error) {
                console.log('error in deleting user')
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in deleting user by id" })

            }

        }

        else if (req.method === 'GET') {
            try {
                console.log(req.query.id)
                const { id } = req.query
                const user = await UserModel.findById(id)
                console.log("find user by object id ",user)
                return res.status(StatusCodes.OK).json(user)

            } catch (error) {
                console.log("error in findbyId", error)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in find user by id" })
            }
        }


        else if(req.method === 'PUT'){
            try {
                console.log(req.query.id)
                const {id} = req.query
                let user = await UserModel.findByIdAndUpdate(id,{
                    name:req.body.name, email:req.body.email, age:req.body.age
                },{new:true})
            //     user.name = req.body.name
            //     user.email = req.body.email
            //   user= await user.save({new:true})
            
                res.status(StatusCodes.OK).json(user)
            } catch (error) {
                console.log("error in updating data", error)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in updating user"})
            }
        }

    } catch (error) {
        console.log('error in creating user')
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error in creating user" })
    }
}
