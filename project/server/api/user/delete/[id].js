import User from "../../../models/User";

export default defineEventHandler(async(event)=>{
    if(event.method=='DELETE'){

       try {
           const {id}= event.context.params
           console.log(id,'dkjvnsi vkjsd s')
           await User.findByIdAndDelete({_id:id})
           return "deleted Successfully"
       }catch (err){
            return "Something went wrong"
       }

    }else{
        return "Hello from user server, this api supports delete only"
    }
})