import formidable from "formidable"
import fs from 'fs'
import { StatusCodes } from "http-status-codes"

export default async function ImageUpload(req,res){
    console.log(req.method)

    if(req.method==="POST"){
        try {
            const form = new formidable.IncomingForm()
            console.log("formmm", form)
            form.parse(req,(err, fields, files)=>{
                if(err){
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Error uploading files"})
                }
                console.log("reqq",req)
                console.log("fields,",fields) 
                console.log("files", files)

                const {name, email, phone, age, password, gender} = fields
                const {image} = files

                res.status(StatusCodes.CREATED).json({message:"data post successfully"})
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in upload image"})
        }
    }
}