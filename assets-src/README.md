# assets-src

Source images kept out of `public/` on purpose.

Vite copies everything under `public/` into `dist/`, so anything left there
ships to Render whether or not a page references it. These are the
full-resolution masters for the gallery: three 4096x4096 renders and the Toma
Control flyer, about 15 MB in total.

All four are only ever shown as gallery tile covers, roughly 320x240 CSS px.
Each has a video attached, so the lightbox opens the embed rather than the
still. `public/gallery/` therefore carries WebP versions sized for that:

| file | size | quality |
|---|---|---|
| cyanea.webp | 1800px | q92 |
| cara-hueca-34hz.webp | 1800px | q92 |
| orca.webp | 1800px | q92 |
| toma-control-flyer.webp | 1400px | q92 |

15,270 KB down to 851 KB, with the tiles visually identical at display size.

q92 rather than lossless: measured against a lossless resize, the three line-art
renders come out at 48-49 dB PSNR, which is visually lossless. The flyer is flat
colour with hard edges, where PSNR sits around 35 dB no matter the setting
(q92 34.9, q98 35.3, so quality buys nothing) because the residual is edge
placement, not compression artefacts. Compared at 2x zoom and at tile size,
including its text, there is no visible difference.

The alpha channel on the three renders was fully opaque, a quarter of the pixel
data carrying nothing, so it was dropped.

## image-originals

`profile.jpg` is the 4480x6720 master, 11 MB, which was being served whole to
every visitor to fill a 320x427 slot in About. `public/images/profile-900.jpg`
is the 600x900 copy the page loads, 118 KB.

Re-encode from here, not from the shipped files, if you ever need a different
size.

## Still heavy

`public/videos/toma-control-recap.mp4` is about 14 MB and is now the largest
thing in the build by a wide margin. It is referenced, so it cannot simply be
moved; re-encoding it is a separate job.
