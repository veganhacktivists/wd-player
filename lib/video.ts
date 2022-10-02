import { createLocaleMap, getSortedLabels } from "./locale";
import { Movie, Options } from "./options";

export async function setupVideo(selector: string, options: Options) {
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
  video.dataset.poster = options.poster;

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

  return { video };
}
