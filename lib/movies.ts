interface Source {
  type: string;
  src: string;
}

interface Caption {
  label: string;
  srclang: string;
  default?: boolean;
  src: string;
}

interface Movie {
  poster: string;
  sources: Source[];
  captions: Caption[];
}

export const movies: Record<string, Movie> = {
  dominion: {
    poster: "https://watchdominion.org/posters/default.png",
    sources: [
      {
        type: "video/mp4",
        src: "https://watchdominion.org/watchdominion/movie.mp4",
      },
    ],
    captions: [
      {
        label: "Spanish captions",
        srclang: "es",
        default: true,
        src: "https://dontwatch.vercel.app/captions/es.vtt",
      },
    ],
  },
  dontwatch: {
    poster: "",
    sources: [],
    captions: [],
  },
};
