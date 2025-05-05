import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient({
    // log: ["query"],
});

export default prisma;