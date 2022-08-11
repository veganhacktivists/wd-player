# Watch Dominion Player

A javascript video player based on [Plyr] that allows you to embed Dominion or one
of the other movies, including captions and different audio formats. Movie data
is made available on https://embed.watchdominion.org.

[plyr]: https://plyr.io

## Usage

1. Install all dependencies: `yarn`.
1. Build the project: `yarn build`.
1. Start the dev server: `yarn dev`.
1. Open the dev server at http://localhost:3000

## Updating and adding movies

In the `public` folder you'll find a folder for each movie that's supported. The
layout of each movie must adhere to the structure as listed below. Captions must
be in VTT formats and posters in PNG formats.

```sh
movie-name/
  captions/
    ar-AE.vtt
    bg-BG.vtt
    ca-ES.vtt
    ...
  posters/
    default.png
    ...
  movie.json
```
