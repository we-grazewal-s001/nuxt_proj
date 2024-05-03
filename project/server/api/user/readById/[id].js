import User from "../../../models/User"

export default defineEventHandler(async(event)=>{
    if(event.method=='GET'){
        try {
            let {id}=event.context.params
            const user= await User.findById(id).exec()

            return user
        }catch (err){
            throw createError({
                statusCode:400,
                statusMessage:'User not found or server crashed'
            })
        }

    }else{
        return "Hello from user server, api supports read only"
    }
})