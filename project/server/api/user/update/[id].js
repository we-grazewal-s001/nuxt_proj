import User from "../../../models/User"
export default defineEventHandler(async(event)=>{
    if (event.method === 'PATCH') {
        try {

            const body = await readBody(event);

            const { id } = event.context.params;

            const newUser = await User.findOneAndUpdate({ _id: id }, body, { new: true });

            console.log(body);
            return newUser;
        } catch (error) {
            throw createError({
                statusCode:400,
                statusMessage:'Failed to update user.'
            })
            // console.error("Error updating user:", error);

            // return { error: "" };
        }
    } else {

        return "Hello from user server, API supports updates only";
    }

})