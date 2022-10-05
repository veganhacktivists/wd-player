import { defaultOptions, Options } from "../options";
import { setupVideo } from "../video";
import "video.js/dist/video-js.min.css";
import "./theme.css";
import videojs from "video.js";

export default async function wdplayer(
  selector: string,
  opts: Partial<Options>
) {
  // Setup options.
  const options = { ...defaultOptions, ...opts } as Options;
  if (!options.poster) {
    options.poster = `${options.host}/${options.movie}/posters/default.png`;
  }

  // Setup video, and its captions.
  const { video } = await setupVideo(selector, options);

  // Configure CSS variables
  video.style.setProperty("--vjs-color-main", options.color);

  // Initialize Video.js.
  videojs(video);
}

// Make the player globally available.
if (typeof window !== "undefined") {
  // @ts-ignore
  window.wdplayer = wdplayer;
}
