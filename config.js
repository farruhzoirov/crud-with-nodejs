import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
export default {
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    SECRET_WORD: process.env.SECRET_WORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
};
