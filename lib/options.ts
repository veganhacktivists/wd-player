export interface Options {
  color: string;
  poster?: string;
  movie: string;
  host: string;
}

export interface Movie {
  poster: string;
  sources: Source[];
  captions: Record<string, string>;
}

export interface Source {
  type: string;
  src: string;
}

export const defaultOptions: Partial<Options> = {
  color: "#f00",
  movie: "dominion",
  host: "https://embed.watchdominion.org",
};
