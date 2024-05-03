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
            throw createError({
                statusCode:400,
                statusMessage:'All required fields must be provided.'
            })

        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw createError({
                statusCode:400,
                statusMessage:'Invalid email address format.'
            })
        }

        const data= {
            firstName: body.firstName,
            lastName:body.lastName,
            userName:body.userName,
            middleName:body.middleName,
            email:body.email,
            displayName:body.displayName,
            title:body.title,
            image:body.image,
            country:body.country,
            gender:body.gender
        } = body;

        const user=await User.create(data)
        if(user)
        return 'New User Created Successfully'
    }else{
        return "Hello from user server, try to post here only"
    }
})