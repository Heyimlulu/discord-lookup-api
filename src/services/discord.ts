import discordApi from "../api/discord";
import { insertLookup } from "../utils/prisma";

const getUser = async (userId: string) => {
    if (userId.length < 15 || userId.length > 22) {
        throw new Error("User ID is too short and should be 15 or 22 characters long");
    }

    const discordUser = await discordApi.getUserById(userId);

    const data = {
        userId: discordUser.id,
        username: discordUser.global_name ? `${discordUser.username} (${discordUser.global_name})` : discordUser.username,
        userType: (!discordUser.bot ? "USER" : discordUser.system ? "SYSTEM" : "BOT"),
        source: "GRAPHQL"
    }

    await insertLookup(data);

    return discordUser;
}

export default {
    getUser,
}