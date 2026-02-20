from pdf2image import convert_from_path, convert_from_bytes
from pdf2image.exceptions import (
    PDFInfoNotInstalledError,
    PDFPageCountError,
    PDFSyntaxError
)
import os

images = convert_from_path('/mnt/c/Users/okayk/Documents/Projects/react-kiosk/assets/waterReport/Annual-Water-Quality-Report-for-2024.pdf')

# 3. Create an output directory if it doesn't exist
output_dir = 'extracted_images'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# 4. Loop through the images and save each one to a file
for i, image in enumerate(images):
    # Save the image as a JPEG file
    image_path = os.path.join(output_dir, f'page_{i+1}.jpg')
    image.save(image_path, 'JPEG')
    print(f"Saved {image_path}")

