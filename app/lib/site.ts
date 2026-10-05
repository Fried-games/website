// Public origin of the site (no trailing slash). Override per environment.
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://friedgames.com").replace(/\/$/, "");

// Must match `basePath` in next.config.ts.
export const BASE_PATH = "/stroom";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export const STEAM_URL = "http://store.steampowered.com/app/3869320/Stroom/?beta=1";

export const PRIVACY_EMAIL = "support@friedgames.com";
