import { app } from "./app.js";
import { keys, checkEnvVariables } from "./keys.js";

checkEnvVariables(keys);

const PORT = keys.port || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${keys.nodeEnv} mode on port ${PORT}`)
);
