import { User } from "../models/user.model"
import { ApiError } from "../utils/apiError"
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/mail"


export const register = async (req:any,res:any) => {
// get the data , confirm it
// check if user exist
// hash password  -> middleware 
// if not create new user
// create jwt 
     // -> save jwt in cookies
     // -> send verification email
 
    const {name, email, password} = req.body

     if(!name || !email && !password){
      throw new ApiError(400, "All fields are required")
     }
      
     
     if(!email.includes(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        throw new ApiError(400, "Invalid email format")
     }
     if(!password.includes("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$")){
        throw new ApiError(400, "Invalid email format")
     }
    

     
     try {
        const existingUser = await User.find(email)
        if(existingUser){
            throw new ApiError(400, "User already exists.")
        }

        const newUser = await User.create(
            {name,
                email,
                password
            }
        )

        if (!process.env.JWT_SECRET) {
           throw new Error("JWT_SECRET is not set in environment variables");
        }

        if (!process.env.JWT_EXPIRE) {
  throw new Error("JWT_EXPIRE is not set in environment variables");
}
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE as  `${number}s` | `${number}m` | `${number}h` | `${number}d` | number })
        console.log("jwt token------->", token);
        

       await sendEmail(newUser.email,token)

        res.cookie(token,"token",
             {maxAge: 1000 * 60 * 60 * 24 * 30},   // 30 days
            )
        
     } catch (error) {
        console.error("Error while registering the user.");
        throw new ApiError(500, "Error while registering the user.")
        
     }


}
