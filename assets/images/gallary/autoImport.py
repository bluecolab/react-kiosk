# 🚀 Python Script: Generate RN‑friendly Gallery Imports (sorted by file date)
import re
from pathlib import Path
import os

# 1️⃣ Paths
script_path    = Path(__file__).resolve()
gallery_folder = script_path.parent
dest_folder    = script_path.parents[3] / 'hooks'
dest_folder.mkdir(parents=True, exist_ok=True)
output_ts      = dest_folder / 'useGalleryImages.ts'

# 2️⃣ Gather & sort files by modification time (newest first)
valid_exts = ['.jpg', '.jpeg', '.png']
files = sorted(
    [
        f
        for f in gallery_folder.iterdir()
        if f.is_file() and f.suffix.lower() in valid_exts
    ],
    key=lambda f: f.stat().st_mtime,
    reverse=True  # set to False if you want oldest first
)

# 3️⃣ Build the TS contents
lines = []
lines.append("import type { ImageSourcePropType } from 'react-native';")
lines.append("")
lines.append("export interface GalleryImage {")
lines.append("  source: ImageSourcePropType;")
lines.append("  alt: string;")
lines.append("}")
lines.append("")
lines.append("export const images: GalleryImage[] = [")

for f in files:
    fname = f.name
    base  = os.path.splitext(fname)[0]
    alt   = re.sub(r'[-_]+', ' ', base).title()
    lines.append(
        f"  {{ source: require('../assets/images/gallary/{fname}'), alt: '{alt}' }},"
    )

lines.append("];")

# 4️⃣ Write out
with open(output_ts, 'w') as out:
    out.write("\n".join(lines))

print(f"✅ Wrote sorted gallery hook to {output_ts}")
