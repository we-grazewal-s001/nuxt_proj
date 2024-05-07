import { z, ZodType } from 'zod';

// the list of field names
const fields = ['firstName', 'lastName', 'userName', 'email', 'displayName', 'title', 'country', 'gender', 'image'];

// type for the validator object that maps field names to Zod types
type Validator = {
  [key in typeof fields[number]]: ZodType<string, any>;
};

// Create the validator object dynamically based on field names
const validator: Validator = fields.reduce((acc, fieldName) => {
  switch (fieldName) {
    case 'email':
      acc[fieldName] = z.string().min(1, { message: `${splitCamelCase(fieldName)} is required` }).email();
      break;
    case 'image':
      acc[fieldName] = z.string().min(1, { message: `${splitCamelCase(fieldName)} is required` }).url();
      break;
    default:
      acc[fieldName] = z.string().min(1, { message: `${splitCamelCase(fieldName)} is required` }).max(50, { message: `Cannot exceed 50 characters` });
      break;
  }
  return acc;
}, {} as Validator);
 
export const userSchema = z.object(validator);

 

 


    // {
    //     firstName: z.string().min(1)
    //     .min(3, { message: 'First name should be at least 3 characters long' })
    //     .max(50, { message: 'Name should not exceed 50 characters' }),
    
    //   lastName: z.string().min(1,{message:'Last name is required'})
    //     .min(3, { message: 'Last name should be at least 3 characters long' })
    //     .max(50, { message: 'Last name should not exceed 50 characters' }),
    
    //   userName: z.string().min(1,{message:'User name is required'})
    //     .min(3, { message: 'User name should be at least 3 characters long' })
    //     .max(20, { message: 'Username should not exceed 20 characters' }),
    
    //   email: z.string().min(5,{message:'Email is required'})
    //     .email({ message: 'Email is not valid' }),
    
    //   displayName: z.string().min(1,{message:'Display name is required'})
    //     .min(3, { message: 'Display name should be at least 3 characters long' })
    //     .max(50, { message: 'Display name should not exceed 50 characters' }),
    
    //   title: z.string().min(1,{message:'Title is required'}),
    
    //   country: z.string()
    //     .min(2, { message: 'Country is required' }),
        
    //    gender: z.string()
    //    .min(1, { message: 'Gender is required' }),
    
    //     image: z.string()
    //     .min(5, { message: 'Image is required to uploaded' }),
    // }