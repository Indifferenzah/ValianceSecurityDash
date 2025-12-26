export const ConfigSchema = {
  presence: {
    status: { type: "select", options: ["online","dnd","idle","invisible"] },
    memberCountGuild: { type: "text" },
    updateInterval: { type: "number" },
    activity: {
      type: { type: "select", options: ["PLAYING","WATCHING","LISTENING","COMPETING"] },
      text: { type: "text" },
    },
  },
  safety: {
    ignoreIfExecutorIsOwner: { type: "toggle" },
    ignoreIfExecutorIsWhitelisted: { type: "toggle" },
    ignoreIfExecutorIsBot: { type: "toggle" },
    ignoreIfActionBySelf: { type: "toggle" },
    auditFetchLimit: { type: "number" },
    auditMaxAgeMs: { type: "number" },
  },
  // aggiungi qui tutto ciò che vuoi rendere “configurabile”
} as const;
