import User from "../../models/User"


export default defineEventHandler(async(event)=>{
    if(event.method=='GET'){
        try {
            const users= await User.find().exec()

            return users
        }catch (err){
            throw createError({
                statusCode:400,
                statusMessage:'Something went wrong'
            })
        }

    }else{
        return "Hello from user server, api supports read only"
    }
})