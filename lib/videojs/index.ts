import { defaultOptions, Options } from "../options";
import { setupVideo } from "../video";

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

  // Initialize Video.js.
  console.log(video);
}

// Make the player globally available.
if (typeof window !== "undefined") {
  // @ts-ignore
  window.wdplayer = wdplayer;
}
