import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
            
    
    } catch (error) {
                    console.error("Database connection failed", error);

    }
}

export  {connectDB}

// Check DB connection


