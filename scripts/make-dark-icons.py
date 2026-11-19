"""Makes the navy dock icons used in dark mode.

Each dock icon is light blue (#3FB3E2) with a white symbol. This turns the light blue
into navy and leaves the white symbol, the soft edges between them, and the
transparency exactly as they were.

Run from the repo root after adding or changing a dock icon:
    python scripts/make-dark-icons.py
It reads assets/images/icons/<name>.png and writes assets/images/icons/dark/<name>.png.
Needs Pillow: pip install pillow
"""
from pathlib import Path

from PIL import Image

LIGHT_BLUE = (63, 179, 226)  # the icons' current blue
NAVY = (30, 58, 138)  # the dark mode blue (Tailwind blue-900, #1E3A8A)
WHITE = (255, 255, 255)

# The icons used in the dock (src/hooks/useWidgets.ts).
ICONS = [
    'MobileIcon.png',
    'GamesIcon.png',
    'SonificationIcon.png',
    'WeatherIcon.png',
    'PondWaterDataIcon.png',
    'Welcome Blue and White.png',
    'AboutIcon.png',
    'RTKIcon.png',
    'WaterReportsIcon.png',
    'PhotoGalleryIcon.png',
    'VideosIcon.png',
    'Colab.png',
]

ICON_DIR = Path(__file__).resolve().parent.parent / 'assets' / 'images' / 'icons'


def recolor(image: Image.Image) -> Image.Image:
    """Moves every pixel from the white-to-light-blue range to the white-to-navy range."""
    span = [w - b for w, b in zip(WHITE, LIGHT_BLUE)]
    span_len_sq = sum(s * s for s in span)
    result = image.convert('RGBA')
    pixels = result.load()
    width, height = result.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # How far this pixel is from white toward light blue: 0 = white, 1 = light blue.
            t = sum((w - c) * s for w, c, s in zip(WHITE, (r, g, b), span)) / span_len_sq
            t = min(max(t, 0.0), 1.0)
            new = tuple(round(w + (n - w) * t) for w, n in zip(WHITE, NAVY))
            pixels[x, y] = (*new, a)
    return result


def main() -> None:
    dark_dir = ICON_DIR / 'dark'
    dark_dir.mkdir(exist_ok=True)
    for name in ICONS:
        recolor(Image.open(ICON_DIR / name)).save(dark_dir / name, optimize=True)
        print(f'Wrote {dark_dir.name}/{name}')


if __name__ == '__main__':
    main()