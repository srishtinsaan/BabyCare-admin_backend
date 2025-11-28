import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("Database connected successfully!")
            
    
    } catch (error) {
                    console.error("Database connection failed", error);

    }
}

export  {connectDB, prisma}

// Check DB connection


