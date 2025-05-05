# 🚀 Python Script: Generate React Native Gallery Imports

# Step 1: Import necessary Python modules

import re # For cleaning up file names
from pathlib import Path # For better path handling
import os

# Step 2: Define the gallery folder path
# Example: './gallery' or wherever your assets are
folder_path = Path(__file__).parent.resolve()
print(folder_path)

# Step 3: Read all files from the gallery folder
gallery_list = [file.name for file in folder_path.iterdir() if file.is_file()]
for file in gallery_list:
    print(file)


# Step 4: Filter the list to include only image files
# - Check extensions: .jpg, .jpeg, .png, .gif, etc.
valid_extensions = ['.jpg', '.jpeg', '.png']
gallery_list = [file for file in gallery_list if any(file.endswith(ext) for ext in valid_extensions)]
print(gallery_list)
## Would be nice to have a way to extract them in order (Look for import Pillow)- V

# Step 5: Initialize lists to store import lines and image objects
imports_list = []
images_array = []

# Step 6: Loop through each file

for index, file in enumerate(gallery_list):
    #  Generate a unique variable name (like Image1, Image2, etc.)
    temp_name = f"Image{index + 1}"

    # - Create the import line and add to imports_list
    import_line = f"import {temp_name} from './{file}';"
    imports_list.append(import_line)

    # - Clean the filename for alt text
    name_without_extension = os.path.splitext(file)[0]
    alt_text = name_without_extension.replace('-', ' ').replace('_', ' ').title()

    # - Create the image object and add to images_array
    image_object = f"{{ uri: {temp_name}, alt: '{alt_text}' }}"
    images_array.append(image_object)

# Step 7: Open (or create) the output .ts file
# - Write the import lines at the top

# - Write the export const images = [...] with all image objects
# - Close the file

# Step 8: (Optional) Print success message
# - Example: "Gallery import file generated successfully!"

# Step 9: Test!
# - Run the script
# - Check your .ts output file
# - Import and use in your project

# 🎉 Step 10: Celebrate

