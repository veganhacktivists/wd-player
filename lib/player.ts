import Plyr from "plyr";
import "plyr/dist/plyr.css";

// Types -----------------------------------------------------------------------
interface Options {
  color: string;
  poster?: string;
  movie: string;
  host: string;
}

interface Movie {
  poster: string;
  sources: Source[];
  captions: Record<string, string>;
}

interface Source {
  type: string;
  src: string;
}

// Options ---------------------------------------------------------------------
const defaultOptions: Partial<Options> = {
  color: "#f00",
  movie: "dominion",
  host: "https://embed.watchdominion.org",
};

// Main ------------------------------------------------------------------------
export default async function wdplayer(
  selector: string,
  opts: Partial<Options>
) {
  const options = { ...defaultOptions, ...opts } as Options;
  const poster = `${options.host}/${options.movie}/posters/default.png`;

  // Find the element.
  const video = document.querySelector(selector);
  if (!(video instanceof HTMLVideoElement)) {
    throw new Error(`[wd-player] Can't find element "${selector}"`);
  }

  // Find and get movie data.
  let movie: Movie;
  try {
    const res = await fetch(`${options.host}/${options.movie}/movie.json`);
    movie = await res.json();
  } catch (err) {
    throw new Error(`[wd-player] Can't find movie "${options.movie}"`);
  }

  // Set necessary properties.
  video.playsInline = true;
  video.controls = true;
  video.dataset.poster = options.poster || poster;

  // Create sources.
  for (const source of movie.sources) {
    const element = document.createElement("source");
    element.type = source.type;
    element.src = source.src;

    video.appendChild(element);
  }

  // Create captions.
  for (const [srclang, label] of Object.entries(movie.captions)) {
    const element = document.createElement("track");
    element.kind = "captions";
    element.label = label;
    element.srclang = srclang;
    element.src = `${options.host}/${options.movie}/captions/${srclang}.vtt`;

    video.appendChild(element);
  }

  // Set theme.
  video.style.setProperty("--plyr-color-main", options.color);

  // Initialize Plyr.
  new Plyr(video);
}

// Make the player globally available.
if (typeof window !== "undefined") {
  // @ts-ignore
  window.wdplayer = wdplayer;
}
