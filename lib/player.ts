import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { movies } from "./movies";

type Options = {
  color?: string;
  poster?: string;
  movie?: keyof typeof movies;
};

const defaultOptions: Partial<Options> = {
  color: "#f00",
  movie: "dominion",
};

export default function wdplayer(selector: string, opts: Options = {}) {
  const options = { ...defaultOptions, ...opts } as Required<Options>;

  // Find the element.
  const video = document.querySelector(selector) as HTMLVideoElement | null;
  if (!video) {
    throw Error(`[wd-player] Can't find element "${selector}"`);
  }

  // Find the movie
  const movie = options.movie && movies[options.movie];
  if (!movie) {
    throw Error(`[wd-player] Can't find movie "${options.movie}"`);
  }

  // Set necessary properties
  video.playsInline = true;
  video.controls = true;
  video.dataset.poster = movie.poster;

  // Create sources
  for (const source of movie.sources) {
    const element = document.createElement("source");
    element.type = source.type;
    element.src = source.src;

    video.appendChild(element);
  }

  // Create captions
  for (const caption of movie.captions) {
    const element = document.createElement("track");
    element.kind = "captions";
    element.label = caption.label;
    element.srclang = caption.srclang;
    element.default = caption.default || false;
    element.src = caption.src;

    video.appendChild(element);
  }

  // Set theme
  video.style.setProperty("--plyr-color-main", options.color);

  // Initialize Plyr
  new Plyr(video);
}

// Make the player globally available.
if (typeof window !== "undefined") {
  // @ts-ignore
  window.wdplayer = wdplayer;
}
