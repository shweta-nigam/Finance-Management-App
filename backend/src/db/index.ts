import mongoose from "mongoose"

export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("db connected successfully!");     
    } catch (error: unknown) {
         console.log("db connection failed");
        if( error instanceof Error){
            console.error("DB error:", error.message);
            
        }
        process.exit(1)
    }
}