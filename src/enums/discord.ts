export enum PREMIUM_TYPES_TITLE {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2,
  NITRO_BASIC = 3,
}

enum PREMIUM_TYPES_DESC {
  NONE = "None",
  NITRO_CLASSIC = "Nitro Classic",
  NITRO = "Nitro",
  NITRO_BASIC = "Nitro Basic",
}

export const PREMIUM_TYPES = {
  0: PREMIUM_TYPES_DESC["NONE"],
  1: PREMIUM_TYPES_DESC["NITRO_CLASSIC"],
  2: PREMIUM_TYPES_DESC["NITRO"],
  3: PREMIUM_TYPES_DESC["NITRO_BASIC"],
};

export enum BADGES_FLAGS {
  DISCORD_EMPLOYEE = 1 << 0,
  PARTNERED_SERVER_OWNER = 1 << 1,
  HYPESQUAD_EVENTS_MEMBER = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HYPESQUAD_HOUSE_BRAVERY = 1 << 6,
  HYPESQUAD_HOUSE_BRILLANCE = 1 << 7,
  HYPESQUAD_HOUSE_BALANCE = 1 << 8,
  EARLY_NITRO_SUPPORTER = 1 << 9,
  TEAM_PSEUDO_USER = 1 << 10,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER = 1 << 17,
  CERTIFIED_MODERATOR = 1 << 18,
  BOT_HTTP_INTERACTIONS = 1 << 19,
  ACTIVE_DEVELOPER = 1 << 22,
}

export enum BADGES_FLAGS_DESC {
  DISCORD_EMPLOYEE = "Discord Employee",
  PARTNERED_SERVER_OWNER = "Partnered Server Owner",
  HYPESQUAD_EVENTS_MEMBER = "Hypesquad Events Member",
  BUG_HUNTER_LEVEL_1 = "Bug Hunter Level 1",
  HYPESQUAD_HOUSE_BRAVERY = "House Bravery Member",
  HYPESQUAD_HOUSE_BRILLANCE = "House Brilliance Member",
  HYPESQUAD_HOUSE_BALANCE = "House Balance Member",
  EARLY_NITRO_SUPPORTER = "Early Nitro Supporter",
  TEAM_PSEUDO_USER = "Team Pseudo User",
  BUG_HUNTER_LEVEL_2 = "Bug Hunter Level 2",
  VERIFIED_BOT = "Verified Bot",
  EARLY_VERIFIED_BOT_DEVELOPER = "Early Verified Bot Developer",
  CERTIFIED_MODERATOR = "Moderator Programs Alumni",
  BOT_HTTP_INTERACTIONS = "Bot uses only HTTP interactions and is shown in the online member list",
  ACTIVE_DEVELOPER = "Active Developer",
}
