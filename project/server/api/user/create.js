import User from "../../models/User"



export default defineEventHandler(async(event)=>{
    if(event.method=='POST'){

    const body=await readBody(event)
        const {
            firstName,
            lastName,
            userName,
            middleName,
            email,
            displayName,
            title,
            image,
            country,
            gender
        } = body;

        if (!firstName || !lastName || !userName || !email || !displayName || !title || !country || !gender) {
            return { error: 'All required fields must be provided.' }
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: 'Invalid email address format.' }
        }

        console.log(body)
        const user=await User.create(body)
        return user
    }else{
        return "Hello from user server, try to post here only"
    }
})