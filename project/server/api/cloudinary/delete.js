
import {v2 as cloudinary} from "cloudinary"
import { readMultipartFormData } from 'h3';
import {writeFile,unlink} from "fs/promises";
import User from "../../models/User"
cloudinary.config({
    cloud_name: 'dz0stvks0',
    api_key: '375712651522962',
    api_secret: '27iC0ShrovzCsva0jhRU_-8nFJQ',
    secure: true
});


export default defineEventHandler(async (event) => {

        try {
            let body =await readBody(event)

            console.log(body)
            const user=await User.findOne({imagePublicId:body.id}).lean().exec()

            const res = await cloudinary.uploader.destroy(body.id, function(res){
                console.log(res)
            })
            if(user){
                let newData={...user,image:"",imagePublicId:""}
                await User.findByIdAndUpdate(user._id ,newData)
            }
            return res
        } catch (error) {
            console.log(error);
            return createError({
                statusCode: 500,
                statusMessage: 'Something went wrong.',
            });
        }

})