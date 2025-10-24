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
        console.log("Retrying connection in 5 seconds...");

        // Retry after 5 seconds instead of exiting
        setTimeout(db,5000)
        // process.exit(1)
    }
}