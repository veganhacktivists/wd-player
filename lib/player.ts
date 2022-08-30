import Plyr from "plyr";
import "plyr/dist/plyr.css";
import "./menu-height-fix.css";
import { labels } from "./locale";

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

// Helpers ---------------------------------------------------------------------
function createLocaleMap(locales: Array<keyof typeof labels>) {
  const map: Record<string, string> = {};

  for (const locale of locales) {
    map[locale] = labels[locale] ?? locale;
  }

  return map;
}

function getSortedLabels(map: Record<keyof typeof labels, string>) {
  return Object.entries(map).sort(([_0, a], [_1, b]) =>
    a.localeCompare(b, "en")
  );
}

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

  // Create captions that work for both maps and arrays.
  let localeLabels = movie.captions ?? {};
  if (Array.isArray(movie.captions)) {
    localeLabels = createLocaleMap(movie.captions);
  }

  for (const [srclang, label] of getSortedLabels(localeLabels)) {
    const element = document.createElement("track");
    element.kind = "captions";
    element.label = label;
    element.srclang = srclang.slice(0, 2);
    element.src = `${options.host}/${options.movie}/captions/${srclang}.vtt`;

    video.appendChild(element);
  }

  // Initialize Plyr.
  const plyr = new Plyr(video);

  // Configure CSS variables (theme and video height).
  const { height } = video.getBoundingClientRect();
  plyr.elements.container?.style.setProperty(
    "--plyr-color-main",
    options.color
  );
  plyr.elements.container?.style.setProperty("--video-height", `${height}px`);
}

// Make the player globally available.
if (typeof window !== "undefined") {
  // @ts-ignore
  window.wdplayer = wdplayer;
}
