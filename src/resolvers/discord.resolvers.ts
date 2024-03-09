import dayjs from "dayjs";

import discord from "../services/discord";

import {
  PREMIUM_TYPES,
  PREMIUM_TYPES_TITLE,
  BADGES_FLAGS_DESC,
  BADGES_FLAGS,
} from "../enums/discord";
import { SharedContext } from "../utils/context";

const getMediaContent = (user, type) => {
  switch (type) {
    case "avatars":
      return {
        id: user.avatar,
        url: `https://cdn.discordapp.com/${type}/${user.id}/${user.avatar}.${
          user.avatar.startsWith("a_") ? "gif" : "png"
        }`,
      };
    case "banners":
      return {
        id: user.banner,
        url: `https://cdn.discordapp.com/${type}/${user.id}/${user.banner}.${
          user.banner.startsWith("a_") ? "gif" : "png"
        }`,
      };
  }
};

const convertColor = (color: number) => {
  if (color) {
    const hex = color.toString(16);
    return `#${hex.slice(0, 6)}`;
  }

  return null;
};

const getBadges = (user) => {
  const badges = [];

  if (user.public_flags === 0 && user.bot) {
    badges.push({
      title: "BOT",
      description: "Bot",
      url: "/static/Bot.svg",
    });
    return badges;
  }

  for (const flag in BADGES_FLAGS) {
    if (user.public_flags & parseInt(flag)) {
      const badgeName = BADGES_FLAGS_DESC[BADGES_FLAGS[flag]];
      badges.push({
        title: badgeName.toUpperCase().replaceAll(" ", "_"),
        description: badgeName,
        url: `/static/${badgeName.replaceAll(" ", "_")}.svg`,
      });
    }
  }

  const NITRO_BADGE_URL = "/static/Nitro.svg";
  switch (user.premium_type) {
    case 1:
      badges.push({
        title: PREMIUM_TYPES_TITLE[1],
        description: PREMIUM_TYPES[1],
        url: NITRO_BADGE_URL,
      });
      break;
    case 2:
      badges.push({
        title: PREMIUM_TYPES_TITLE[2],
        description: PREMIUM_TYPES[2],
        url: NITRO_BADGE_URL,
      });
      break;
    case 3:
      badges.push({
        title: PREMIUM_TYPES_TITLE[3],
        description: PREMIUM_TYPES[3],
        url: NITRO_BADGE_URL,
      });
      break;
    default:
      break;
  }

  return badges;
};

const getAccountTimestamp = (id: string): number => {
  return parseInt(id) / 4194304 + 1420070400000;
};

const getDifference = (timestamp: number): number => {
  return Math.abs(dayjs().valueOf() - timestamp);
};

const discordResolvers = {
  Discord: {
    lookup: (_, { userId }) => discord.getUser(userId),
  },
  Snowflake: {
    user: (parent) => parent,
    timeSinceCreation: (parent) => ({
      timestamp: dayjs(getAccountTimestamp(parent.id)).valueOf(),
    }),
  },
  User: {
    type: (parent) => (!parent.bot ? "USER" : parent.system ? "SYSTEM" : "BOT"),
    id: (parent) => parent.id,
    username: (parent) => parent.username,
    discriminator: (parent) => parent.discriminator,
    displayName: (parent) => parent.global_name,
    profileAppearance: (parent) => parent,
    isBot: (parent) => parent.bot,
    isSystem: (parent) => parent.system,
    badges: (parent) => getBadges(parent),
    creationTimestamp: (parent) =>
      dayjs(getAccountTimestamp(parent.id)).valueOf(),
    createdAt: (parent) =>
      dayjs(getAccountTimestamp(parent.id)).format("MMMM D YYYY, hh:mm:ss A"),
    accountAge: (parent) =>
      Math.round(
        dayjs().diff(dayjs(getAccountTimestamp(parent.id)), "year", true)
      ),
  },
  ProfileAppearance: {
    avatar: (parent) => parent.avatar && getMediaContent(parent, "avatars"),
    banner: (parent) => parent.banner && getMediaContent(parent, "banners"),
    avatarDecoration: (parent) =>
      parent.avatar_decoration_data &&
      `https://cdn.discordapp.com/avatar-decoration-presets/${parent.avatar_decoration_data.asset}`,
    accentColor: (parent) => convertColor(parent.accent_color),
  },
  TimeSinceCreation: {
    years: (parent) => dayjs(getDifference(parent.timestamp)).year() - 1970,
    months: (parent) => dayjs(getDifference(parent.timestamp)).month(),
    days: (parent) => dayjs(getDifference(parent.timestamp)).day(),
    hours: (parent) => dayjs(getDifference(parent.timestamp)).hour(),
    minutes: (parent) => dayjs(getDifference(parent.timestamp)).minute(),
    seconds: (parent) => dayjs(getDifference(parent.timestamp)).second(),
    milliseconds: (parent) =>
      dayjs(getDifference(parent.timestamp)).millisecond(),
  },
};

export default discordResolvers;
