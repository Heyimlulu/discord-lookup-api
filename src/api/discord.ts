import axios from "axios";

import "dotenv/config";
import { validateResponse } from "../utils/httpClients";

const instance = axios.create({
  baseURL: "https://discord.com/api/v10",
  headers: {
    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
  },
});

const getUserById = async (userId: string) => {
  return instance
    .get(`/users/${userId}`)
    .then((response) => validateResponse(response)?.data);
};

export default {
  getUserById,
};
