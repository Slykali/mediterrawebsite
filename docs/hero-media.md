# Hero media

The Matchday hero can play a muted background loop. Put three files in
`public/media/`, exact names, then set `HAS_HERO_MEDIA = true` in
`lib/site.ts`:

| File               | What                                      |
| ------------------ | ----------------------------------------- |
| `hero-loop.webm`   | VP9/AV1, primary source                   |
| `hero-loop.mp4`    | H.264, Safari fallback                    |
| `hero-poster.jpg`  | First frame. Shown before playback, on reduced motion, and if autoplay is blocked. |

Rules that matter:

- **8–12 seconds, seamless loop.** Longer and nobody sees the end anyway.
- **No audio track at all.** Not silent audio, none. Halves the file and
  guarantees autoplay.
- **Under 3 MB per file.** It's decoration; it must not outweigh the page.
- **Shoot/render dark and low-contrast.** White text sits on top of it. CAD
  turntables, the mill cutting, sparks, a drivetrain spinning up.
- **No students' faces without written parent consent.** Team members are
  minors. Machine and CAD footage needs no one's permission.

```bash
# webm
ffmpeg -i source.mov -an -t 10 -c:v libvpx-vp9 -crf 36 -b:v 0 -vf scale=1920:-2 hero-loop.webm
# mp4
ffmpeg -i source.mov -an -t 10 -c:v libx264 -crf 26 -pix_fmt yuv420p -vf scale=1920:-2 hero-loop.mp4
# poster
ffmpeg -i source.mov -vframes 1 -q:v 4 -vf scale=1920:-2 hero-poster.jpg
```
