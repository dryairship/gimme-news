import dotenv from 'dotenv';

const envResult = dotenv.config();
if (envResult.error) {
    throw new Error(".env file not found");
}

export default {
    newsAPIKey: process.env.NEWSAPI_KEY
};