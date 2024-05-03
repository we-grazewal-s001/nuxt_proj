import {z} from 'zod'
export const userSchema=z.object({
    firstName: z.string({
        invalid_type_error:'Please enter a valid name'
    }).min(3,'Name should be at least 3 characters long.'),
    userName:z.string({
        invalid_type_error:'Please enter a valid name'
    }).min(3,'Name should be at least 3 characters long.'),
    email: z.string().email('Email is not valid'),
    displayName: z.string().min(3,'Display name should be at least 3 characters long'),

})