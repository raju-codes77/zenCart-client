import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export const auth = betterAuth({
    database: mongodbAdapter(client.db("agenticAi")),
    emailAndPassword: {
        enabled: true,
    },
    // In Next.js, better-auth automatically infers the baseURL from the request
    // or from BETTER_AUTH_URL in .env if it is set.
});
