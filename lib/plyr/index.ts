import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { defaultOptions, Options } from "../options";
import { setupVideo } from "../video";
import "./menu-height-fix.css";

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
