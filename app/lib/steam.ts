export type SteamScreenshot = {
  id: number;
  path_full: string;
  path_thumbnail: string;
};

export type SteamMovie = {
  id: number;
  name: string;
  thumbnail: string;
  webm: { "480": string; max: string };
  mp4: { "480": string; max: string };
  highlight: boolean;
};

export type SteamAppData = {
  screenshots: SteamScreenshot[];
  movies: SteamMovie[];
};

const APP_ID = "3869320";

export async function getSteamAppData(): Promise<SteamAppData | null> {
  try {
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${APP_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const entry = json[APP_ID];
    if (!entry?.success) return null;
    return {
      screenshots: entry.data.screenshots ?? [],
      movies: entry.data.movies ?? [],
    };
  } catch {
    return null;
  }
}
