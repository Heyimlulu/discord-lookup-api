import discordApi from "../api/discord";

const getUser = (userId: string) => {
    if (userId.length < 15 || userId.length > 22) {
        throw new Error("User ID is too short and should be 15 or 22 characters long");
    }

    return discordApi.getUserById(userId);
}

export default {
    getUser,
}