import axios from "axios";
import { keys } from "../keys.js";

export default axios.create({ baseURL: keys.baseUrl });
