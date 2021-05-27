import axios from "axios";
import { initializeAxiosMockAdapter } from "./mock.config";

let instance = axios.create({
  baseURL: "http://localhost:3000"
});

initializeAxiosMockAdapter(instance);

export const http = instance;
