import dotenv from "dotenv";

dotenv.config();

const keys = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL,
  apiKey: process.env.API_KEY,
};

const checkEnvVariables = keys => {
  for (let key in keys) {
    if (!keys[key]) {
      throw new Error(`${key} must be defined`);
    }
  }
};

export { keys, checkEnvVariables };
